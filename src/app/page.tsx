import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Package,
  ShoppingCart,
  Users,
  Wrench,
  FileText,
  Settings,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react"

export const dynamic = 'force-dynamic'

async function getStats() {
  const [productCount, lowStockCount, salesToday] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
    prisma.sale.aggregate({
      where: {
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      },
      _sum: { total: true },
      _count: true
    })
  ])

  return { productCount, lowStockCount, salesToday }
}

export default async function Dashboard() {
  const stats = await getStats()

  const items = [
    { name: "PRODUCTOS", icon: Package, href: "/products", desc: "Gestión de Stock", count: `${stats.productCount}` },
    { name: "NUEVA VENTA", icon: ShoppingCart, href: "/sales", desc: "Punto de Venta", count: "+" },
    { name: "PROVEEDORES", icon: Users, href: "/providers", desc: "Directorio", count: "DIR" },
    { name: "SERVICIOS", icon: Wrench, href: "/services", desc: "Mantenimiento", count: "TALLER" },
    { name: "REPORTES", icon: FileText, href: "/reports", desc: "Estadísticas", count: "DATOS" },
    { name: "AJUSTES", icon: Settings, href: "/settings", desc: "Configuración", count: "SYS" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Panel Principal</h2>
          <p className="text-gray-500 text-sm">Resumen general del taller</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right px-4 border-r border-gray-200">
            <p className="text-xs text-gray-400 uppercase font-bold">Ventas Hoy</p>
            <p className="text-xl font-black text-[#FF0000]">${(stats.salesToday._sum.total || 0).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold">Alertas</p>
            <div className="flex items-center justify-end gap-1 text-red-500 font-bold">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xl">{stats.lowStockCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Red Cards Grid - Matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link key={item.name} href={item.href} className="group relative overflow-hidden bg-[#FF0000] rounded-md shadow-lg transition-transform hover:-translate-y-1">
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 border-b border-white/30 pb-1">{item.desc}</span>
                <span className="text-xs font-bold opacity-100 bg-black/20 px-2 py-0.5 rounded">{item.count}</span>
              </div>

              <div className="flex flex-col items-center justify-center py-4 gap-4">
                <item.icon className="w-16 h-16 text-white stroke-[1.5]" />
                <h3 className="text-xl font-black uppercase tracking-wider">{item.name}</h3>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-black/10 py-2 px-4 flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Acceder</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Simple Table Section (Preview) */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-gray-800 uppercase mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#FF0000]" />
          Actividad Reciente
        </h3>
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FF0000] text-white uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-3">Detalle</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3 text-right">Monto</th>
                <th className="px-6 py-3 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Placeholder rows */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Venta #1024</td>
                <td className="px-6 py-4 text-gray-500">Neumático 195/65R15</td>
                <td className="px-6 py-4 text-right font-bold">$125,000</td>
                <td className="px-6 py-4 text-right text-green-600 font-bold uppercase text-xs">Completado</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Servicio #552</td>
                <td className="px-6 py-4 text-gray-500">Alineación y Balanceo</td>
                <td className="px-6 py-4 text-right font-bold">$45,000</td>
                <td className="px-6 py-4 text-right text-green-600 font-bold uppercase text-xs">Completado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
