import { Link, router } from '@inertiajs/react';
import {
    FileText,
    Download,
    CalendarDays,
    TrendingUp,
    TrendingDown,
    Wallet,
    ArrowLeftRight,
} from 'lucide-react';

type Transaction = {
    id: number;
    type: 'income' | 'expense';
    transaction_date: string;
    category: string;
    description: string;
    amount: number;
    source_or_payee?: string | null;
};

type Props = {
    mosque: { name: string };
    month: string;
    summary: {
        totalIncome: number;
        totalExpense: number;
        balance: number;
    };
    transactions: Transaction[];
};

export default function MonthlyReport({
    mosque,
    month,
    summary,
    transactions,
}: Props) {
    const rupiah = (amount: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(amount));

    const monthLabel = new Date(`${month}-02T00:00:00`).toLocaleDateString(
        'id-ID',
        { month: 'long', year: 'numeric' },
    );

    const monthOptions = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const selectedYear = Number(month.slice(0, 4));
    const currentYear = new Date().getFullYear();

    const yearOptions = Array.from(
        { length: 7 },
        (_, index) => currentYear - 5 + index,
    );

    if (!yearOptions.includes(selectedYear)) {
        yearOptions.push(selectedYear);
    }

    yearOptions.sort((a, b) => a - b);

    return (
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                            <FileText className="h-4 w-4" />
                            MasjidKu
                        </div>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Laporan Keuangan Bulanan
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Ringkasan keuangan {mosque.name}.
                        </p>
                    </div>

                    <a
                        href={`/reports/monthly/download?month=${encodeURIComponent(month)}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        <Download className="h-4 w-4" />
                        Download PDF
                    </a>
                </div>
            </section>
            
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="report-month"
                            className="flex items-center gap-2 text-sm font-semibold text-foreground"
                        >
                            <CalendarDays className="h-4 w-4 shrink-0 text-emerald-600" />
                            Pilih Periode Laporan
                        </label>

                        <input/>
                            <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="min-w-0">
                                    <label
                                        htmlFor="report-month"
                                        className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                    >
                                        Bulan
                                    </label>
                                    <select
                                        id="report-month"
                                        value={month.slice(5, 7)}
                                        onChange={(event) => {
                                            if (event.target.value) {
                                                router.get(
                                                    '/reports/monthly',
                                                    {
                                                        month: `${month.slice(0, 4)}-${event.target.value}`,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }
                                        }}
                                        className="block h-12 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                                    >
                                        {monthOptions.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="min-w-0">
                                    <label
                                        htmlFor="report-year"
                                        className="mb-1.5 block text-xs font-medium text-muted-foreground"
                                    >
                                        Tahun
                                    </label>
                                    <select
                                        id="report-year"
                                        value={month.slice(0, 4)}
                                        onChange={(event) => {
                                            if (event.target.value) {
                                                router.get(
                                                    '/reports/monthly',
                                                    {
                                                        month: `${event.target.value}-${month.slice(5, 7)}`,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }
                                        }}
                                        className="block h-12 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground"
                                    >
                                        {yearOptions.map((year) => (
                                            <option key={year} value={String(year)}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
                        <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                            Periode terpilih
                        </p>
                        <p className="mt-1 break-words font-semibold capitalize text-emerald-900 dark:text-emerald-200">
                            {monthLabel}
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Pemasukan</p>
                            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">{rupiah(summary.totalIncome)}</p>
                        </div>
                        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                </article>

                <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="absolute inset-x-0 top-0 h-1 bg-rose-500" />
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Pengeluaran</p>
                            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-rose-700 dark:text-rose-400">{rupiah(summary.totalExpense)}</p>
                        </div>
                        <div className="rounded-xl bg-rose-100 p-3 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300">
                            <TrendingDown className="h-5 w-5" />
                        </div>
                    </div>
                </article>

                <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
                    <div className="absolute inset-x-0 top-0 h-1 bg-blue-500" />
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Selisih Bulan Ini</p>
                            <p className="mt-3 break-words text-2xl font-bold tracking-tight text-foreground">{rupiah(summary.balance)}</p>
                        </div>
                        <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300">
                            <Wallet className="h-5 w-5" />
                        </div>
                    </div>
                </article>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5 sm:px-6">
                    <div>
                        <h2 className="font-semibold text-foreground">Rincian Transaksi</h2>
                        <p className="mt-1 text-sm capitalize text-muted-foreground">{monthLabel} · {transactions.length} transaksi</p>
                    </div>
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        <ArrowLeftRight className="h-5 w-5" />
                    </div>
                </div>
              
                <div className="p-4 sm:p-0">
                    {transactions.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <FileText className="mx-auto mb-3 h-9 w-9 text-muted-foreground/60" />
                            <p className="font-medium text-foreground">Belum ada transaksi</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Tidak ada transaksi pada periode ini.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Kartu transaksi untuk HP */}
                            <div className="space-y-3 md:hidden">
                                {transactions.map((transaction) => (
                                    <article
                                        key={transaction.id}
                                        className="rounded-2xl border border-border bg-background p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="break-words font-semibold text-foreground">
                                                    {transaction.category}
                                                </p>
                                                <p className="mt-1 break-words text-sm text-muted-foreground">
                                                    {transaction.description}
                                                </p>
                                                {transaction.source_or_payee && (
                                                    <p className="mt-1 break-words text-xs text-muted-foreground">
                                                        {transaction.source_or_payee}
                                                    </p>
                                                )}
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                    transaction.type === 'income'
                                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300'
                                                        : 'bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300'
                                                }`}
                                            >
                                                {transaction.type === 'income'
                                                    ? 'Pemasukan'
                                                    : 'Pengeluaran'}
                                            </span>
                                        </div>

                                        <div className="mt-4 border-t border-border pt-3">
                                            <p className="text-xs text-muted-foreground">
                                                {transaction.transaction_date}
                                            </p>
                                            <p
                                                className={`mt-1 break-words text-lg font-bold ${
                                                    transaction.type === 'income'
                                                        ? 'text-emerald-700 dark:text-emerald-400'
                                                        : 'text-rose-700 dark:text-rose-400'
                                                }`}
                                            >
                                                {transaction.type === 'expense' ? '− ' : '+ '}
                                                {rupiah(transaction.amount)}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Tabel untuk laptop dan tablet */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[650px] text-left text-sm">
                                    <thead className="bg-muted/60 text-muted-foreground">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">Tanggal</th>
                                            <th className="px-5 py-4 font-semibold">Kategori</th>
                                            <th className="px-5 py-4 font-semibold">Keterangan</th>
                                            <th className="px-5 py-4 font-semibold">Jenis</th>
                                            <th className="px-5 py-4 text-right font-semibold">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {transactions.map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="transition hover:bg-muted/30"
                                            >
                                                <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                                                    {transaction.transaction_date}
                                                </td>
                                                <td className="px-5 py-4 font-medium text-foreground">
                                                    {transaction.category}
                                                </td>
                                                <td className="max-w-xs px-5 py-4">
                                                    <p className="break-words font-medium text-foreground">
                                                        {transaction.description}
                                                    </p>
                                                    {transaction.source_or_payee && (
                                                        <p className="mt-1 break-words text-xs text-muted-foreground">
                                                            {transaction.source_or_payee}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                            transaction.type === 'income'
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300'
                                                                : 'bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300'
                                                        }`}
                                                    >
                                                        {transaction.type === 'income' ? (
                                                            <TrendingUp className="h-3.5 w-3.5" />
                                                        ) : (
                                                            <TrendingDown className="h-3.5 w-3.5" />
                                                        )}
                                                        {transaction.type === 'income'
                                                            ? 'Pemasukan'
                                                            : 'Pengeluaran'}
                                                    </span>
                                                </td>
                                                <td
                                                    className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${
                                                        transaction.type === 'income'
                                                            ? 'text-emerald-700 dark:text-emerald-400'
                                                            : 'text-rose-700 dark:text-rose-400'
                                                    }`}
                                                >
                                                    {transaction.type === 'expense' ? '− ' : '+ '}
                                                    {rupiah(transaction.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400">
                ← Kembali ke Dashboard
            </Link>
        </main>
    );
}
