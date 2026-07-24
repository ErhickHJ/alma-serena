"use client";

import { useState, useEffect, useCallback } from "react";

type Metrics = {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalSubscribers: number;
  totalContacts: number;
  totalProducts: number;
  totalPosts: number;
  recentOrders: { id: string; name: string; email: string; product: string; amount: number; status: string; createdAt: string; type: string }[];
  ordersByStatus: { status: string; count: number }[];
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
    { label: "Suscriptores", value: metrics.totalSubscribers, icon: "✉️" },
    { label: "Mensajes", value: metrics.totalContacts, icon: "💬" },
    { label: "Posts", value: metrics.totalPosts, icon: "📝" },
  ];

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

      {metrics.ordersByStatus.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-charcoal/70 mb-3">Pedidos por estado</h3>
          <div className="flex gap-3 flex-wrap">
            {metrics.ordersByStatus.map((s) => (
              <span key={s.status} className="px-3 py-1.5 rounded-full bg-sage/10 text-xs text-sage-dark font-medium">
                {s.status}: {s.count}
              </span>
            ))}
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
