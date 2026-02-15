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
      <body className={`${inter.className} bg-saas-bg h-screen overflow-hidden flex antialiased`}>
        <DesktopSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-0">
          {/* White SaaS Topbar */}
          <header className="h-16 flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex justify-between items-center px-8 shadow-sm z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-800 font-semibold text-lg tracking-tight">Panel de Control</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 leading-none">Administrador</p>
                  <p className="text-[11px] text-gray-500 mt-1">Nicolas France</p>
                </div>
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                  NF
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </div>
        </main>
        <Toaster position="top-right" richColors toastOptions={{ style: { borderRadius: '0.75rem' } }} />
      </body>
    </html>
  );
}
