import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, BottomNav } from "@/components/layout/Nav";
// Force layout update
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gomería System",
  description: "Sistema de gestión para gomería",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display min-h-screen pb-24 antialiased`}>
        <Header />
        <main className="px-4 py-6 space-y-8 max-w-7xl mx-auto">
          {children}
        </main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
