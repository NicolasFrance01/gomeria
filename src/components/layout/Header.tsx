"use client";

import { Search, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    // Simple map for module names based on path
    const getPageTitle = (path: string) => {
        switch (path) {
            case "/": return "Panel Principal";
            case "/inventory": return "Gestión de Inventario";
            case "/pos": return "Punto de Venta";
            case "/suppliers": return "Proveedores";
            case "/workshop": return "Taller y Servicios";
            case "/reports": return "Reportes y Análisis";
            case "/settings": return "Configuración del Sistema";
            default: return "Gomería System";
        }
    };

    return (
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Left: Page Title */}
            <div className="flex items-center">
                <h1 className="text-xl font-semibold text-primary tracking-tight">
                    {getPageTitle(pathname)}
                </h1>
            </div>

            {/* Center: Global Search (Optional / if needed widely) */}
            <div className="flex-1 max-w-xl mx-8">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar en todo el sistema (Ctrl + K)..."
                        className="w-full bg-muted border-none rounded-md py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right: User & Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-muted rounded-full">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-surface"></span>
                </button>

                <div className="h-8 w-px bg-border mx-1"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden xl:block">
                        <p className="text-sm font-medium text-primary leading-none">Nicolas France</p>
                        <p className="text-xs text-muted-foreground mt-1">Administrador</p>
                    </div>
                    <div className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm shadow-sm">
                        NF
                    </div>
                </div>
            </div>
        </header>
    );
}
