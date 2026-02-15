"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Users,
    BarChart3,
    LogOut,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Ventas / POS", href: "/sales", icon: ShoppingCart },
    { name: "Inventario", href: "/products", icon: Package },
    { name: "Proveedores", href: "/providers", icon: Users },
    { name: "Reportes", href: "/reports", icon: BarChart3 },
    { name: "Configuración", href: "/settings", icon: Settings },
]

export function DesktopSidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <aside className={cn(
            "fixed left-0 top-0 z-40 h-screen bg-slate-900 text-slate-100 transition-all duration-300 flex flex-col border-r border-slate-800",
            collapsed ? "w-16" : "w-64"
        )}>
            {/* Logo Area */}
            <div className={cn(
                "h-16 flex items-center px-4 border-b border-slate-800",
                collapsed ? "justify-center" : "justify-between"
            )}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                        G
                    </div>
                    {!collapsed && (
                        <div>
                            <h1 className="text-sm font-bold tracking-wide uppercase text-white leading-tight">Gomeria Pro</h1>
                            <p className="text-[10px] text-slate-400">v1.2.0</p>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <button onClick={() => setCollapsed(true)} className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
                {collapsed && (
                    <button onClick={() => setCollapsed(false)} className="w-full flex justify-center mb-4 p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}

                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                            title={collapsed ? item.name : undefined}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        A
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white truncate">Administrador</p>
                            <p className="text-[10px] text-slate-500 truncate">admin@gomeria.com</p>
                        </div>
                    )}
                    {!collapsed && (
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    )
}
