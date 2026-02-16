"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
    { id: 1, name: "Michelin Primacy 4", price: 145000, category: "Neumáticos" },
    { id: 2, name: "Pirelli Cinturato P7", price: 168000, category: "Neumáticos" },
    { id: 3, name: "Aceite Shell Helix", price: 52000, category: "Aceites" },
    { id: 4, name: "Filtro Aceite VW", price: 12500, category: "Filtros" },
    { id: 5, name: "Alineación 3D", price: 25000, category: "Servicios" },
    { id: 6, name: "Balanceo x Rueda", price: 8500, category: "Servicios" },
    { id: 7, name: "Parche Vipal", price: 8500, category: "Insumos" },
    { id: 8, name: "Válvula Cromada", price: 3500, category: "Accesorios" },
];

interface ProductSelectorProps {
    onAddProduct: (product: any) => void;
}

export function ProductSelector({ onAddProduct }: ProductSelectorProps) {
    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar productos (Código, Nombre)..."
                        className="pl-9 bg-white shadow-sm"
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer px-4 py-1.5 h-auto rounded-full">Todos</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-1.5 h-auto rounded-full bg-white">Neumáticos</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-1.5 h-auto rounded-full bg-white">Aceites</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-1.5 h-auto rounded-full bg-white">Filtros</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted px-4 py-1.5 h-auto rounded-full bg-white">Servicios</Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto pr-2 pb-4">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all active:scale-95 bg-white"
                        onClick={() => onAddProduct(product)}
                    >
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="secondary" className="text-[10px] h-5">{product.category}</Badge>
                            </div>
                            <h3 className="font-medium text-sm line-clamp-2 min-h-[40px] leading-tight">
                                {product.name}
                            </h3>
                            <div className="text-lg font-bold text-primary">
                                ${product.price.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
