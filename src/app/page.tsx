import { prisma } from "@/lib/prisma"
import { Users, Truck, Wrench, ShoppingCart, FileText, Grid, Briefcase } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function getStats() {
  // Placeholder stats for now
  return {
    proveedores: await prisma.provider.count(),
    productos: await prisma.product.count(),
    ventas: await prisma.sale.count(),
  }
}

const DashboardCard = ({ title, count, icon: Icon, href }: { title: string, count: number, icon: any, href: string }) => (
  <Link href={href} className="bg-[#FF0000] rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-900/10 min-h-[180px]">
    <div className="flex w-full justify-between items-start">
      <Icon className="w-6 h-6 opacity-70" />
      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">{count} REGISTROS</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <Icon className="w-16 h-16 mb-2" />
    </div>
    <div className="w-full bg-black/20 p-2 rounded text-center">
      <span className="font-bold text-sm tracking-widest uppercase">{title}</span>
    </div>
  </Link>
)

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="PROVEEDORES" count={stats.proveedores} icon={Truck} href="/providers" />
        <DashboardCard title="MANTENIMIENTOS" count={16} icon={Wrench} href="/maintenance" />
        <DashboardCard title="PERSONAL" count={0} icon={Users} href="/staff" />
        <DashboardCard title="VEHÍCULOS" count={12} icon={Truck} href="/vehicles" />

        <DashboardCard title="CLIENTES" count={0} icon={Users} href="/clients" />
        <DashboardCard title="COMPRAS" count={0} icon={ShoppingCart} href="/purchases" />
        <DashboardCard title="FACTURAS" count={0} icon={FileText} href="/invoices" />
        <DashboardCard title="ORDENES TRABAJO" count={1} icon={Briefcase} href="/orders" />
      </div>
    </div>
  )
}
