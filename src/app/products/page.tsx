import { prisma } from "@/lib/prisma"
import { ProductForm } from "./product-form"
import {
    Search,
    Edit,
    Trash2,
    Plus,
    Filter,
    Download,
    Printer
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
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
                {/* Header & Actions Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">INVENTARIO (ACTUALIZADO)</h1>
                        <p className="text-sm text-gray-500">Gestión de productos y control de stock.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ProductForm providers={providers}>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-saas-red hover:bg-saas-red-hover text-white rounded-lg text-sm font-semibold shadow-md shadow-red-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                                <Plus className="w-4 h-4" />
                                Nuevo Producto
                            </button>
                        </ProductForm>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <button className="p-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-lg transition-colors shadow-sm" title="Imprimir">
                            <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-lg transition-colors shadow-sm" title="Exportar">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Search Bar & Filters */}
                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex items-center max-w-2xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar producto, marca, código..."
                            className="w-full pl-11 pr-4 py-3 border-none bg-transparent rounded-lg text-sm focus:ring-0 placeholder:text-gray-400 font-medium text-gray-700"
                            defaultValue={query}
                        />
                    </div>
                    <div className="h-6 w-px bg-gray-100 mx-2"></div>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:bg-gray-50 rounded-lg mr-1 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Red Header Table - Matching Reference Image */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#FF0000] text-white uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-4 py-3 w-[100px] text-center">ACCIONES</th>
                                <th className="px-6 py-3">PRODUCTO</th>
                                <th className="px-6 py-3">MARCA</th>
                                <th className="px-6 py-3">MEDIDA</th>
                                <th className="px-6 py-3 text-center">CATEGORÍA</th>
                                <th className="px-6 py-3 text-center">STOCK</th>
                                <th className="px-6 py-3 text-right">PRECIO VENTA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron productos coincidentes.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-red-50/30 transition-colors group">
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 font-bold text-gray-900 uppercase">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 uppercase">
                                            {product.brand}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 font-mono text-xs">
                                            {product.size}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`
                                                px-2 py-0.5 rounded text-[10px] font-bold uppercase border
                                                ${product.category === 'NUEVO' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                                ${product.category === 'USADO' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                                                ${product.category === 'INSUMO' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                                             `}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <span className={`font-bold ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-right font-bold text-gray-900">
                                            ${product.sellPrice}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
