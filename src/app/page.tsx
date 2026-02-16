import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentOperations } from "@/components/dashboard/RecentOperations";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <MetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SalesChart />
        {/* Quick Actions / Mini Widget could go here in the 4th column if needed, or chart expands */}
        <div className="col-span-1 space-y-6">
          {/* Simple Calendar or Todo Widget to fill 4th column matching height approx */}
          <div className="bg-gradient-to-br from-primary to-slate-800 rounded-xl p-6 text-white h-[200px] flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="font-bold text-lg">Acceso Rápido</h3>
              <p className="text-slate-300 text-sm mt-1">Gestión inmediata</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded text-xs font-medium text-center">
                Nueva Venta
              </button>
              <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded text-xs font-medium text-center">
                Nuevo Turno
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6 h-[175px] shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Objetivo Mensual</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold text-primary">65%</span>
              <span className="text-sm text-gray-500 mb-1">completado</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-accent h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <RecentOperations />
    </div>
  );
}
