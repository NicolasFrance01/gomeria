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
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#FF0000] inline-block rounded-sm"></span>
                        LISTADO DE PRODUCTOS
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 pl-4">Gestión de inventario y stock.</p>
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-bold uppercase transition-colors">
                        <Printer className="w-4 h-4" />
                        Imprimir
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-bold uppercase transition-colors">
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                    <ProductForm providers={providers}>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#FF0000] hover:bg-red-700 text-white rounded text-xs font-bold uppercase shadow-md shadow-red-500/20 transition-all active:scale-95">
                            <Plus className="w-4 h-4" />
                            NUEVO PRODUCTO
                        </button>
                    </ProductForm>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-sm border border-gray-200 flexGap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, código o medida..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#FF0000] transition-colors uppercase placeholder:normal-case"
                        defaultValue={query}
                    />
                </div>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600">
                    <Filter className="w-4 h-4" />
                </button>
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
