"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    Truck,
    Wrench,
    ShoppingCart,
    FileText,
    Settings,
    Bell,
    Menu,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Search,
    Grid,
    Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { name: "PERFIL", href: "/profile", icon: Users },
    { name: "CLIENTES", href: "/clients", icon: Users },
    { name: "CUENTAS CORRIENTES", href: "/accounts", icon: FileText },
    { name: "VEHÍCULOS", href: "/vehicles", icon: Truck },
    { name: "REPUESTOS", href: "/products", icon: Grid }, // Products/Stock
    { name: "ORDEN DE TRABAJO", href: "/orders", icon: FileText },
    { name: "PROVEEDORES", href: "/providers", icon: Truck },
    { name: "PERSONAL", href: "/staff", icon: Users },
    { name: "FACTURAS", href: "/invoices", icon: FileText },
    { name: "MANTENIMIENTOS", href: "/maintenance", icon: Wrench },
    { name: "COMPRAS", href: "/purchases", icon: ShoppingCart },
]

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <div className={cn("h-screen w-64 bg-[#FF0000] text-white flex flex-col fixed left-0 top-0 z-50 shadow-xl font-sans", className)}>
            {/* Logo Area - Black Box */}
            <div className="bg-black h-40 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-2">
                    <Users className="text-black w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-gray-400">Operador</span>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto py-2">
                <nav className="space-y-0.5 px-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-colors",
                                pathname === item.href
                                    ? "bg-white text-[#FF0000]"
                                    : "text-white hover:bg-white/10"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-white/10">
                <Link href="/notifications" className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 rounded">
                    <Bell className="w-4 h-4" />
                    NOTIFICACIONES
                </Link>
            </div>
        </div>
    )
}

export function Header() {
    return (
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-8 w-8 border-slate-300">
                    <Menu className="h-4 w-4 text-slate-600" />
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">POWER-TALLER</span>
                <div className="h-4 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#FF0000]">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-[#FF0000]">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 text-[10px] font-bold text-red-500 hover:bg-red-50 hover:text-red-600 uppercase border border-red-100">
                        <LogOut className="h-3 w-3 mr-1" /> Cerrar
                    </Button>
                </div>
            </div>
        </div>
    )
}
