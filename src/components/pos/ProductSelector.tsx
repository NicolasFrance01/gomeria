"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const categories = ["Todos", "Neumáticos", "Aceites", "Filtros", "Servicios", "Insumos", "Accesorios"];

interface ProductSelectorProps {
    onAddProduct: (product: any) => void;
}

export function ProductSelector({ onAddProduct }: ProductSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toString().includes(searchTerm);
        const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar productos (Código, Nombre)..."
                        className="pl-9 bg-white shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((cat) => (
                    <Badge
                        key={cat}
                        variant={selectedCategory === cat ? "secondary" : "outline"}
                        className={cn(
                            "cursor-pointer px-4 py-1.5 h-auto rounded-full",
                            selectedCategory === cat
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-white hover:bg-muted"
                        )}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </Badge>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto pr-2 pb-4">
                {filteredProducts.map((product) => (
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
