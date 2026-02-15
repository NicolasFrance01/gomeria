import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DesktopSidebar } from "@/components/layout/Nav";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gomería Pro - Sistema de Gestión",
  description: "Sistema profesional para gestión de gomerías",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0f111a] text-slate-900 dark:text-slate-100 font-display min-h-screen antialiased`}>
        <div className="flex min-h-screen">
          <DesktopSidebar />
          <main className="flex-1 ml-64 p-8 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
