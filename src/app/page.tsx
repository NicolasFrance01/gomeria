import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, Activity, Package } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getStats() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    salesToday,
    salesMonth,
    productCount,
    recentSales
  ] = await Promise.all([
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
      include: {
        details: {
          include: { product: true }
        }
      }
    })
  ])

  const totalToday = salesToday.reduce((acc: number, sale) => acc + sale.total, 0)
  const totalMonth = salesMonth.reduce((acc: number, sale) => acc + sale.total, 0)

  // Calculate profit for today (Estimate)
  let profitToday = 0
  salesToday.forEach(sale => {
    sale.details.forEach(detail => {
      const cost = detail.product.buyPrice || 0
      profitToday += (detail.unitPrice - cost) * detail.quantity
    })
  })

  return {
    totalToday,
    totalMonth,
    productCount,
    profitToday,
    recentSales
  }
}

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas Hoy
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Facturación del día
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ganancia Est. (Hoy)
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.profitToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Margen aproximado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas Mes
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Acumulado del mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productCount}</div>
            <p className="text-xs text-muted-foreground">
              En inventario
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-3">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">Ventas Recientes</h3>
              <p className="text-sm text-muted-foreground">Últimas transacciones.</p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-8">
                {stats.recentSales.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">No hay ventas registradas.</p>
                ) : (
                  stats.recentSales.map(sale => (
                    <div key={sale.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {sale.details.map(d => `${d.quantity}x ${d.product.name}`).join(", ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sale.date).toLocaleTimeString()} - {sale.paymentMethod}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+${sale.total}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
