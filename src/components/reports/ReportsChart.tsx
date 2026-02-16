"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { name: "Ene", ventas: 4000, servicios: 2400 },
    { name: "Feb", ventas: 3000, servicios: 1398 },
    { name: "Mar", ventas: 2000, servicios: 9800 },
    { name: "Abr", ventas: 2780, servicios: 3908 },
    { name: "May", ventas: 1890, servicios: 4800 },
    { name: "Jun", ventas: 2390, servicios: 3800 },
    { name: "Jul", ventas: 3490, servicios: 4300 },
];

export function ReportsChart() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Análisis Semestral</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{ fill: '#f1f5f9' }}
                            />
                            <Legend />
                            <Bar dataKey="ventas" name="Venta de Productos" fill="#0f172a" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="servicios" name="Servicios de Taller" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
