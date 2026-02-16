"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddProductModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Producto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>Nuevo Producto</DialogTitle>
                    <DialogDescription>
                        Ingrese los detalles del nuevo producto para el inventario.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Código / SKU</Label>
                            <Input id="code" placeholder="EJ: NEU-001" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brand">Marca</Label>
                            <Input id="brand" placeholder="Ej: Michelin" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Producto</Label>
                        <Input id="name" placeholder="Ej: Neumático Primacy 4" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="size">Medida / Especificación</Label>
                            <Input id="size" placeholder="Ej: 205/55 R16" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Input id="category" placeholder="Ej: Neumáticos" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Inicial</Label>
                            <Input id="stock" type="number" className="text-right" placeholder="0" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="min">Stock Mínimo</Label>
                            <Input id="min" type="number" className="text-right" placeholder="5" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio Venta ($)</Label>
                            <Input id="price" type="number" className="text-right" placeholder="0.00" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit">Guardar Producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
