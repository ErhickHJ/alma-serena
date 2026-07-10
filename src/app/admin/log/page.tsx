// Admin — Registro de auditoría (actividad de administradores)
// Paginación de 50 por página (más que otras listas por ser solo texto)

import { prisma } from "@/lib/db";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 50;

export const metadata = { title: "Registro de actividad" };

export default async function AdminLogPage(props: { searchParams?: Promise<{ page?: string; action?: string }> }) {
  const { page: pageStr, action: actionFilter = "" } = await (props.searchParams ?? Promise.resolve({ page: "1", action: "" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const where: Record<string, unknown> = {};
  if (actionFilter) where.action = actionFilter;
  const [logs, total] = await Promise.all([
    prisma.adminLog.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.adminLog.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  const actionTypes = ["order_update", "product_create", "product_update", "post_create", "post_update", "delete"];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Registro de actividad</h1>
        <span className="text-xs text-charcoal/30">{total} registros</span>
      </div>

      <form className="mb-6">
        <select name="action" defaultValue={actionFilter || ""} onChange={(e) => e.currentTarget.form?.requestSubmit()} aria-label="Filtrar por acción" className="px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
          <option value="">Todas las acciones</option>
          {actionTypes.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </form>

      {logs.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{actionFilter ? "Sin resultados para este filtro." : "Sin actividad registrada aún."}</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="p-4">Fecha</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Acción</th>
                <th className="p-4">Detalle</th>
                <th className="p-4">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="p-4 text-charcoal/70 whitespace-nowrap">{l.email || l.userId.slice(0, 8)}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage-dark font-mono">{l.action}</span>
                  </td>
                  <td className="p-4 text-charcoal/50 max-w-[200px] truncate">{l.details}</td>
                  <td className="p-4 text-charcoal/30 font-mono text-xs whitespace-nowrap">{l.ip || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/log" />
        </div>
      )}
    </>
  );
}
