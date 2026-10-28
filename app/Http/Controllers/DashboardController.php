<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $transactions = $mosque->transactions();

        $totalIncome = (clone $transactions)
            ->where('type', 'income')
            ->sum('amount');

        $totalExpense = (clone $transactions)
            ->where('type', 'expense')
            ->sum('amount');

        // Sementara saldo awal diasumsikan nol.
        $openingBalance = 0;

        $monthlyTransactions = collect(range(5, 0))
            ->map(function ($monthsAgo) use ($mosque) {
                $date = now()->startOfMonth()->subMonths($monthsAgo);
                $month = $date->format('Y-m');

                $transactions = $mosque->transactions()
                    ->whereBetween('transaction_date', [
                        $date->toDateString(),
                        $date->copy()->endOfMonth()->toDateString(),
                    ]);

                return [
                    'month' => $month,
                    'income' => (clone $transactions)
                        ->where('type', 'income')
                        ->sum('amount'),
                    'expense' => (clone $transactions)
                        ->where('type', 'expense')
                        ->sum('amount'),
                ];
            })
            ->values();

        return Inertia::render('dashboard', [
            'mosque' => $mosque,
            'summary' => [
                'openingBalance' => $openingBalance,
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'balance' => $openingBalance + $totalIncome - $totalExpense,
            ],
            'monthlyTransactions' => $monthlyTransactions,
        ]);
    }

    public function monthly(\Illuminate\Http\Request $request)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $month = $request->query('month', now()->format('Y-m'));

        if (! preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = now()->format('Y-m');
        }

        $startDate = \Carbon\Carbon::createFromFormat('!Y-m', $month)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $transactions = $mosque->transactions()
            ->whereBetween('transaction_date', [
                $startDate->toDateString(),
                $endDate->toDateString(),
            ]);

        $income = (clone $transactions)->where('type', 'income')->sum('amount');
        $expense = (clone $transactions)->where('type', 'expense')->sum('amount');

        return Inertia::render('reports/monthly', [
            'mosque' => $mosque,
            'month' => $month,
            'summary' => [
                'totalIncome' => $income,
                'totalExpense' => $expense,
                'balance' => $income - $expense,
            ],
            'transactions' => (clone $transactions)
                ->orderByDesc('transaction_date')
                ->orderByDesc('id')
                ->get(),
        ]);
    }
}
