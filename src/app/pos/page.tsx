"use client";

import { ProductSelector } from "@/components/pos/ProductSelector";
import { CartPanel } from "@/components/pos/CartPanel";
import { useState } from "react";

export default function POSPage() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Michelin Primacy 4", price: 145000, qty: 2 },
        { id: 6, name: "Balanceo x Rueda", price: 8500, qty: 2 },
    ]);

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

    return (
        <div className="h-[calc(100vh-8rem)] grid grid-cols-12 gap-6">
            {/* Left Panel: Catalog */}
            <div className="col-span-7 h-full">
                <ProductSelector onAddProduct={handleAddProduct} />
            </div>

            {/* Right Panel: Cart */}
            <div className="col-span-5 h-full">
                <CartPanel items={cartItems} onRemoveItem={handleRemoveItem} />
            </div>
        </div>
    );
}
