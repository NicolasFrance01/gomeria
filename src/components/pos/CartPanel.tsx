"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus, CreditCard, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CartPanelProps {
    items: any[];
    onRemoveItem: (id: number) => void;
}

export function CartPanel({ items, onRemoveItem }: CartPanelProps) {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const total = subtotal; // Pending discount logic

    return (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-4 border-b bg-gray-50/50">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                    Nueva Venta <span className="text-muted-foreground font-normal text-sm">#00124</span>
                </h2>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-0">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                        <TableRow>
                            <TableHead className="w-[50%]">Producto</TableHead>
                            <TableHead className="text-center w-[20%]">Cant.</TableHead>
                            <TableHead className="text-right w-[20%]">Total</TableHead>
                            <TableHead className="w-[10%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-[300px] text-center text-muted-foreground">
                                    No hay productos en el carrito
                                </TableCell>
                            </TableRow>
                        ) : items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">${item.price.toLocaleString()} un.</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-1">
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                    ${(item.price * item.qty).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Footer / Actions */}
            <div className="p-4 bg-gray-50 border-t space-y-4">

                {/* Summaries */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Descuento (0%)</span>
                        <span>$0</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-primary pt-2 border-t">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                        Cancelar
                    </Button>
                    <Button className="h-12 text-lg font-semibold bg-primary hover:bg-primary/90">
                        Cobrar
                    </Button>
                </div>
            </div>
        </div>
    );
}
