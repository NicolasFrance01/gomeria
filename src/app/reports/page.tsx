"use client";

import { ReportsChart } from "@/components/reports/ReportsChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { SalesChart } from "@/components/dashboard/SalesChart";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary">Reportes y Análisis</h2>
                    <p className="text-muted-foreground">Estadísticas detalladas de rendimiento.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5 h-10 shadow-sm">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Últimos 30 días</span>
                    </div>
                    <Button variant="outline" className="h-10">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar PDF
                    </Button>
                </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                        <span className="text-emerald-500 font-bold">+12%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4,231,000</div>
                        <p className="text-xs text-muted-foreground">vs. $3.8M mes anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                        <span className="text-red-500 font-bold">-2%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$24,500</div>
                        <p className="text-xs text-muted-foreground">vs $25,100 mes anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
                        <span className="text-emerald-500 font-bold">+5%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground">+8 esta semana</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReportsChart />
                {/* Reusing SalesChart for demo purposes, could be another chart */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Top Productos Vendidos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs">1</div>
                                        <span className="font-medium text-sm">Michelin Primacy 4</span>
                                    </div>
                                    <span className="font-bold text-sm">124 un.</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs">2</div>
                                        <span className="font-medium text-sm">Shell Helix HX8</span>
                                    </div>
                                    <span className="font-bold text-sm">98 un.</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs">3</div>
                                        <span className="font-medium text-sm">Filtro Aceite VW</span>
                                    </div>
                                    <span className="font-bold text-sm">85 un.</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs">4</div>
                                        <span className="font-medium text-sm">Alineación 3D</span>
                                    </div>
                                    <span className="font-bold text-sm">76 un.</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-xs">5</div>
                                        <span className="font-medium text-sm">Parche Vipal</span>
                                    </div>
                                    <span className="font-bold text-sm">62 un.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
