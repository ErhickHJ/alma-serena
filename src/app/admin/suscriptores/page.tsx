// Admin — Lista de suscriptores al newsletter
// Paginada, sin búsqueda (pocos registros esperados)

import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";
import ExportCSVButton from "@/components/ExportCSVButton";

const PER_PAGE = 20;

export default async function AdminSuscriptoresPage(props: { searchParams?: Promise<{ page?: string; q?: string }> }) {
  const { page: pageStr, q = "" } = await (props.searchParams ?? Promise.resolve({ page: "1", q: "" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { email: { contains: q, mode: "insensitive" as const } },
      { name: { contains: q, mode: "insensitive" as const } },
    ];
  }
  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.subscriber.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Suscriptores</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-charcoal/30">{total} total</span>
          {subscribers.length > 0 && (
            <ExportCSVButton data={subscribers.map(s => ({ email: s.email, name: s.name, fecha: new Date(s.createdAt).toLocaleDateString() }))} filename="suscriptores.csv" />
          )}
        </div>
      </div>

      <form className="mb-6 max-w-xs">
        <input type="text" name="q" defaultValue={q || ""} placeholder="Buscar por email o nombre..." className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </form>

      {subscribers.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{q ? "Sin resultados." : "No hay suscriptores aún."}</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                  <td className="p-4 font-medium text-charcoal whitespace-nowrap"><a href={`mailto:${s.email}`} className="hover:text-sage-dark transition-colors">{s.email}</a></td>
                  <td className="p-4 text-charcoal/50">{s.name || "—"}</td>
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 whitespace-nowrap">
                    <DeleteButton id={s.id} type="subscriber" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/suscriptores" query={q} />
        </div>
      )}
    </>
  );
}
