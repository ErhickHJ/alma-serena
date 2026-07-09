// Admin — Lista de suscriptores al newsletter
// Paginada, sin búsqueda (pocos registros esperados)

import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminSuscriptoresPage(props: { searchParams?: Promise<{ page?: string }> }) {
  const { page: pageStr } = await (props.searchParams ?? Promise.resolve({ page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.subscriber.count(),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Suscriptores</h1>
        <span className="text-xs text-charcoal/30">{total} total</span>
      </div>
      {subscribers.length === 0 ? (
        <p className="text-charcoal/40 text-sm">No hay suscriptores aún.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="p-4">Email</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Fecha</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 font-medium text-charcoal">{s.email}</td>
                  <td className="p-4 text-charcoal/50">{s.name || "—"}</td>
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <DeleteButton id={s.id} type="subscriber" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/suscriptores" />
        </div>
      )}
    </>
  );
}
