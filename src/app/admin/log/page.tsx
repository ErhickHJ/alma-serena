import { prisma } from "@/lib/db";

export const metadata = { title: "Registro de actividad" };

export default async function AdminLogPage() {
  const logs = await prisma.adminLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Registro de actividad</h1>
      {logs.length === 0 ? (
        <p className="text-charcoal/40 text-sm">Sin actividad registrada aún.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Usuario</th>
                  <th className="p-3">Acción</th>
                  <th className="p-3">Detalle</th>
                  <th className="p-3">IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors text-xs">
                    <td className="p-3 text-charcoal/40 whitespace-nowrap">{new Date(l.createdAt).toLocaleString("es")}</td>
                    <td className="p-3 text-charcoal">{l.email || l.userId.slice(0, 12)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-sage/10 text-sage-dark font-mono">{l.action}</span>
                    </td>
                    <td className="p-3 text-charcoal/60 max-w-[200px] truncate">{l.details}</td>
                    <td className="p-3 text-charcoal/40 font-mono">{l.ip || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
