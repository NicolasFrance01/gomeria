"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package, ShoppingCart, Users, Home, TrendingUp, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

const routes = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Ventas (POS)", href: "/sales", icon: ShoppingCart },
    { name: "Inventario", href: "/products", icon: Package },
    { name: "Proveedores", href: "/providers", icon: Users },
]

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12 h-screen bg-slate-900 text-white", className)}>
            <div className="space-y-4 py-4">
                <div className="px-4 py-6 border-b border-slate-800">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-black">G</span>
                        </div>
                        Gomería
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Sistema de Gestión</p>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={pathname === route.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-base font-medium transition-all hover:translate-x-1",
                                    pathname === route.href
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                                )}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-3 h-5 w-5" />
                                    {route.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
                <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white bg-transparent">
                    <LogOut className="mr-3 h-4 w-4" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}

export function MobileNav() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 w-72">
                <div className="px-4 py-6 border-b border-slate-800">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-black">G</span>
                        </div>
                        Gomería
                    </h2>
                </div>
                <div className="px-3 py-4">
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={pathname === route.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-base font-medium",
                                    pathname === route.href
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                                )}
                                asChild
                                onClick={() => setOpen(false)}
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-3 h-5 w-5" />
                                    {route.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
