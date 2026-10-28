import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="MasjidKu - Keuangan Masjid" />

            <div className="min-h-screen bg-stone-50 text-gray-900">
                <header className="border-b border-gray-100 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-2xl text-white">
                                ☪
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-emerald-800">
                                    MasjidKu
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Kelola keuangan dengan amanah
                                </p>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                                Pengelolaan keuangan masjid
                            </span>

                            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                                Keuangan Masjid Lebih
                                <span className="block text-emerald-700">
                                    Transparan dan Terpercaya
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                                Catat pemasukan, pengeluaran, dan saldo kas
                                masjid dalam satu tempat. Praktis bagi pengurus,
                                jelas bagi jamaah.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-emerald-800"
                                >
                                    Mulai Sekarang →
                                </Link>

                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Masuk ke Akun
                                </Link>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                                <span>✓ Catatan pemasukan</span>
                                <span>✓ Pengeluaran teratur</span>
                                <span>✓ Ringkasan saldo</span>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-emerald-800 p-8 text-white shadow-xl sm:p-10">
                            <p className="text-sm font-medium text-emerald-200">
                                RINGKASAN KEUANGAN
                            </p>

                            <h3 className="mt-3 text-2xl font-bold">
                                Keuangan Masjid
                            </h3>

                            <div className="mt-8 rounded-2xl bg-white/10 p-6">
                                <p className="text-sm text-emerald-100">
                                    Saldo kas
                                </p>
                                <p className="mt-2 text-3xl font-bold">
                                    Tercatat dengan rapi
                                </p>
                                <p className="mt-2 text-sm text-emerald-100">
                                    Pantau kondisi keuangan dalam satu dashboard.
                                </p>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-white p-5 text-gray-900">
                                    <p className="text-sm text-gray-500">
                                        Pemasukan
                                    </p>
                                    <p className="mt-2 font-bold text-emerald-700">
                                        Terorganisir
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 text-gray-900">
                                    <p className="text-sm text-gray-500">
                                        Pengeluaran
                                    </p>
                                    <p className="mt-2 font-bold text-emerald-700">
                                        Terpantau
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 text-sm leading-6 text-emerald-100">
                                Contoh tampilan ilustratif — data keuangan
                                sebenarnya tersedia setelah masuk ke akun.
                            </p>
                        </div>
                    </section>

                    <section className="border-t border-gray-100 bg-white">
                        <div className="mx-auto max-w-7xl px-6 py-14">
                            <div className="grid gap-8 sm:grid-cols-3">
                                <div>
                                    <div className="text-2xl">📒</div>
                                    <h3 className="mt-3 font-bold">
                                        Pencatatan Teratur
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Bantu pengurus mencatat transaksi
                                        keuangan masjid.
                                    </p>
                                </div>

                                <div>
                                    <div className="text-2xl">📊</div>
                                    <h3 className="mt-3 font-bold">
                                        Ringkasan Keuangan
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Lihat total pemasukan, pengeluaran,
                                        dan saldo kas.
                                    </p>
                                </div>

                                <div>
                                    <div className="text-2xl">🤝</div>
                                    <h3 className="mt-3 font-bold">
                                        Mendukung Amanah
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Bantu pengelolaan dana masjid menjadi
                                        lebih tertib dan mudah ditinjau.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-gray-200 bg-stone-50">
                    <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} MasjidKu. Mengelola
                        amanah bersama.
                    </div>
                </footer>
            </div>
        </>
    );
}
