"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Settings, Plus, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 ring-1 ring-white/10">
                        G
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-wide uppercase text-slate-900 dark:text-white leading-tight">Gomeria Pro</h1>
                        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Dashboard Admin</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95">
                        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-surface-dark"></span>
                    </button>
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shadow-sm">
                        {/* Placeholder Avatar - Gradient fallback */}
                        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 w-full bg-surface-light/90 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 pb-2 z-50">
            <div className="max-w-md mx-auto flex justify-between items-end h-[60px]">
                <Link href="/" className="flex flex-col items-center gap-1 group w-16 pb-2">
                    <LayoutDashboard className={cn("w-6 h-6 transition-all duration-300", pathname === "/" ? "text-primary -translate-y-1" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} strokeWidth={pathname === "/" ? 2.5 : 2} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Inicio</span>
                </Link>

                <Link href="/products" className="flex flex-col items-center gap-1 group w-16 pb-2">
                    <Package className={cn("w-6 h-6 transition-all duration-300", pathname === "/products" ? "text-primary -translate-y-1" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} strokeWidth={pathname === "/products" ? 2.5 : 2} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/products" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Stock</span>
                </Link>

                {/* Floating FAB - Elevated & Centered */}
                <div className="relative -top-6">
                    <Link href="/sales">
                        <button className="w-14 h-14 rounded-full bg-gradient-to-t from-primary-dark to-primary shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-105 transition-transform active:scale-95 ring-4 ring-background-light dark:ring-background-dark">
                            <Plus className="w-7 h-7" strokeWidth={3} />
                        </button>
                    </Link>
                </div>

                <Link href="/sales" className="flex flex-col items-center gap-1 group w-16 pb-2">
                    <ShoppingCart className={cn("w-6 h-6 transition-all duration-300", pathname === "/sales" ? "text-primary -translate-y-1" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} strokeWidth={pathname === "/sales" ? 2.5 : 2} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/sales" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Ventas</span>
                </Link>

                <Link href="/settings" className="flex flex-col items-center gap-1 group w-16 pb-2">
                    <Settings className={cn("w-6 h-6 transition-all duration-300", pathname === "/settings" ? "text-primary -translate-y-1" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} strokeWidth={pathname === "/settings" ? 2.5 : 2} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/settings" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Ajustes</span>
                </Link>
            </div>
        </nav>
    )
}
