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
      {/* Top Section: Welcome and KPIs in ONE single row of 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ABSOLUTELY FIRST COLUMN: Welcome & Date */}
        <div className="bg-gradient-to-br from-saas-red to-saas-red-hover rounded-2xl p-6 text-white shadow-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between group h-full min-h-[140px]">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="w-20 h-20 rotate-12" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Hola, Nicolas.</h1>
            <p className="text-white/80 mt-1 text-xs">Resumen del día.</p>
          </div>
          <div className="text-xs font-bold bg-white/20 backdrop-blur-md self-start px-3 py-1.5 rounded-lg mt-3 shadow-inner">
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>

        {/* Column 2: Sales KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center justify-center gap-2 group h-full">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Ventas Hoy</p>
            <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">${(stats.salesToday._sum.total || 0).toLocaleString()}</h3>
            <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
              +{(stats.salesToday._count || 0)} ops
            </p>
          </div>
        </div>

        {/* Column 3: Low Stock KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center justify-center gap-2 group h-full">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Stock Bajo</p>
            <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">{stats.lowStockCount}</h3>
            <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
              Requiere atención
            </p>
          </div>
        </div>

        {/* Column 4: Total Products KPI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-200 hover:-translate-y-1 flex flex-col items-center text-center justify-center gap-2 group h-full">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Productos</p>
            <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">{stats.productCount}</h3>
            <p className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md inline-block">
              En inventario
            </p>
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
