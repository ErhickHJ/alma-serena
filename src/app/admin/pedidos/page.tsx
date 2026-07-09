// Admin — Gestión de pedidos (ordenes)
// Lista paginada con búsqueda por nombre/email y selector de estado (StatusSelect)

import { prisma } from "@/lib/db";
import { StatusSelect } from "@/components/StatusSelect";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminPedidosPage(props: { searchParams?: Promise<{ page?: string; q?: string }> }) {
  const { page: pageStr, q = "" } = await (props.searchParams ?? Promise.resolve({ page: "1", q: "" }));
  const page = Math.max(1, Number(pageStr) || 1);

  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" as const } },
      { email: { contains: q, mode: "insensitive" as const } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.order.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Pedidos</h1>
        <span className="text-xs text-charcoal/30">{total} total</span>
      </div>

      <form className="mb-6 max-w-xs">
        <input type="text" name="q" defaultValue={q || ""} placeholder="Buscar por nombre o email..." className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </form>

      {orders.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{q ? "Sin resultados." : "No hay pedidos registrados."}</p>
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
          <Pagination page={page} totalPages={totalPages} basePath="/admin/pedidos" query={q} />
        </div>
      )}
    </>
  );
}
