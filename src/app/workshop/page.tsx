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
import { Card } from "@/components/ui/card";
import { Search, Filter, Eye, Printer, Car } from "lucide-react";

const orders = [
    { id: "ORD-089", client: "Juan Perez", vehicle: "Ford Focus - AD 123 CD", service: "Cambio de Aceite y Filtros", status: "finished", date: "Hoy, 10:30" },
    { id: "ORD-090", client: "Maria Rodriguez", vehicle: "Toyota Corolla - AA 987 KK", service: "Alineación y Balanceo", status: "in_process", date: "Hoy, 11:15" },
    { id: "ORD-091", client: "Roberto Gomez", vehicle: "VW Amarok - AF 555 ER", service: "Cambio de Neumáticos (4)", status: "pending", date: "Hoy, 12:00" },
    { id: "ORD-092", client: "Laura Silva", vehicle: "Peugeot 208 - AE 333 ZZ", service: "Parche Rueda Trasera", status: "pending", date: "Hoy, 12:30" },
];

export default function WorkshopPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary">Taller y Servicios</h2>
                    <p className="text-muted-foreground">Gestión de órdenes de trabajo en el taller.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <Car className="mr-2 h-4 w-4" />
                    Nueva Orden
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-white">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="relative w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por cliente, patente u orden..." className="pl-9 bg-white" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9">
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filtrar Estado
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="w-[100px]">Orden</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Vehículo</TableHead>
                            <TableHead>Servicios Solicitados</TableHead>
                            <TableHead>Fecha / Hora</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium text-xs text-muted-foreground">{order.id}</TableCell>
                                <TableCell className="font-medium">{order.client}</TableCell>
                                <TableCell>{order.vehicle}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                                <TableCell className="text-center">
                                    {order.status === "pending" && <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>}
                                    {order.status === "in_process" && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En Proceso</Badge>}
                                    {order.status === "finished" && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Finalizado</Badge>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Printer className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Kanban-like status summary (Optional visual aid) */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="bg-yellow-50/50 border-yellow-100">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-yellow-800">Pendientes</span>
                        <span className="text-2xl font-bold text-yellow-900">2</span>
                    </div>
                </Card>
                <Card className="bg-blue-50/50 border-blue-100">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">En Proceso</span>
                        <span className="text-2xl font-bold text-blue-900">1</span>
                    </div>
                </Card>
                <Card className="bg-emerald-50/50 border-emerald-100">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-emerald-800">Finalizados (Hoy)</span>
                        <span className="text-2xl font-bold text-emerald-900">14</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
