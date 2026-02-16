"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MapPin, Plus, Truck, User as UserIconLucide } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock Data
const initialSuppliers = [
    { id: 1, name: "Distribuidora Michelin", contact: "Carlos Ruiz", phone: "11-4567-8901", email: "ventas@michelin-dist.com.ar", address: "Av. Libertador 1234, CABA", lastOrder: "2023-10-15", status: "active" },
    { id: 2, name: "Lubricantes Shell Oficial", contact: "Ana Gomez", phone: "11-5555-4321", email: "pedidos@geo-lub.com", address: "Ruta 8 Km 20, San Martin", lastOrder: "2023-10-20", status: "active" },
    { id: 3, name: "Repuestos Ford Zona Norte", contact: "Roberto P.", phone: "11-9876-5432", email: "roberto@fordzn.com", address: "Panamericana 123, Tigre", lastOrder: "2023-09-05", status: "inactive" },
    { id: 4, name: "Frenos y Embragues 'El Ruso'", contact: "Dimitri", phone: "11-1111-2222", email: "ruso@frenos.com", address: "Calle Falsa 123, Warnes", lastOrder: "2023-10-18", status: "active" },
];

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [selectedSupplier, setSelectedSupplier] = useState<typeof initialSuppliers[0] | null>(initialSuppliers[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredSuppliers = suppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSupplier = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newSupplier = {
            id: suppliers.length + 1,
            name: formData.get("name") as string,
            contact: formData.get("contact") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            lastOrder: "-",
            status: "active"
        };

        setSuppliers([...suppliers, newSupplier]);
        setIsAddModalOpen(false);
        toast.success("Proveedor agregado correctamente");
        setSelectedSupplier(newSupplier);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            {/* List Panel */}
            <div className="w-1/3 flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar proveedor..."
                            className="pl-9 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button size="icon" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddSupplier} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Comercial / Razón Social</Label>
                                    <Input id="name" name="name" required placeholder="Ej: Distribuidora Oeste" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Contacto Principal</Label>
                                        <Input id="contact" name="contact" required placeholder="Ej: Juan Perez" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <Input id="phone" name="phone" required placeholder="Ej: 11-1234-5678" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="contacto@empresa.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Dirección</Label>
                                    <Input id="address" name="address" placeholder="Av. Principal 123" />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Guardar Proveedor</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                    {filteredSuppliers.map((supplier) => (
                        <Card
                            key={supplier.id}
                            className={`cursor-pointer transition-all hover:bg-slate-50 ${selectedSupplier?.id === supplier.id ? 'border-primary ring-1 ring-primary' : 'bg-white'}`}
                            onClick={() => setSelectedSupplier(supplier)}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-sm">{supplier.name}</h3>
                                    {supplier.status === 'active' ? (
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    ) : (
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{supplier.contact}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Detail Panel */}
            <div className="flex-1">
                {selectedSupplier ? (
                    <Card className="h-full border-none shadow-none bg-transparent">
                        <div className="h-full flex flex-col bg-white rounded-xl border shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="p-8 border-b bg-slate-50/50">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 bg-white border rounded-lg flex items-center justify-center shadow-sm">
                                            <Truck className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-primary">{selectedSupplier.name}</h1>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-muted-foreground font-normal">ID: #{selectedSupplier.id}</Badge>
                                                <Badge className={selectedSupplier.status === 'active' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-700 hover:bg-slate-100"}>
                                                    {selectedSupplier.status === 'active' ? "Activo" : "Inactivo"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" onClick={() => toast.info("Edición próximamente")}>Editar Proveedor</Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        Información de Contacto
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <UserIconLucide className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Contacto Principal</p>
                                                <p className="text-sm font-medium">{selectedSupplier.contact}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Teléfono</p>
                                                <p className="text-sm font-medium">{selectedSupplier.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Email</p>
                                                <p className="text-sm font-medium">{selectedSupplier.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Dirección</p>
                                                <p className="text-sm font-medium">{selectedSupplier.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Historial de Compras</h3>
                                    <Card className="bg-slate-50 border-dashed">
                                        <CardContent className="p-4 text-center text-muted-foreground text-sm">
                                            <p>Última compra: <span className="font-medium text-primary">{selectedSupplier.lastOrder}</span></p>
                                            <p className="mt-2">No hay facturas recientes pendientes.</p>
                                            <Button variant="link" className="mt-2">Ver historial completo</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground bg-white rounded-xl border border-dashed">
                        Seleccione un proveedor para ver los detalles
                    </div>
                )}
            </div>
        </div>
    );
}

function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    )
}
