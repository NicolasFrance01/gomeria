import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Activity, Package } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getStats() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [salesToday, salesMonth, productCount, recentSales] = await Promise.all([
    prisma.sale.findMany({
      where: { date: { gte: startOfDay } },
      include: { details: { include: { product: true } } }
    }),
    prisma.sale.findMany({
      where: { date: { gte: startOfMonth } },
      select: { total: true }
    }),
    prisma.product.count(),
    prisma.sale.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: { details: { include: { product: true } } }
    })
  ])

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

  return { totalToday, totalMonth, productCount, profitToday, recentSales }
}

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de actividad del taller.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Hoy</CardTitle>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">${stats.totalToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Facturado hoy</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ganancia (Est.)</CardTitle>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">${stats.profitToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Margen aproximado</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Mes</CardTitle>
            <div className="h-8 w-8 bg-violet-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">${stats.totalMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Acumulado mensual</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventario</CardTitle>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.productCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Productos registrados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentSales.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No hay ventas registradas.</p>
              ) : (
                stats.recentSales.map(sale => (
                  <div key={sale.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-800">
                        {sale.details.map(d => `${d.quantity}x ${d.product.name}`).join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(sale.date).toLocaleTimeString()} • {sale.paymentMethod}
                      </p>
                    </div>
                    <div className="ml-auto font-bold text-blue-600">+${sale.total}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
