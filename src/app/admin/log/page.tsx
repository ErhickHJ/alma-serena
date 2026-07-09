// Admin — Registro de auditoría (actividad de administradores)
// Paginación de 50 por página (más que otras listas por ser solo texto)

import { prisma } from "@/lib/db";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 50;

export const metadata = { title: "Registro de actividad" };

export default async function AdminLogPage(props: { searchParams?: Promise<{ page?: string }> }) {
  const { page: pageStr } = await (props.searchParams ?? Promise.resolve({ page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const [logs, total] = await Promise.all([
    prisma.adminLog.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.adminLog.count(),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Registro de actividad</h1>
        <span className="text-xs text-charcoal/30">{total} registros</span>
      </div>
      {logs.length === 0 ? (
        <p className="text-charcoal/40 text-sm">Sin actividad registrada aún.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
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
                  <td className="p-4 text-charcoal/70">{l.email || l.userId.slice(0, 8)}</td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage-dark font-mono">{l.action}</span>
                  </td>
                  <td className="p-4 text-charcoal/50 max-w-[200px] truncate">{l.details}</td>
                  <td className="p-4 text-charcoal/30 font-mono text-xs">{l.ip || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/log" />
        </div>
      )}
    </>
  );
}
