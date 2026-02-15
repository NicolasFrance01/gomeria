"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Wrench,
    BarChart3,
    Settings,
    LogOut,
    Car
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { name: "Panel Principal", href: "/", icon: LayoutDashboard },
    { name: "Inventario", href: "/products", icon: Package },
    { name: "Punto de Venta", href: "/sales", icon: ShoppingCart },
    { name: "Proveedores", href: "/providers", icon: Users },
    { name: "Taller / Servicios", href: "/services", icon: Wrench },
    { name: "Reportes", href: "/reports", icon: BarChart3 },
    { name: "Configuración", href: "/settings", icon: Settings },
]

export function DesktopSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-saas-red text-white flex-shrink-0 flex flex-col h-full shadow-2xl z-20 relative">
            {/* Logo Area - Clean & Professional */}
            <div className="h-20 flex items-center px-6 border-b border-white/10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-saas-red shadow-lg mr-3">
                    <Car className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight leading-none">Gomeria<span className="opacity-80 font-light">Pro</span></h1>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest mt-0.5">Gestión SaaS</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 overflow-y-auto space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-white text-saas-red shadow-md transform scale-[1.02]"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5]" : "stroke-[1.5]")} />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/10">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    )
}
