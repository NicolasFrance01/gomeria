import { prisma } from "@/lib/prisma"
import { ProductForm } from "./product-form"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, Plus, AlertTriangle, MoreVertical } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getProducts(query: string, category: string | undefined) {
    const whereClause: any = {
        OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            { size: { contains: query, mode: 'insensitive' } },
        ]
    }

    if (category && category !== 'Todos') {
        whereClause.category = category
    }

    return prisma.product.findMany({
        where: whereClause,
        include: { provider: true },
        orderBy: { createdAt: 'desc' }
    })
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string }
}) {
    const query = searchParams.q || ""
    const categoryQuery = searchParams.category || "Todos"

    const providers = await prisma.provider.findMany({ select: { id: true, name: true } })
    const products = await getProducts(query, categoryQuery)

    const categories = ["Todos", "NUEVO", "USADO", "INSUMO"]

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventario</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gestiona tus productos y stock.</p>
                </div>
                <ProductForm providers={providers}>
                    <button className="h-10 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Nuevo Producto</span>
                    </button>
                </ProductForm>
            </div>

            {/* Sticky Search & Filter */}
            <div className="sticky top-[73px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm pb-4 -mx-4 px-4 border-b border-transparent transition-all">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="Buscar por nombre, marca o medida..."
                        className="pl-10 h-12 rounded-xl bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 focus:ring-primary text-base"
                        defaultValue={query}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map(cat => (
                        <a
                            key={cat}
                            href={`/products?category=${cat}`}
                            className={`
                                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all
                                ${categoryQuery === cat
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}
                            `}
                        >
                            {cat === 'NUEVO' ? 'Neumáticos Nuevos' : cat === 'USADO' ? 'Usados' : cat === 'INSUMO' ? 'Insumos' : 'Todos'}
                        </a>
                    ))}
                </div>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.length === 0 ? (
                    <div className="col-span-full py-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No se encontraron productos</h3>
                        <p className="text-slate-500 dark:text-slate-400">Intenta con otra búsqueda o filtro.</p>
                    </div>
                ) : (
                    products.map(product => {
                        const isLowStock = product.stock <= (product.minStock || 5)
                        return (
                            <div key={product.id} className="group bg-white dark:bg-surface-dark rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                                {isLowStock && (
                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-20">
                                        STOCK BAJO
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    {/* Image Placeholder */}
                                    <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-slate-400 select-none">IMG</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] font-bold text-primary tracking-wide uppercase mb-0.5">{product.brand}</p>
                                                <h3 className="font-bold text-slate-900 dark:text-white truncate pr-6">{product.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{product.size}</p>
                                            </div>
                                            {/* Action Menu (Placeholder for now) */}
                                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 -mr-2 -mt-1 p-1">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-end justify-between mt-3">
                                            <div>
                                                <span className="text-[10px] text-slate-400 block mb-0.5">Precio Venta</span>
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">${product.sellPrice}</p>
                                            </div>
                                            <div className={`text-right ${isLowStock ? 'text-red-500' : 'text-emerald-500'}`}>
                                                <span className="text-[10px] text-slate-400 block mb-0.5">Disponibles</span>
                                                <div className="flex items-center justify-end gap-1 font-bold">
                                                    {isLowStock && <AlertTriangle className="w-3 h-3" />}
                                                    {product.stock}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
