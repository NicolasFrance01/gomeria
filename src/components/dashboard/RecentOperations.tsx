import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

export function RecentOperations() {
    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Recent Transactions Table */}
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Últimas Operaciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Servicio / Producto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Juan Pérez</TableCell>
                                <TableCell>Cambio de Aceite + Filtros</TableCell>
                                <TableCell>
                                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Completado</Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">$45,000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Maria Rodriguez</TableCell>
                                <TableCell>Alineación y Balanceo</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">En Proceso</Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">$28,000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Roberto Gomez</TableCell>
                                <TableCell>2x Neumáticos Michellin</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Pendiente</Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">$320,000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Ana Silva</TableCell>
                                <TableCell>Parche y Reparación</TableCell>
                                <TableCell>
                                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Completado</Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">$8,500</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Carlos Ruiz</TableCell>
                                <TableCell>Bateria 12V 75Ah</TableCell>
                                <TableCell>
                                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Completado</Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">$115,000</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Stock Alerts */}
            <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-700">
                        <AlertCircle className="h-5 w-5" />
                        Alertas de Stock
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-sm text-gray-800">Aceite Sintético 5W30</p>
                                <p className="text-xs text-gray-500">Shell Helix - 4L</p>
                            </div>
                            <div className="text-right">
                                <span className="text-red-600 font-bold text-sm">2 un.</span>
                                <p className="text-[10px] text-gray-400">Min: 5</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-sm text-gray-800">Filtro Aire Ford Ka</p>
                                <p className="text-xs text-gray-500">Original Ford</p>
                            </div>
                            <div className="text-right">
                                <span className="text-red-600 font-bold text-sm">1 un.</span>
                                <p className="text-[10px] text-gray-400">Min: 3</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-sm text-gray-800">Parche Vipal R-01</p>
                                <p className="text-xs text-gray-500">Caja x 100</p>
                            </div>
                            <div className="text-right">
                                <span className="text-orange-600 font-bold text-sm">5 un.</span>
                                <p className="text-[10px] text-gray-400">Min: 10</p>
                            </div>
                        </div>

                        <button className="w-full mt-4 text-xs font-medium text-primary hover:underline">
                            Ver todo el inventario →
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
