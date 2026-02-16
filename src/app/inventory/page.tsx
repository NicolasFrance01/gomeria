import { ProductTable } from "@/components/inventory/ProductTable";
import { AddProductModal } from "@/components/inventory/AddProductModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary">Inventario</h2>
                    <p className="text-muted-foreground">Gestione el stock de productos y servicios.</p>
                </div>
                <AddProductModal />
            </div>

            <ProductTable />
        </div>
    );
}
