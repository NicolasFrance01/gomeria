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
      <body className={`${inter.className} bg-[#F0F2F5] h-screen overflow-hidden flex antialiased`}>
        <DesktopSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F5F5F5] relative z-0">
          {/* Header Bar */}
          <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex justify-between items-center px-6 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Sistema de Gestión</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-700 font-bold uppercase text-xs tracking-wider">Panel Principal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">Administrador</p>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </div>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
```
