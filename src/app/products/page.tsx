import { prisma } from "@/lib/prisma"
import { ProductForm } from "./product-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, AlertTriangle } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string }
}) {
    const query = searchParams.q || ""
    const category = searchParams.category

    const providers = await prisma.provider.findMany({
        select: { id: true, name: true }
    })

    // @ts-ignore
    const products = await prisma.product.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { brand: { contains: query, mode: 'insensitive' } },
                        { size: { contains: query, mode: 'insensitive' } },
                    ]
                },
                category ? { category: category as any } : {}
            ]
        },
        include: { provider: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-lg font-semibold md:text-2xl self-start md:self-auto">Stock</h1>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar producto..."
                            className="w-full pl-8"
                        // Search logic handles via URL params usually, keeping simple for now
                        // Need Client Component for correct search handling or form
                        />
                    </div>
                    <ProductForm providers={providers} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <p>No se encontraron productos.</p>
                        </CardContent>
                    </Card>
                ) : (
                    products.map((product) => (
                        <Card key={product.id} className={product.stock <= product.minStock ? "border-yellow-500" : ""}>
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold">
                                        {product.name}
                                    </CardTitle>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        {product.brand} {product.size}
                                    </div>
                                </div>
                                <Badge variant={product.category === 'NUEVO' ? 'default' : product.category === 'USADO' ? 'secondary' : 'outline'}>
                                    {product.category}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 pt-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Precio Venta:</span>
                                        <span className="font-bold text-lg">${product.sellPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Stock:</span>
                                        <div className="flex items-center gap-1">
                                            {product.stock <= product.minStock && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                                            <span className={product.stock <= product.minStock ? "text-yellow-600 font-bold" : "font-medium"}>
                                                {product.stock}
                                            </span>
                                        </div>
                                    </div>
                                    {product.provider && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Prov: {product.provider.name}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
