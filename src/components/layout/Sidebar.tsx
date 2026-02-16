"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Truck,
    Wrench,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

const navigation = [
    { name: "Panel Principal", href: "/", icon: LayoutDashboard },
    { name: "Inventario", href: "/inventory", icon: Package },
    { name: "Punto de Venta", href: "/pos", icon: ShoppingCart },
    { name: "Proveedores", href: "/suppliers", icon: Truck },
    { name: "Taller / Servicios", href: "/workshop", icon: Wrench },
    { name: "Reportes", href: "/reports", icon: BarChart3 },
    { name: "Configuración", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 h-screen w-[280px] bg-primary text-primary-foreground border-r border-border/10 flex flex-col z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-primary-foreground/10 bg-black/10">
                <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                        <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <span>GOMERÍA</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-accent text-white shadow-sm"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Footer */}
            <div className="p-4 border-t border-primary-foreground/10 bg-black/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
