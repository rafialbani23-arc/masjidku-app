import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
} from 'recharts';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Landmark,
} from 'lucide-react';

type DashboardProps = {
    mosque: {
        name: string;
        province: string;
        city: string;
        district: string;
    };
    summary: {
        openingBalance: number;
        totalIncome: number;
        totalExpense: number;
        balance: number;
    };
    monthlyTransactions: {
        month: string;
        income: number;
        expense: number;
    }[];
};

function rupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

export default function Dashboard({
    mosque,
    summary,
    monthlyTransactions,
}: DashboardProps) {
    const cards = [
        {
            title: 'Saldo Saat Ini',
            amount: summary.balance,
            description: 'Saldo awal + pemasukan - pengeluaran',
            icon: Wallet,
            color: 'emerald',
        },
        {
            title: 'Total Pemasukan',
            amount: summary.totalIncome,
            description: 'Akumulasi seluruh pemasukan',
            icon: TrendingUp,
            color: 'blue',
        },
        {
            title: 'Total Pengeluaran',
            amount: summary.totalExpense,
            description: 'Akumulasi seluruh pengeluaran',
            icon: TrendingDown,
            color: 'rose',
        },
    ]

    return (
        <>
            <Head title="Dashboard MasjidKu" />

            <main className="space-y-6 p-4 sm:p-6">

                <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                            <Landmark className="h-4 w-4" />
                            MasjidKu
                        </div>

                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Dashboard Keuangan
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Ringkasan keuangan {mosque.name}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {mosque.district}, {mosque.city}, {mosque.province}
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        const colors = {
                            emerald: {
                                icon: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
                                accent: 'bg-emerald-500',
                            },
                            blue: {
                                icon: 'bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-blue-300',
                                accent: 'bg-blue-500',
                            },
                            rose: {
                                icon: 'bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
                                accent: 'bg-rose-500',
                            },
                        } as const;

                        const color = colors[card.color as keyof typeof colors];

                        return (
                            <article
                                key={card.title}
                                className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-lg sm:p-6"
                            >
                                <div className={`absolute inset-x-0 top-0 h-1 ${color.accent}`} />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {card.title}
                                        </p>
                                        <p className="mt-3 break-words text-xl font-bold tracking-tight sm:text-2xl xl:text-3xl">
                                            {rupiah(card.amount)}
                                        </p>
                                    </div>

                                    <div className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${color.icon}`}>
                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    {card.description}
                                </p>
                            </article>
                        );
                    })}
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Informasi Saldo
                    </h2>
                    <div className="mt-4 flex flex-col items-start gap-1 border-b border-gray-100 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 dark:border-gray-800">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Saldo awal
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {rupiah(summary.openingBalance)}
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Saldo akhir
                        </span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            {rupiah(summary.balance)}
                        </span>
                    </div>
                </section>


                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Grafik Pemasukan & Pengeluaran
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Perbandingan enam bulan terakhir
                    </p>

                    <div className="mt-6 h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyTransactions}
                                margin={{ top: 35, right: 10, left: 0, bottom: 10 }}
                                barCategoryGap="30%"
                                barGap={12}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.25} />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(month) =>
                                        new Date(`${month}-02T00:00:00`).toLocaleDateString(
                                            'id-ID',
                                            { month: 'short' },
                                        )
                                    }
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                />
                                <YAxis
                                domain={[0, 'auto']}
                                tickFormatter={(value) =>
                                    value === 0
                                        ? '0'
                                        : `Rp${new Intl.NumberFormat('id-ID', {
                                            notation: 'compact',
                                            maximumFractionDigits: 1,
                                        }).format(value)}`
                                }
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    width={55}
                                />
                                <Tooltip
                                    formatter={(value) => rupiah(Number(value))}
                                    labelFormatter={(month) =>
                                        new Date(`${month}-02T00:00:00`).toLocaleDateString(
                                            'id-ID',
                                            { month: 'long', year: 'numeric' },
                                        )
                                    }
                                />
                                <Legend />
                                <Bar
                                    dataKey="income"
                                    name="Pemasukan"
                                    fill="#10b981"
                                    radius={[5, 5, 0, 0]}
                                    barSize={8}
                                    maxBarSize={8}
                                >
                                    <LabelList
                                        dataKey="income"
                                        position="top"
                                        formatter={(value) =>
                                            Number(value) > 0
                                                ? new Intl.NumberFormat('id-ID', {
                                                    notation: 'compact',
                                                    maximumFractionDigits: 1,
                                                }).format(Number(value))
                                                : ''
                                        }
                                        fill="#10b981"
                                        fontSize={10}
                                    />
                                </Bar>
                                <Bar
                                    dataKey="income"
                                    name="Pemasukan"
                                    fill="#10b981"
                                    radius={[5, 5, 0, 0]}
                                    barSize={8}
                                    maxBarSize={8}
                                >
                                    <LabelList
                                        dataKey="expense"
                                        position="top"
                                        formatter={(value) =>
                                            Number(value) > 0
                                                ? new Intl.NumberFormat('id-ID', {
                                                    notation: 'compact',
                                                    maximumFractionDigits: 1,
                                                }).format(Number(value))
                                                : ''
                                        }
                                        fill="#ef4444"
                                        fontSize={10}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {monthlyTransactions.length === 0 && (
                        <p className="text-center text-sm text-gray-500">
                            Belum ada data transaksi untuk ditampilkan.
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
