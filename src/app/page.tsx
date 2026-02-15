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
    <div className="space-y-10">
      {/* Top Section: Welcome + KPIs in one single row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Card 1: Welcome & Date */}
        <div className="bg-gradient-to-br from-saas-red to-saas-red-hover rounded-2xl p-6 text-white shadow-card relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-24 h-24 rotate-12" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hola, Nicolas.</h1>
            <p className="text-white/80 mt-1 text-sm">Aquí tienes el resumen.</p>
          </div>
          <div className="text-sm font-medium bg-white/10 backdrop-blur-sm self-start px-3 py-1 rounded-full mt-4">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>

        {/* Card 2: Sales KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Ventas Hoy</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">${(stats.salesToday._sum.total || 0).toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit mt-3">
            <TrendingUp className="w-3 h-3 mr-1" />
            +{(stats.salesToday._count || 0)} ops
          </div>
        </div>

        {/* Card 3: stock KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Stock Bajo</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.lowStockCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md w-fit mt-3">
            Requiere atención
          </div>
        </div>

        {/* Card 4: Products KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Productos</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.productCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md w-fit mt-3">
            En inventario
          </div>
        </div>
      </div>

      {/* Modules Grid - "Button-like" Cards */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <div className="w-1 h-6 bg-saas-red rounded-full"></div>
          Accesos Directos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((mod) => (
            <Link key={mod.title} href={mod.href} className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center h-full justify-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center ${mod.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <mod.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-saas-red transition-colors">{mod.title}</h4>
                <p className="text-[10px] text-gray-400 leading-tight mt-1 px-2 line-clamp-2">{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Actividad Reciente</h3>
          <button className="text-xs font-bold text-saas-red hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">VER TODO</button>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <h4 className="text-gray-900 font-medium">Sin movimientos hoy</h4>
          <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">Las ventas y actualizaciones de stock aparecerán aquí.</p>
        </div>
      </div>
    </div>
  )
}
