"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createProduct } from "@/app/actions/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

type Provider = {
    id: string
    name: string
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar"}
        </Button>
    )
}

export function ProductForm({ providers }: { providers: Provider[] }) {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")

    async function clientAction(formData: FormData) {
        const res = await createProduct(formData)
        if (res.error) {
            setError(res.error)
        } else {
            setOpen(false)
            setError("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Producto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Agregar Producto</DialogTitle>
                </DialogHeader>
                <form action={clientAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre *</Label>
                            <Input id="name" name="name" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brand">Marca</Label>
                            <Input id="brand" name="brand" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="size">Medida</Label>
                            <Input id="size" name="size" placeholder="Ej: 195/65 R15" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría *</Label>
                            <Select name="category" required defaultValue="NUEVO">
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NUEVO">Nuevo</SelectItem>
                                    <SelectItem value="USADO">Usado</SelectItem>
                                    <SelectItem value="INSUMO">Insumo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="buyPrice">Precio Compra ($)</Label>
                            <Input id="buyPrice" name="buyPrice" type="number" min="0" step="0.01" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sellPrice">Precio Venta ($)</Label>
                            <Input id="sellPrice" name="sellPrice" type="number" min="0" step="0.01" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Actual</Label>
                            <Input id="stock" name="stock" type="number" min="0" required defaultValue="0" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="minStock">Stock Minimo</Label>
                            <Input id="minStock" name="minStock" type="number" min="0" defaultValue="2" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="providerId">Proveedor</Label>
                        <Select name="providerId">
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                                {providers.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex justify-end pt-4">
                        <SubmitButton />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
