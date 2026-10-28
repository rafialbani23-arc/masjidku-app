import { useAppearance } from '@/hooks/use-appearance';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import {
    LayoutGrid,
    ArrowLeftRight,
    FileText,
    UserRound,
    LogOut,
    Sun,
    Moon,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import { Link, router } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Transaksi',
        href: '/transactions',
        icon: ArrowLeftRight,
    },
    {
        title: 'Laporan Bulanan',
        href: '/reports/monthly',
        icon: FileText,
    },
    {
        title: 'Profil',
        href: '/settings/profile',
        icon: UserRound,
    },
];

export function AppSidebar() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <Link href={dashboard()} className="flex items-center gap-2">
                    <AppLogo />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() =>
                                updateAppearance(
                                    resolvedAppearance === 'dark' ? 'light' : 'dark'
                                )
                            }
                            tooltip={
                                resolvedAppearance === 'dark'
                                    ? 'Aktifkan Mode Terang'
                                    : 'Aktifkan Mode Gelap'
                            }
                        >
                            {resolvedAppearance === 'dark' ? <Sun /> : <Moon />}
                            <span>
                                {resolvedAppearance === 'dark'
                                    ? 'Mode Terang'
                                    : 'Mode Gelap'}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => router.post('/logout')}
                            tooltip="Logout"
                        >
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
