import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Detalle del pedido" };

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.clerkUserId !== session.userId) notFound();

  const statusLabel: Record<string, string> = {
    pending: "Pendiente",
    processing: "Procesando",
    completed: "Completado",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-rose-100 text-rose-700",
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/perfil" className="text-sm text-sage hover:text-sage-dark transition-colors mb-6 inline-block">← Mis pedidos</Link>
        <h1 className="font-serif text-2xl sm:text-3xl text-sage-dark mb-2">Detalle del pedido</h1>
        <p className="text-xs text-charcoal/40 mb-8">ID: {order.id}</p>

        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/50">Producto</span>
            <span className="text-sm font-medium text-charcoal">{order.product}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/50">Monto</span>
            <span className="text-sm font-medium text-charcoal">${(order.amount / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/50">Fecha</span>
            <span className="text-sm text-charcoal">{new Date(order.createdAt).toLocaleDateString("es")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-charcoal/50">Estado</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status] || "bg-gray-100 text-gray-700"}`}>
              {statusLabel[order.status] || order.status}
            </span>
          </div>
          {order.paymentId && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-charcoal/50">Pago ID</span>
              <span className="text-xs text-charcoal/40 font-mono">{order.paymentId}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
