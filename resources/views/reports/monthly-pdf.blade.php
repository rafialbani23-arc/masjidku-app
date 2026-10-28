
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Keuangan Bulanan</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #222;
        }

        h1 {
            text-align: center;
            margin-bottom: 5px;
            font-size: 20px;
        }

        .subtitle {
            text-align: center;
            margin-bottom: 24px;
            color: #555;
        }

        .summary {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }

        .summary td {
            border: 1px solid #ccc;
            padding: 10px;
            width: 33.33%;
        }

        .income { color: #15803d; }
        .expense { color: #b91c1c; }

        table.transactions {
            width: 100%;
            border-collapse: collapse;
        }

        .transactions th,
        .transactions td {
            border: 1px solid #ccc;
            padding: 7px;
            text-align: left;
        }

        .transactions th {
            background: #e8f5e9;
        }

        .amount {
            text-align: right !important;
        }

        .footer {
            margin-top: 24px;
            text-align: center;
            color: #666;
            font-size: 9px;
        }
    </style>
</head>
<body>
    <h1>{{ $mosque->name ?? 'MasjidKu' }}</h1>
    <div class="subtitle">
        Laporan Keuangan Bulan {{ $monthLabel }}
    </div>

    <table class="summary">
        <tr>
            <td>
                <strong>Total Pemasukan</strong><br><br>
                <span class="income">
                    Rp {{ number_format($totalIncome, 0, ',', '.') }}
                </span>
            </td>
            <td>
                <strong>Total Pengeluaran</strong><br><br>
                <span class="expense">
                    Rp {{ number_format($totalExpense, 0, ',', '.') }}
                </span>
            </td>
            <td>
                <strong>Saldo Bersih</strong><br><br>
                Rp {{ number_format($balance, 0, ',', '.') }}
            </td>
        </tr>
    </table>

    <h3>Rincian Transaksi</h3>

    <table class="transactions">
        <thead>
            <tr>
                <th style="width: 14%">Tanggal</th>
                <th>Keterangan</th>
                <th style="width: 18%">Jenis</th>
                <th class="amount" style="width: 25%">Jumlah</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($transactions as $transaction)
                <tr>
                    <td>
                        {{ \Carbon\Carbon::parse($transaction->transaction_date)->format('d/m/Y') }}
                    </td>
                    <td>{{ $transaction->description }}</td>
                    <td>
                        {{ $transaction->type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}
                    </td>
                    <td class="amount">
                        Rp {{ number_format($transaction->amount, 0, ',', '.') }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" style="text-align: center">
                        Tidak ada transaksi pada bulan ini.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dicetak melalui MasjidKu
    </div>
</body>
</html>
