import { prisma } from "@/lib/prisma"
import { ProductForm } from "./product-form"
import {
    Search,
    Edit,
    Trash2,
    Plus,
    Filter,
    Download,
    Printer,
    Package,
    ArrowUpDown
} from "lucide-react"

export const dynamic = 'force-dynamic'

async function getProducts(query: string) {
    return prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { brand: { contains: query, mode: 'insensitive' } },
                { size: { contains: query, mode: 'insensitive' } },
            ]
        },
        include: { provider: true },
        orderBy: { createdAt: 'desc' }
    })
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { q?: string }
}) {
    const query = searchParams.q || ""
    const providers = await prisma.provider.findMany({ select: { id: true, name: true } })
    const products = await getProducts(query)

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Desktop Header Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="bg-red-50 p-2.5 rounded-xl">
                        <Package className="w-6 h-6 text-saas-red" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">INVENTARIO</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                {products.length} productos
                            </span>
                            <span className="text-xs text-gray-400">|</span>
                            <span className="text-xs text-gray-400">Vista de Escritorio</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-hover:text-saas-red transition-colors" />
                        </div>
                        <input
                            type="text"
                            defaultValue={query}
                            placeholder="Buscar por nombre, código, marca..."
                            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saas-red/20 focus:border-saas-red transition-all bg-gray-50/50 focus:bg-white"
                        />
                    </div>

                    <div className="h-8 w-px bg-gray-200"></div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                            <span className="hidden xl:inline">Filtros</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            <span className="hidden xl:inline">Exportar</span>
                        </button>
                    </div>

                    <ProductForm providers={providers}>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-saas-red text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-saas-red-hover hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-sm">
                            <Plus className="w-4 h-4 text-white" />
                            NUEVO PRODUCTO
                        </button>
                    </ProductForm>
                </div>
            </div>

            {/* Desktop Table Container */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-card flex-1 overflow-hidden flex flex-col">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[120px] text-center">Acciones</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-saas-red group transition-colors">
                                    <div className="flex items-center gap-1">Producto <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" /></div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[150px]">Marca</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-[150px]">Medida</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-[120px]">Categoría</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-[100px]">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-[150px]">Precio Venta</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <div className="bg-gray-50 p-4 rounded-full mb-3">
                                                <Package className="w-8 h-8 opacity-50" />
                                            </div>
                                            <p className="text-lg font-medium text-gray-900">No hay productos</p>
                                            <p className="text-sm">Intenta ajustar los filtros o agrega uno nuevo.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="group hover:bg-red-50/10 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 text-sm">{product.name}</span>
                                                {product.provider && (
                                                    <span className="text-[10px] text-gray-400 mt-0.5">{product.provider.name}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-gray-600 font-medium">{product.brand}</td>
                                        <td className="px-6 py-3 text-sm text-gray-600 font-mono bg-gray-50/50 px-2 rounded w-fit">{product.size}</td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`
                                                inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border
                                                ${product.category === 'NUEVO' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                                                ${product.category === 'USADO' ? 'bg-amber-50 text-amber-700 border-amber-100' : ''}
                                                ${product.category === 'INSUMO' ? 'bg-slate-50 text-slate-700 border-slate-200' : ''}
                                            `}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className={`font-bold text-sm ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                                    {product.stock}
                                                </span>
                                                {product.stock <= 5 && (
                                                    <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded mt-0.5">BAJO</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <span className="font-bold text-gray-900 text-sm font-mono tracking-tight">
                                                ${product.sellPrice.toLocaleString('es-AR')}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Footer del listado */}
                <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-between items-center text-xs text-gray-500">
                    <p>Mostrando {products.length} registros</p>
                    <div className="flex gap-2">
                        {/* Placeholder for pagination */}
                        <span className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-300 cursor-not-allowed">Anterior</span>
                        <span className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-300 cursor-not-allowed">Siguiente</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
