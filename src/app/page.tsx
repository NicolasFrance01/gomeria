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
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Buenos días, Admin</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Aquí está lo que está pasando hoy.</p>
          </div>
        </div>
        {/* Quick Action Grid */}
        <div className="grid grid-cols-4 gap-4 mb-2">
          <Link href="/sales" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-active:scale-95 transition-transform">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Nueva Venta</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-transform">
              <Archive className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Stock</span>
          </Link>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-transform">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Escanear</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary shadow-sm group-active:scale-95 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Servicio</span>
          </button>
        </div>
      </section>

      {/* KPI Carousel */}
      <section className="relative">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {/* Card 1: Today's Sales */}
          <div className="min-w-[85%] snap-center bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <DollarSign className="w-16 h-16 text-primary" />
            </div>
            <p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Ventas Hoy</p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${stats.totalToday.toLocaleString()}</h3>
              <span className="text-xs font-medium text-green-500 flex items-center bg-green-500/10 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Hoy
              </span>
            </div>
          </div>

          {/* Card 2: Monthly Revenue */}
          <div className="min-w-[85%] snap-center bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <CreditCard className="w-16 h-16 text-primary" />
            </div>
            <p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Ingresos Mensuales</p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${stats.totalMonth.toLocaleString()}</h3>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Card 3: Est. Profit */}
          <div className="min-w-[85%] snap-center bg-white dark:bg-surface-dark p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <Activity className="w-16 h-16 text-primary" />
            </div>
            <p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-1">Ganancia Est. (Hoy)</p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">${stats.profitToday.toLocaleString()}</h3>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
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
