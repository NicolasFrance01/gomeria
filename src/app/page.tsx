import { prisma } from "@/lib/prisma"
import { DollarSign, CreditCard, Activity, Package, ShoppingCart, Archive, ScanLine, Wrench, ChevronUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

async function getStats() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [salesToday, salesMonth, productCount, productsLowStock, topProducts] = await Promise.all([
    prisma.sale.findMany({
      where: { date: { gte: startOfDay } },
      include: { details: { include: { product: true } } }
    }),
    prisma.sale.findMany({
      where: { date: { gte: startOfMonth } },
      select: { total: true }
    }),
    prisma.product.count(),
    prisma.product.findMany({
      where: { stock: { lte: 5 } }, // Assuming 5 is low stock limit for now
      take: 3
    }),
    prisma.saleDetail.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    })
  ])

  // Fetch product details for top products
  const topProductDetails = await Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({ where: { id: item.productId } })
      return { ...product, sold: item._sum.quantity }
    })
  )


  const totalToday = salesToday.reduce((acc, sale) => acc + sale.total, 0)
  const totalMonth = salesMonth.reduce((acc, sale) => acc + sale.total, 0)

  // Calculate profit
  let profitToday = 0
  salesToday.forEach(sale => {
    sale.details.forEach(detail => {
      const cost = detail.product.buyPrice || 0
      profitToday += (detail.unitPrice - cost) * detail.quantity
    })
  })

  return { totalToday, totalMonth, productCount, profitToday, productsLowStock, topProductDetails }
}

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <>
      {/* Welcome & Quick Actions */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Buenos días, Admin</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Resumen de actividad diaria.</p>
          </div>
        </div>

        {/* Quick Action Grid - Improved Harmony */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          <Link href="/sales" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/25 group-active:scale-95 transition-all duration-200 ring-2 ring-transparent group-hover:ring-primary/20">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-tight group-hover:text-primary transition-colors">Nueva Venta</span>
          </Link>
          <Link href="/stock" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-all duration-200">
              <Archive className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-tight group-hover:text-primary transition-colors">Stock</span>
          </Link>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-all duration-200">
              <ScanLine className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-tight group-hover:text-primary transition-colors">Escanear</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-all duration-200">
              <Wrench className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-tight group-hover:text-primary transition-colors">Servicio</span>
          </button>
        </div>
      </section>

      {/* KPI Carousel */}
      <section className="relative mb-8">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory -mx-4 px-4">
          {/* Card 1: Today's Sales - Premium Gradient */}
          <div className="min-w-[85%] sm:min-w-[300px] snap-center bg-gradient-to-br from-surface-dark to-surface-dark-lighter dark:from-surface-dark dark:to-surface-dark-lighter p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-5 dark:opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform duration-500">
              <DollarSign className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10 text-white">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Ventas Hoy</p>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-4xl font-bold tracking-tight">${stats.totalToday.toLocaleString()}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center bg-emerald-500/10 w-fit px-2 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3 h-3 mr-1" strokeWidth={3} /> Hoy
              </span>
            </div>
          </div>

          {/* Card 2: Monthly Revenue - Clean White/Dark */}
          <div className="min-w-[85%] sm:min-w-[300px] snap-center bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 p-6 opacity-10">
              <CreditCard className="w-24 h-24 text-indigo-500" />
            </div>
            <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">Ingresos Mes</p>
            <div className="flex items-baseline gap-2 mb-4">
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">${stats.totalMonth.toLocaleString()}</h3>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Card 3: Profit - Clean White/Dark */}
          <div className="min-w-[85%] sm:min-w-[300px] snap-center bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 p-6 opacity-10">
              <Activity className="w-24 h-24 text-emerald-500" />
            </div>
            <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">Ganancia (Hoy)</p>
            <div className="flex items-baseline gap-2 mb-4">
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">${stats.profitToday.toLocaleString()}</h3>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Low Stock Alerts */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">Alertas de Stock</h3>
          {stats.productsLowStock.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{stats.productsLowStock.length} Urgente</span>
          )}
        </div>
        <div className="space-y-3">
          {stats.productsLowStock.length === 0 ? (
            <p className="text-sm text-slate-500">Todo el stock está en orden.</p>
          ) : (
            stats.productsLowStock.map(product => (
              <div key={product.id} className="bg-red-500/10 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg p-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="text-red-500 w-4 h-4" />
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{product.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{product.size} • Marca: {product.brand}</p>
                </div>
                <div className="text-right">
                  <span className="block text-red-600 dark:text-red-400 font-bold text-sm">{product.stock} Quedan</span>
                  <button className="text-[10px] font-medium text-primary mt-1 underline">Reponer</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Top Selling Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400">Más Vendidos</h3>
          <button className="text-xs text-primary">Ver Todos</button>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          {stats.topProductDetails.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No hay ventas recientes.</div>
          ) : (
            stats.topProductDetails.map((product, index) => (
              <div key={index} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center p-1">
                  <Package className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">{product?.name || 'Producto desconocido'}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{product?.brand} • {product?.size}</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-900 dark:text-white">{product?.sold}</span>
                  <span className="text-[10px] text-slate-400">Vendidos</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}
