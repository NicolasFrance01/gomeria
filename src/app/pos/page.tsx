"use client";

import { ProductSelector } from "@/components/pos/ProductSelector";
import { CartPanel } from "@/components/pos/CartPanel";
import { useState } from "react";
import { toast } from "sonner";

export default function POSPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const handleAddProduct = (product: any) => {
        // Check if exists
        const exists = cartItems.find(item => item.id === product.id);
        if (exists) {
            setCartItems(cartItems.map(item =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id: number, delta: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const handleCheckout = () => {
        toast.success("Venta realizada exitosamente!");
        setCartItems([]);
    };

    const handleCancel = () => {
        if (confirm("¿Estás seguro de cancelar la venta actual?")) {
            setCartItems([]);
            toast.info("Venta cancelada");
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] grid grid-cols-12 gap-6">
            {/* Left Panel: Catalog */}
            <div className="col-span-7 h-full">
                <ProductSelector onAddProduct={handleAddProduct} />
            </div>

            {/* Right Panel: Cart */}
            <div className="col-span-5 h-full">
                <CartPanel
                    items={cartItems}
                    onRemoveItem={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    onCheckout={handleCheckout}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}
