import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    ArrowLeftRight,
    Plus,
    Filter,
    RotateCcw,
    Pencil,
    Trash2,
    CalendarDays,
    Wallet,
    TrendingUp,
    TrendingDown,
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
    transactions: Transaction[];
    filters: { month: string; type: string };
    flash?: { success?: string };
};

export default function TransactionsIndex({
    mosque,
    transactions,
}: Props) {
    const { flash, filters } = usePage<Props>().props;
    const [month, setMonth] = React.useState(filters.month);
    const [type, setType] = React.useState(filters.type);

    const rupiah = (amount: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(Number(amount));

    return (
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                            <ArrowLeftRight className="h-4 w-4" />
                            MasjidKu
                        </div>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Transaksi Keuangan
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Kelola pemasukan dan pengeluaran {mosque.name}.
                        </p>
                    </div>

                    <Link
                        href="/transactions/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Transaksi
                    </Link>
                </div>
            </section>

            {flash?.success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                    {flash.success}
                </div>
            )}

            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        <Filter className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-foreground">Filter Transaksi</h2>
                        <p className="text-xs text-muted-foreground">Pilih periode dan jenis transaksi.</p>
                    </div>
                </div>
                                
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        router.get(
                            '/transactions',
                            { month, type },
                            {
                                preserveState: true,
                                preserveScroll: true,
                            },
                        );
                    }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
                >
                    <div className="min-w-0 space-y-2 sm:col-span-2 lg:col-span-5">
                        <label className="block text-sm font-medium text-foreground">
                            Bulan dan Tahun
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={month ? month.split('-')[1] : ''}
                                onChange={(event) => {
                                    const selectedMonth = event.target.value;
                                    const year = month
                                        ? month.split('-')[0]
                                        : String(new Date().getFullYear());

                                    setMonth(selectedMonth ? `${year}-${selectedMonth}` : '');
                                }}
                                className="h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">Semua Bulan</option>
                                {Array.from({ length: 12 }, (_, i) => {
                                    const value = String(i + 1).padStart(2, '0');
                                    const label = new Date(2026, i).toLocaleDateString(
                                        'id-ID',
                                        { month: 'long' },
                                    );

                                    return (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                value={month ? month.split('-')[0] : String(new Date().getFullYear())}
                                onChange={(event) => {
                                    const year = event.target.value;
                                    const selectedMonth = month
                                        ? month.split('-')[1]
                                        : String(new Date().getMonth() + 1).padStart(2, '0');

                                    setMonth(`${year}-${selectedMonth}`);
                                }}
                                className="h-11 w-full min-w-0 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {Array.from({ length: 6 }, (_, i) =>
                                    new Date().getFullYear() - i,
                                ).map((year) => (
                                    <option key={year} value={String(year)}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="min-w-0 space-y-2 sm:col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-foreground">
                            Jenis Transaksi
                        </label>

                        <select
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Semua Jenis</option>
                            <option value="income">Pemasukan</option>
                            <option value="expense">Pengeluaran</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-4 lg:self-end">
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            <Filter className="h-4 w-4 shrink-0" />
                            Terapkan
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setMonth('');
                                setType('');
                                router.get('/transactions');
                            }}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-foreground transition hover:bg-muted"
                        >
                            <RotateCcw className="h-4 w-4 shrink-0" />
                            Reset
                        </button>
                    </div>
                </form>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5 sm:px-6">
                    <div>
                        <h2 className="font-semibold text-foreground">Daftar Transaksi</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {transactions.length} transaksi ditampilkan
                        </p>
                    </div>
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        <Wallet className="h-5 w-5" />
                    </div>
                </div>
                                
                <div className="p-4 sm:p-0">
                    {transactions.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <CalendarDays className="mx-auto mb-3 h-9 w-9 text-muted-foreground/60" />
                            <p className="font-medium text-foreground">Belum ada transaksi</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Coba ubah filter atau tambahkan transaksi baru.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Tampilan kartu untuk HP */}
                            <div className="space-y-3 md:hidden">
                                {transactions.map((transaction) => (
                                    <article
                                        key={transaction.id}
                                        className="rounded-2xl border border-border bg-background p-4 shadow-sm"
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
                                                    ? 'Masuk'
                                                    : 'Keluar'}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground">
                                                    {transaction.transaction_date}
                                                </p>
                                                <p
                                                    className={`mt-1 break-words text-sm font-bold ${
                                                        transaction.type === 'income'
                                                            ? 'text-emerald-700 dark:text-emerald-400'
                                                            : 'text-rose-700 dark:text-rose-400'
                                                    }`}
                                                >
                                                    {transaction.type === 'expense' ? '− ' : '+ '}
                                                    {rupiah(transaction.amount)}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/transactions/${transaction.id}/edit`}
                                                    aria-label="Edit transaksi"
                                                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                'Yakin ingin menghapus transaksi ini?'
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/transactions/${transaction.id}`
                                                            );
                                                        }
                                                    }}
                                                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Tampilan tabel untuk tablet dan desktop */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[760px] text-left text-sm">
                                    <thead className="bg-muted/60 text-muted-foreground">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">Tanggal</th>
                                            <th className="px-5 py-4 font-semibold">Kategori</th>
                                            <th className="px-5 py-4 font-semibold">Keterangan</th>
                                            <th className="px-5 py-4 font-semibold">Jenis</th>
                                            <th className="px-5 py-4 text-right font-semibold">Jumlah</th>
                                            <th className="px-5 py-4 text-center font-semibold">Aksi</th>
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
                                                <td className="px-5 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            href={`/transactions/${transaction.id}/edit`}
                                                            aria-label="Edit transaksi"
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        'Yakin ingin menghapus transaksi ini?'
                                                                    )
                                                                ) {
                                                                    router.delete(
                                                                        `/transactions/${transaction.id}`
                                                                    );
                                                                }
                                                            }}
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Hapus
                                                        </button>
                                                    </div>
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
