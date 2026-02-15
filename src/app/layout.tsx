import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DesktopSidebar } from "@/components/layout/Nav";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gomería System - Panel",
  description: "Sistema de gestión integral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#F5F5F5] min-h-screen antialiased`}>
        <DesktopSidebar />
        <main className="ml-64 min-h-screen bg-white shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)] relative z-0">
          {/* Header Bar */}
          <header className="h-16 bg-white border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 z-30">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Panel de Control</div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
            </div>
          </header>
          <div className="p-8 max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
