// Admin — Panel de estadísticas con métricas clave
// Muestra totales de pedidos, ingresos, productos, suscriptores, contactos y posts

import { prisma } from "@/lib/db";

export const metadata = { title: "Estadísticas" };

export default async function AdminStatsPage() {
  const [
    orderCount,
    revenue,
    productCount,
    subscriberCount,
    contactCount,
    postTotal,
    postPublished,
    pendingOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { amount: true } }),
    prisma.product.count(),
    prisma.subscriber.count(),
    prisma.contactMessage.count(),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.order.count({ where: { status: "pending" } }),
  ]);

  const cards = [
    { label: "Ingresos totales", value: `$${((revenue._sum.amount || 0) / 100).toFixed(2)}`, icon: "💰" },
    { label: "Pedidos", value: orderCount, icon: "📦" },
    { label: "Pendientes", value: pendingOrders, icon: "⏳" },
    { label: "Productos", value: productCount, icon: "🛍️" },
    { label: "Suscriptores", value: subscriberCount, icon: "✉️" },
    { label: "Mensajes", value: contactCount, icon: "💬" },
    { label: "Posts totales", value: postTotal, icon: "📝" },
    { label: "Posts publicados", value: postPublished, icon: "✅" },
  ];

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Estadísticas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </>
  );
}
