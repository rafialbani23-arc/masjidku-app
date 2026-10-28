import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeftRight,
    CalendarDays,
    FileText,
    Wallet,
    UserRound,
    Save,
    ArrowLeft,
} from 'lucide-react';

type Props = {
    mosque: { name: string };
};

export default function CreateTransaction({ mosque }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        type: 'income',
        transaction_date: new Date().toLocaleDateString('en-CA'),
        category: '',
        description: '',
        amount: '',
        source_or_payee: '',
        payment_method: 'Tunai',
        receipt_number: '',
        notes: '',
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        post('/transactions');
    };

    const fieldClass =
        'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

    const labelClass = 'mb-2 block text-sm font-semibold text-foreground';

    const errorText = 'mt-1.5 text-sm text-rose-600 dark:text-rose-400';

    return (
        <main className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative flex items-start gap-4">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        <ArrowLeftRight className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                            MasjidKu
                        </p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Tambah Transaksi
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Catat pemasukan atau pengeluaran keuangan {mosque.name}.
                        </p>
                    </div>
                </div>
            </section>

            <form onSubmit={submit} className="space-y-6">
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                    <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-foreground">Informasi Transaksi</h2>
                            <p className="text-xs text-muted-foreground">Detail utama pencatatan keuangan.</p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Jenis Transaksi</label>
                            <select
                                className={fieldClass}
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value as 'income' | 'expense')}
                            >
                                <option value="income">Pemasukan</option>
                                <option value="expense">Pengeluaran</option>
                            </select>
                            {errors.type && <p className={errorText}>{errors.type}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Tanggal Transaksi</label>
                            <input
                                type="date"
                                className={fieldClass}
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                            />
                            {errors.transaction_date && <p className={errorText}>{errors.transaction_date}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Kategori</label>
                            <input
                                className={fieldClass}
                                placeholder="Contoh: Donasi, Listrik"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            />
                            {errors.category && <p className={errorText}>{errors.category}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Jumlah (Rupiah)</label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                className={fieldClass}
                                placeholder="Contoh: 250000"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                            />
                            {errors.amount && <p className={errorText}>{errors.amount}</p>}
                        </div>

                        <div className="sm:col-span-2">
                            <label className={labelClass}>Keterangan</label>
                            <input
                                className={fieldClass}
                                placeholder="Contoh: Donasi Jumat pekan pertama"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            {errors.description && <p className={errorText}>{errors.description}</p>}
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
                    <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300">
                            <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-foreground">Informasi Pembayaran</h2>
                            <p className="text-xs text-muted-foreground">Sumber dana dan detail bukti transaksi.</p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Sumber Dana / Penerima</label>
                            <input
                                className={fieldClass}
                                placeholder="Nama donatur atau penerima"
                                value={data.source_or_payee}
                                onChange={(e) => setData('source_or_payee', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Metode Pembayaran</label>
                            <select
                                className={fieldClass}
                                value={data.payment_method}
                                onChange={(e) => setData('payment_method', e.target.value)}
                            >
                                <option value="Tunai">Tunai</option>
                                <option value="Transfer">Transfer</option>
                                <option value="QRIS">QRIS</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className={labelClass}>Nomor Bukti (opsional)</label>
                            <input
                                className={fieldClass}
                                placeholder="Nomor kuitansi atau referensi"
                                value={data.receipt_number}
                                onChange={(e) => setData('receipt_number', e.target.value)}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className={labelClass}>Catatan (opsional)</label>
                            <textarea
                                className={fieldClass}
                                rows={4}
                                placeholder="Tambahkan catatan jika diperlukan..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <div className="flex flex-wrap justify-end gap-3">
                    <Link
                        href="/transactions"
                        className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                    </button>
                </div>
            </form>
        </main>
    );
}
