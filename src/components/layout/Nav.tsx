"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package, ShoppingCart, Users, Home, Settings, LogOut } from "lucide-react"
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
        <div className={cn("pb-12 h-screen bg-slate-950 text-slate-100 flex flex-col", className)}>
            <div className="px-6 py-6 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <span className="font-bold text-white">G</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Gomería</h2>
                        <p className="text-xs text-slate-400">Sistema de Gestión</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 py-6 px-4">
                <nav className="space-y-1">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-sm font-medium h-10 mb-1 transition-all duration-200",
                                pathname === route.href
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 hover:bg-blue-700"
                                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                            )}
                            asChild
                        >
                            <Link href={route.href}>
                                <route.icon className={cn("mr-3 h-4 w-4", pathname === route.href ? "text-white" : "text-slate-500")} />
                                {route.name}
                            </Link>
                        </Button>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-800/50">
                <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-950/30">
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
            <SheetContent side="left" className="p-0 bg-slate-950 border-slate-800 w-72">
                <Sidebar className="h-full border-none" />
            </SheetContent>
        </Sheet>
    )
}
