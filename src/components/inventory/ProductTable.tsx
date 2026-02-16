"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Search, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Mock Data
const products = [
    { id: 1, name: "Michelin Primacy 4", brand: "Michelin", size: "205/55 R16", stock: 12, price: 145000, status: "active" },
    { id: 2, name: "Pirelli Cinturato P7", brand: "Pirelli", size: "225/45 R17", stock: 8, price: 168000, status: "active" },
    { id: 3, name: "Bridgestone Turanza", brand: "Bridgestone", size: "195/65 R15", stock: 4, price: 125000, status: "low_stock" },
    { id: 4, name: "Aceite Shell Helix HX8", brand: "Shell", size: "4 Litros", stock: 24, price: 52000, status: "active" },
    { id: 5, name: "Filtro Aceite VW Gol", brand: "Wega", size: "WO-340", stock: 0, price: 12500, status: "out_of_stock" },
    { id: 6, name: "Parche Vipal R-01", brand: "Vipal", size: "Caja x 100", stock: 5, price: 8500, status: "low_stock" },
    { id: 7, name: "Goodyear EfficientGrip", brand: "Goodyear", size: "215/60 R17", stock: 16, price: 195000, status: "active" },
    { id: 8, name: "Fate Eximia Pininfarina", brand: "Fate", size: "185/60 R15", stock: 20, price: 95000, status: "active" },
];

export function ProductTable() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nombre, marca o medida..."
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0 bg-white">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Mostrando {products.length} productos
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Producto</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Medida / Esp.</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="w-[100px] text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-primary">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.size}</TableCell>
                                <TableCell className="text-right font-medium">
                                    {product.stock} un.
                                </TableCell>
                                <TableCell className="text-right font-medium text-slate-700">
                                    ${product.price.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    {product.status === "active" && (
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            Normal
                                        </Badge>
                                    )}
                                    {product.status === "low_stock" && (
                                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                            Bajo Stock
                                        </Badge>
                                    )}
                                    {product.status === "out_of_stock" && (
                                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                            Sin Stock
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                                            <Edit2 className="h-4 w-4 text-slate-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                                            <Trash2 className="h-4 w-4 text-slate-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
