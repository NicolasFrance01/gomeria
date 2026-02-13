"use client"

import { useState, useMemo } from "react"
import { createSale } from "@/app/actions/sales"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Trash2, Plus, Minus } from "lucide-react"

type Product = {
    id: string
    name: string
    brand: string | null
    size: string | null
    stock: number
    sellPrice: number
    category: string
}

type CartItem = Product & {
    quantity: number
}

export function POS({ products }: { products: Product[] }) {
    const [query, setQuery] = useState("")
    const [cart, setCart] = useState<CartItem[]>([])
    const [paymentMethod, setPaymentMethod] = useState("EFECTIVO")
    const [loading, setLoading] = useState(false)

    const filteredProducts = useMemo(() => {
        if (!query) return []
        const q = query.toLowerCase()
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            (p.size && p.size.toLowerCase().includes(q))
        ).slice(0, 5) // Limit results
    }, [query, products])

    const addToCart = (product: Product) => {
        if (product.stock <= 0) return
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                if (existing.quantity >= product.stock) return prev
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setQuery("")
    }

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta
                if (newQty > 0 && newQty <= item.stock) return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    const total = cart.reduce((acc, item) => acc + item.sellPrice * item.quantity, 0)

    const handleSale = async () => {
        if (cart.length === 0) return
        if (!confirm(`¿Confirmar venta por $${total}?`)) return

        setLoading(true)
        const items = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.sellPrice
        }))

        const res = await createSale(items, paymentMethod)

        setLoading(false)
        if (res.success) {
            alert("Venta registrada con éxito")
            setCart([])
            setQuery("")
        } else {
            alert(res.error)
        }
    }

    return (
        <div className="grid gap-4 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col gap-4">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Buscador de Productos</CardTitle>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar por nombre, marca o medida..."
                                className="pl-8"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        <div className="grid gap-2">
                            {query && filteredProducts.length === 0 && (
                                <div className="text-center text-muted-foreground py-4">No se encontraron productos</div>
                            )}
                            {filteredProducts.map(product => (
                                <div key={product.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-accent cursor-pointer" onClick={() => addToCart(product)}>
                                    <div>
                                        <div className="font-semibold">{product.name}</div>
                                        <div className="text-sm text-muted-foreground">{product.brand} {product.size}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="outline">{product.category}</Badge>
                                        <div className="font-bold">${product.sellPrice}</div>
                                        <Button size="icon" variant="ghost" disabled={product.stock <= 0}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4">
                <Card className="flex flex-col h-full">
                    <CardHeader className="bg-muted/50">
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Nueva Venta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto py-4">
                        {cart.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                Carrito vacío
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-start pb-4 border-b last:border-0">
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.brand} {item.size}</div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="font-bold">${item.sellPrice * item.quantity}</div>
                                            <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 bg-muted/50 border-t pt-6">
                        <div className="flex w-full justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <div className="w-full grid gap-2">
                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Forma de Pago" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                                    <SelectItem value="DEBITO">Débito</SelectItem>
                                    <SelectItem value="CREDITO">Crédito</SelectItem>
                                    <SelectItem value="TRANSFERENCIA">Transferencia</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full" size="lg" onClick={handleSale} disabled={cart.length === 0 || loading}>
                                {loading ? "Procesando..." : "Cobrar"}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
