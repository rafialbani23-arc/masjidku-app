import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    MapPin,
    Wallet,
    Save,
    Landmark,
    ChevronRight,
} from 'lucide-react';

type Mosque = {
    id: number;
    name: string;
    province: string;
    city: string;
    district: string;
    opening_balance: number;
};

type Props = {
    mosque: Mosque;
    flash?: { success?: string };
};

export default function MosqueProfile({ mosque, flash }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: mosque.name ?? '',
        province: mosque.province ?? '',
        city: mosque.city ?? '',
        district: mosque.district ?? '',
        opening_balance: String(mosque.opening_balance ?? 0),
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        patch('/mosque/profile');
    }

    const inputClass =
        'mt-2 min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:bg-gray-800';

    function FieldError({ message }: { message?: string }) {
        if (!message) return null;
        return <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{message}</p>;
    }

    return (
        <>
            <Head title="Profil Masjid - MasjidKu" />

            <main className="min-h-screen bg-[#f5f7f6] text-gray-800 transition-colors dark:bg-gray-950 dark:text-gray-100">
                <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
                    <Link
                        href="/dashboard"
                        className="mb-7 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-gray-500 transition hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
                    >
                        <ArrowLeft size={17} />
                        Kembali ke Dashboard
                    </Link>

                    <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#075e49] via-emerald-700 to-[#13866a] shadow-lg shadow-emerald-900/10">
                        <div className="relative px-4 py-6 sm:px-9 sm:py-10">
                            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
                            <div className="pointer-events-none absolute -right-2 -top-8 h-44 w-44 rounded-full border border-white/10" />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-inner">
                                        <Landmark size={29} strokeWidth={1.7} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                                            Pengaturan
                                        </p>
                                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                            Profil Masjid
                                        </h1>
                                        <p className="mt-2 max-w-lg text-sm leading-6 text-emerald-50/90">
                                            Kelola identitas dan informasi masjid untuk pencatatan keuangan yang lebih tertata.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white">
                                    <CheckCircle2 size={15} />
                                    Pengaturan masjid
                                </div>
                            </div>
                        </div>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200">
                            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                            <div>
                                <p className="font-semibold">Perubahan berhasil disimpan</p>
                                <p className="mt-1">{flash.success}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[0.78fr_1.5fr]">
                        <aside className="space-y-5">
                            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                    <Building2 size={24} />
                                </div>

                                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    Nama masjid
                                </p>
                                <h2 className="mt-2 break-words text-xl font-bold leading-snug text-gray-900 dark:text-white">
                                    {data.name || 'Nama Masjid'}
                                </h2>

                                <div className="mt-5 flex items-start gap-2.5 border-t border-gray-100 pt-5 text-sm leading-6 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                    <MapPin size={17} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                    <span>
                                        {[data.district, data.city, data.province]
                                            .filter(Boolean)
                                            .join(', ') || 'Lokasi belum diisi'}
                                    </span>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 dark:border-emerald-900/70 dark:bg-emerald-950/50">
                                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                                    <Wallet size={19} />
                                    <h3 className="text-sm font-bold">Saldo awal</h3>
                                </div>

                                <p className="mt-4 text-xs text-emerald-700/80 dark:text-emerald-300/80">
                                    Nilai yang tercatat saat awal pengelolaan
                                </p>
                                <p className="mt-1 break-words text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
                                    {Number(data.opening_balance || 0).toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0,
                                    })}
                                </p>
                            </section>

                            <div className="flex items-start gap-3 px-2 py-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                <div className="mt-0.5 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-900">
                                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p>
                                    Perubahan informasi hanya diterapkan pada masjid yang terhubung dengan akunmu.
                                </p>
                            </div>
                        </aside>

                        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-8 sm:py-5">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Informasi masjid
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Perbarui detail di bawah ini sesuai kondisi terbaru.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-8 sm:py-7">
                                <div>
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Nama masjid <span className="text-emerald-600">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        required
                                        maxLength={180}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={inputClass}
                                        placeholder="Contoh: Masjid Al-Ikhlas"
                                    />
                                    <FieldError message={errors.name} />
                                </div>

                                <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                                    <div className="mb-4 flex items-center gap-2">
                                        <MapPin size={17} className="text-emerald-700 dark:text-emerald-400" />
                                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                            Lokasi masjid
                                        </h3>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="province" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                Provinsi <span className="text-emerald-600">*</span>
                                            </label>
                                            <input
                                                id="province"
                                                required
                                                maxLength={100}
                                                value={data.province}
                                                onChange={(e) => setData('province', e.target.value)}
                                                className={inputClass}
                                                placeholder="Contoh: Jawa Barat"
                                            />
                                            <FieldError message={errors.province} />
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    Kota/Kabupaten <span className="text-emerald-600">*</span>
                                                </label>
                                                <input
                                                    id="city"
                                                    required
                                                    maxLength={100}
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Contoh: Kota Bogor"
                                                />
                                                <FieldError message={errors.city} />
                                            </div>

                                            <div>
                                                <label htmlFor="district" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    Kecamatan <span className="text-emerald-600">*</span>
                                                </label>
                                                <input
                                                    id="district"
                                                    required
                                                    maxLength={100}
                                                    value={data.district}
                                                    onChange={(e) => setData('district', e.target.value)}
                                                    className={inputClass}
                                                    placeholder="Nama kecamatan"
                                                />
                                                <FieldError message={errors.district} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Wallet size={17} className="text-emerald-700 dark:text-emerald-400" />
                                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                            Informasi keuangan
                                        </h3>
                                    </div>

                                    <label htmlFor="opening_balance" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Saldo awal (rupiah) <span className="text-emerald-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 dark:text-gray-500">
                                            Rp
                                        </span>
                                        <input
                                            id="opening_balance"
                                            type="number"
                                            min="0"
                                            step="1"
                                            required
                                            value={data.opening_balance}
                                            onChange={(e) => setData('opening_balance', e.target.value)}
                                            className={`${inputClass} pl-12`}
                                            placeholder="0"
                                        />
                                    </div>
                                    <FieldError message={errors.opening_balance} />
                                    <p className="mt-2 text-xs leading-5 text-gray-400 dark:text-gray-500">
                                        Pastikan saldo awal sesuai catatan keuangan. Mengubah nilai ini bisa memengaruhi perhitungan saldo dashboard.
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                    >
                                        Batal
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-800/15 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        <Save size={17} />
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        {!processing && <ChevronRight size={16} />}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    <footer className="py-8 text-center text-xs text-gray-400 dark:text-gray-500">
                        MasjidKu · Pengelolaan masjid yang lebih tertata
                    </footer>
                </div>
            </main>
        </>
    );
}
