import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function MosqueSetup() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        province: '',
        city: '',
        district: '',
        opening_balance: '0',
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/setup');
    }

    const inputClass =
        'mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200';

    return (
        <>
            <Head title="Daftarkan Masjid - MasjidKu" />
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
                <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                    <p className="font-bold text-emerald-700">MASJIDKU</p>
                    <h1 className="mt-2 text-2xl font-bold text-gray-900">
                        Daftarkan Masjid
                    </h1>
                    <p className="mb-6 mt-2 text-sm text-gray-600">
                        Isi informasi masjid untuk mulai mencatat pemasukan dan pengeluaran.
                    </p>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                                Nama masjid
                            </label>
                            <input id="name" autoFocus required value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Masjid Al-Ikhlas" className={inputClass} />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="province" className="block text-sm font-medium text-gray-800">
                                Provinsi
                            </label>
                            <input id="province" required value={data.province}
                                onChange={(e) => setData('province', e.target.value)}
                                placeholder="Contoh: Jawa Barat" className={inputClass} />
                            {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-800">
                                Kota/Kabupaten
                            </label>
                            <input id="city" required value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="Contoh: Kota Bogor" className={inputClass} />
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-800">
                                Kecamatan
                            </label>
                            <input id="district" required value={data.district}
                                onChange={(e) => setData('district', e.target.value)}
                                placeholder="Masukkan nama kecamatan" className={inputClass} />
                            {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                        </div>

                        <div>
                            <label htmlFor="opening_balance" className="block text-sm font-medium text-gray-800">
                                Saldo awal (rupiah)
                            </label>
                            <input id="opening_balance" type="number" min="0" required
                                value={data.opening_balance}
                                onChange={(e) => setData('opening_balance', e.target.value)}
                                className={inputClass} />
                            {errors.opening_balance && <p className="mt-1 text-sm text-red-600">{errors.opening_balance}</p>}
                        </div>

                        <button type="submit" disabled={processing}
                            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan Profil Masjid'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
