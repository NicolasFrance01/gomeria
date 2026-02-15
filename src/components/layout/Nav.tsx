"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Car,
    Wrench,
    FileText,
    Bell
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { name: "INICIO", href: "/", icon: LayoutDashboard },
    { name: "PRODUCTOS", href: "/products", icon: Package },
    { name: "VENTAS", href: "/sales", icon: ShoppingCart },
    { name: "PROVEEDORES", href: "/providers", icon: Users },
    { name: "SERVICIO", href: "/service", icon: Wrench },
    { name: "REPORTES", href: "/reports", icon: FileText },
    { name: "AJUSTES", href: "/settings", icon: Settings },
]

export function DesktopSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col shadow-xl">
            {/* Top Black Area - Logo */}
            <div className="h-48 bg-black flex flex-col items-center justify-center text-white relative">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2 border-2 border-white/20">
                    <Car className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-widest">GOMERIA</h1>
                <p className="text-[10px] text-gray-400 tracking-widest mt-1">SISTEMA INTEGRAL</p>

                {/* User Status Mock */}
                <div className="absolute top-4 right-4 text-xs text-green-500 font-mono">● ONLINE</div>
            </div>

            {/* Red Menu Area */}
            <nav className="flex-1 bg-[#FF0000] py-4 text-white overflow-y-auto">
                <div className="px-4 mb-6">
                    <p className="text-xs font-bold text-white/50 border-b border-white/20 pb-1 mb-2">MENU PRINCIPAL</p>
                    <ul className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wide transition-colors hover:bg-black/10 rounded-lg",
                                            isActive ? "bg-black/20 text-white border-l-4 border-white" : "text-white/90"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="px-4">
                    <p className="text-xs font-bold text-white/50 border-b border-white/20 pb-1 mb-2">SISTEMA</p>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wide text-white/90 hover:bg-black/10 rounded-lg transition-colors text-left">
                        <LogOut className="w-5 h-5" />
                        <span>CERRAR SESIÓN</span>
                    </button>
                </div>
            </nav>
        </aside>
    )
}
