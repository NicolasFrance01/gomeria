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
  AlertTriangle,
  DollarSign
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

  const modules = [
    { title: "Inventario", icon: Package, href: "/products", desc: "Gestión de productos y stock", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Nueva Venta", icon: ShoppingCart, href: "/sales", desc: "Punto de venta y facturación", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Proveedores", icon: Users, href: "/providers", desc: "Directorio de proveedores", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Servicios", icon: Wrench, href: "/services", desc: "Mantenimiento y taller", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Reportes", icon: FileText, href: "/reports", desc: "Métricas y rendimiento", color: "text-gray-600", bg: "bg-gray-50" },
    { title: "Ajustes", icon: Settings, href: "/settings", desc: "Configuración del sistema", color: "text-gray-600", bg: "bg-gray-50" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Hola, Nicolas.</h1>
          <p className="text-gray-500 mt-1">Aquí tienes el resumen de hoy.</p>
        </div>
        <div className="text-sm text-gray-400 font-medium">
          {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-24 h-24 rotate-12" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ventas Hoy</p>
              <h3 className="text-2xl font-bold text-gray-900">${(stats.salesToday._sum.total || 0).toLocaleString()}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
            <TrendingUp className="w-3 h-3 mr-1" />
            +{(stats.salesToday._count || 0)} operaciones
          </div>
        </div>

        {/* Low Stock KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Stock Bajo</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.lowStockCount}</h3>
            </div>
          </div>
          <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit">
            Requiere atención
          </div>
        </div>

        {/* Total Products KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Productos</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.productCount}</h3>
            </div>
          </div>
          <div className="text-xs text-gray-400 px-1">
            Total en inventario
          </div>
        </div>
      </div>

      {/* Modules Grid - SaaS Style White Cards */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Accesos Rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link key={mod.title} href={mod.href} className="group bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-200 hover:-translate-y-1 flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl ${mod.bg} flex items-center justify-center ${mod.color} group-hover:scale-110 transition-transform duration-300`}>
                <mod.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-saas-red transition-colors">{mod.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-saas-red group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Actividad Reciente</h3>
          <button className="text-xs font-semibold text-saas-red hover:underline">Ver todo</button>
        </div>
        <div className="p-6 text-center text-gray-400 text-sm py-12">
          No hay actividad reciente para mostrar.
        </div>
      </div>
    </div>
  )
}
