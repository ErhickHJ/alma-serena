import { prisma } from "@/lib/db";
import { StatusSelect } from "@/components/StatusSelect";
import { DeleteButton } from "@/components/DeleteButton";

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Pedidos</h1>
      {orders.length === 0 ? (
        <p className="text-charcoal/40 text-sm">No hay pedidos registrados.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="p-4">Cliente</th>
                <th className="p-4">Email</th>
                <th className="p-4">Total</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Fecha</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 font-medium text-charcoal">{o.name}</td>
                  <td className="p-4 text-charcoal/50">{o.email}</td>
                  <td className="p-4 text-charcoal">${(o.amount / 100).toFixed(2)}</td>
                  <td className="p-4">
                    <StatusSelect orderId={o.id} current={o.status} />
                  </td>
                  <td className="p-4 text-charcoal/40">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <DeleteButton id={o.id} type="order" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
