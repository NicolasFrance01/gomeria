import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Activity, TrendingUp } from "lucide-react";

const metrics = [
    {
        title: "Ventas del Día",
        value: "$124,500",
        change: "+12% vs ayer",
        trend: "up",
        icon: DollarSign,
        color: "text-emerald-600",
        bg: "bg-emerald-100/50",
    },
    {
        title: "Servicios Activos",
        value: "8",
        change: "3 en espera",
        trend: "neutral",
        icon: Activity,
        color: "text-blue-600",
        bg: "bg-blue-100/50",
    },
    {
        title: "Stock Crítico",
        value: "12",
        change: "Items bajo mínimo",
        trend: "down",
        icon: Package,
        color: "text-orange-600",
        bg: "bg-orange-100/50",
    },
    {
        title: "Ingresos Mensuales",
        value: "$3.2M",
        change: "+8.5% vs mes anterior",
        trend: "up",
        icon: TrendingUp,
        color: "text-indigo-600",
        bg: "bg-indigo-100/50",
    },
];

export function MetricsCards() {
    return (
        <div className="grid grid-cols-4 gap-6">
            {metrics.map((metric) => (
                <Card key={metric.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {metric.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${metric.bg}`}>
                            <metric.icon className={`h-4 w-4 ${metric.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{metric.value}</div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                            {metric.change}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
