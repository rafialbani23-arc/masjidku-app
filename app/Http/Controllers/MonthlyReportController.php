<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class MonthlyReportController extends Controller
{
    public function download(Request $request)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $month = $request->query('month', now()->format('Y-m'));

        if (! preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = now()->format('Y-m');
        }

        $startDate = Carbon::createFromFormat('!Y-m', $month)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $transactions = $mosque->transactions()
            ->whereBetween('transaction_date', [
                $startDate->toDateString(),
                $endDate->toDateString(),
            ])
            ->orderBy('transaction_date')
            ->orderBy('id')
            ->get();

        $totalIncome = $transactions
            ->where('type', 'income')
            ->sum('amount');

        $totalExpense = $transactions
            ->where('type', 'expense')
            ->sum('amount');

        $pdf = Pdf::loadView('reports.monthly-pdf', [
            'mosque' => $mosque,
            'month' => $month,
            'monthLabel' => $startDate->translatedFormat('F Y'),
            'transactions' => $transactions,
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'balance' => $totalIncome - $totalExpense,
        ])->setPaper('a4', 'portrait');

        return $pdf->download("laporan-keuangan-{$month}.pdf");
    }
}
