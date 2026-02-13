import { prisma } from "@/lib/prisma"
import { POS } from "./pos"

export const dynamic = 'force-dynamic'

export default async function SalesPage() {
    const products = await prisma.product.findMany({
        where: { stock: { gt: 0 } }, // Only show products with stock
        orderBy: { name: 'asc' }
    })

    return (
        <div className="flex flex-col gap-4 h-[calc(100vh-8rem)]">
            <h1 className="text-lg font-semibold md:text-2xl">Punto de Venta</h1>
            <POS products={products} />
        </div>
    )
}
