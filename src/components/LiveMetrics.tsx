"use client";

import { useState, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

type Metrics = {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalSubscribers: number;
  totalContacts: number;
  totalProducts: number;
  totalPosts: number;
  partnerProductCount: number;
  partnerOrderCount: number;
  partnerRevenue: number;
  recentOrders: { id: string; name: string; email: string; product: string; amount: number; status: string; createdAt: string; type: string }[];
  ordersByStatus: { status: string; count: number }[];
  dailyOrders: { date: string; count: number; revenue: number }[];
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#eab308",
  processing: "#3b82f6",
  completed: "#22c55e",
  shipped: "#6366f1",
  delivered: "#14b8a6",
  cancelled: "#ef4444",
};

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/metrics");
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
        setLastUpdate(new Date());
        setError("");
      } else {
        setError(data.error || "Error");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  if (loading) return <p className="text-xs text-charcoal/40">Cargando métricas...</p>;
  if (error) return <p className="text-xs text-red-400">{error}</p>;
  if (!metrics) return null;

  const cards = [
    { label: "Ingresos totales", value: `$${(metrics.totalRevenue / 100).toFixed(2)}`, icon: "💰" },
    { label: "Pedidos", value: metrics.totalOrders, icon: "📦" },
    { label: "Completados", value: metrics.completedOrders, icon: "✅" },
    { label: "Pendientes", value: metrics.pendingOrders, icon: "⏳" },
    { label: "Productos", value: metrics.totalProducts, icon: "🛍️" },
    { label: "Productos partners", value: metrics.partnerProductCount, icon: "🤝" },
    { label: "Ventas partners", value: metrics.partnerOrderCount, icon: "🏪" },
    { label: "Ingresos partners", value: `$${(metrics.partnerRevenue / 100).toFixed(2)}`, icon: "💵" },
    { label: "Suscriptores", value: metrics.totalSubscribers, icon: "✉️" },
    { label: "Mensajes", value: metrics.totalContacts, icon: "💬" },
    { label: "Posts", value: metrics.totalPosts, icon: "📝" },
  ];

  const pieData = metrics.ordersByStatus.map(s => ({ name: s.status, value: s.count }));
  const chartData = metrics.dailyOrders.map(d => ({ date: d.date.slice(5), pedidos: d.count, ingresos: d.revenue / 100 }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-charcoal/40">Actualización automática cada 30s</span>
        </div>
        {lastUpdate && (
          <span className="text-[10px] text-charcoal/30">Última actualización: {lastUpdate.toLocaleTimeString("es")}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-5 flex items-center gap-4">
            <span className="text-2xl shrink-0">{c.icon}</span>
            <div>
              <p className="text-xs text-charcoal/40 uppercase tracking-wider">{c.label}</p>
              <p className="text-xl font-semibold text-sage-dark">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-warm-white rounded-xl border border-sage/10 p-5">
            <h3 className="text-sm font-medium text-charcoal/70 mb-4">Pedidos por día (últimos 30 días)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="pedidos" fill="#8ba888" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-warm-white rounded-xl border border-sage/10 p-5">
            <h3 className="text-sm font-medium text-charcoal/70 mb-4">Ingresos por día (últimos 30 días)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, "Ingresos"]} />
                <Area type="monotone" dataKey="ingresos" stroke="#c9a98c" fill="#c9a98c" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {pieData.length > 0 && (
        <div className="bg-warm-white rounded-xl border border-sage/10 p-5 mb-8">
          <h3 className="text-sm font-medium text-charcoal/70 mb-4">Distribución de pedidos por estado</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {pieData.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[s.name] || "#94a3b8" }} />
                  <span className="text-charcoal/60 capitalize">{s.name}</span>
                  <span className="font-medium text-charcoal">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {metrics.recentOrders.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-charcoal/70 mb-3">Últimos 10 pedidos</h3>
          <div className="bg-warm-white rounded-xl border border-sage/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-xs text-charcoal/40 uppercase tracking-wider">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Producto</th>
                  <th className="px-4 py-2">Monto</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {metrics.recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-sage/5 last:border-0 hover:bg-sage/5 transition-colors">
                    <td className="px-4 py-2 font-medium text-charcoal">{o.name}</td>
                    <td className="px-4 py-2 text-charcoal/60">{o.product}</td>
                    <td className="px-4 py-2 text-gold font-medium">${(o.amount / 100).toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${o.status === "completed" ? "bg-green-100 text-green-700" : o.status === "pending" ? "bg-yellow-100 text-yellow-700" : o.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-charcoal/40 text-xs">{o.type}</td>
                    <td className="px-4 py-2 text-charcoal/40 text-xs">{new Date(o.createdAt).toLocaleDateString("es")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
