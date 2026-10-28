<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{

    public function index(Request $request)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $month = $request->query('month', '');
        $type = $request->query('type', '');

        if (
            $month !== '' &&
            ! preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)
        ) {
            $month = '';
        }

        if (! in_array($type, ['', 'income', 'expense'], true)) {
            $type = '';
        }

        $query = $mosque->transactions();

        if ($month !== '') {
            $startDate = \Carbon\Carbon::createFromFormat('!Y-m', $month);
            $endDate = $startDate->copy()->endOfMonth();

            $query->whereBetween('transaction_date', [
                $startDate->toDateString(),
                $endDate->toDateString(),
            ]);
        }

        if ($type !== '') {
            $query->where('type', $type);
        }

        $transactions = $query
            ->orderByDesc('transaction_date')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('transactions/index', [
            'mosque' => $mosque,
            'transactions' => $transactions,
            'filters' => [
                'month' => $month,
                'type' => $type,
            ],
        ]);
    }

    public function create()
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        return Inertia::render('transactions/create', [
            'mosque' => $mosque,
        ]);
    }

    public function store(Request $request)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $validated = $request->validate([
            'type' => ['required', 'in:income,expense'],
            'transaction_date' => ['required', 'date'],
            'category' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:1'],
            'source_or_payee' => ['nullable', 'string', 'max:180'],
            'payment_method' => ['nullable', 'string', 'max:80'],
            'receipt_number' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $mosque->transactions()->create($validated);

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Transaksi berhasil disimpan.');
    }

    public function edit($transaction)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $transaction = $mosque->transactions()->findOrFail($transaction);

        return Inertia::render('transactions/edit', [
            'mosque' => $mosque,
            'transaction' => $transaction,
        ]);
    }

    public function update(Request $request, $transaction)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $transaction = $mosque->transactions()->findOrFail($transaction);

        $validated = $request->validate([
            'type' => ['required', 'in:income,expense'],
            'transaction_date' => ['required', 'date'],
            'category' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:1'],
            'source_or_payee' => ['nullable', 'string', 'max:180'],
            'payment_method' => ['nullable', 'string', 'max:80'],
            'receipt_number' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $transaction->update($validated);

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Transaksi berhasil diperbarui.');
    }

    public function destroy($transaction)
    {
        $mosque = auth()->user()->mosques()->first();

        if (! $mosque) {
            return redirect()->route('mosque.setup');
        }

        $transaction = $mosque->transactions()->findOrFail($transaction);
        $transaction->delete();

        return redirect()
            ->route('transactions.index')
            ->with('success', 'Transaksi berhasil dihapus.');
    }
}
