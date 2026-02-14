"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Settings, Plus, Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                    G
                </div>
                <div>
                    <h1 className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">Gomeria Pro</h1>
                    <p className="text-xs font-medium text-slate-900 dark:text-white">Dashboard</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-200">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">A</div>
                </div>
            </div>
        </header>
    )
}

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 pb-6 z-50">
            <div className="flex justify-between items-center">
                <Link href="/" className="flex flex-col items-center gap-1 group w-16">
                    <LayoutDashboard className={cn("w-6 h-6 transition-colors", pathname === "/" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Home</span>
                </Link>

                <Link href="/products" className="flex flex-col items-center gap-1 group w-16">
                    <Package className={cn("w-6 h-6 transition-colors", pathname === "/products" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/products" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Stock</span>
                </Link>

                {/* Floating FAB in the middle */}
                <div className="-mt-8">
                    <Link href="/sales">
                        <button className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-105 transition-transform active:scale-95 border-4 border-background-light dark:border-background-dark">
                            <Plus className="w-8 h-8" />
                        </button>
                    </Link>
                </div>

                <Link href="/sales" className="flex flex-col items-center gap-1 group w-16">
                    <ShoppingCart className={cn("w-6 h-6 transition-colors", pathname === "/sales" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/sales" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Sales</span>
                </Link>

                <Link href="/settings" className="flex flex-col items-center gap-1 group w-16">
                    <Settings className={cn("w-6 h-6 transition-colors", pathname === "/settings" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                    <span className={cn("text-[10px] font-medium transition-colors", pathname === "/settings" ? "text-primary" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")}>Settings</span>
                </Link>
            </div>
        </nav>
    )
}
