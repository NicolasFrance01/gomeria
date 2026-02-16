import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
      <body className={`${inter.className} min-h-screen flex antialiased bg-background`}>
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        {/* Margin left matches sidebar width (280px) */}
        <div className="flex-1 flex flex-col min-h-screen ml-[280px] transition-all duration-300 ease-in-out">
          {/* Fixed Header */}
          <Header />

          {/* Scrollable Content */}
          <main className="flex-1 p-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>

        <Toaster position="top-right" richColors toastOptions={{ style: { borderRadius: '0.5rem' } }} />
      </body>
    </html>
  );
}
