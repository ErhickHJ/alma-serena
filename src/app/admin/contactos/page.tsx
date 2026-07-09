// Admin — Gestión de mensajes de contacto
// Lista paginada con búsqueda por nombre/email/asunto

import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminContactosPage(props: { searchParams?: Promise<{ page?: string; q?: string }> }) {
  const { page: pageStr, q = "" } = await (props.searchParams ?? Promise.resolve({ q: "" }));
  const page = Math.max(1, Number(pageStr) || 1);

  const where = q
    ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }, { subject: { contains: q, mode: "insensitive" } }] }
    : {};

  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.contactMessage.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Contactos</h1>
        <span className="text-xs text-charcoal/30">{total} total</span>
      </div>

      <form className="mb-6 max-w-xs">
        <input type="text" name="q" defaultValue={q || ""} placeholder="Buscar por nombre, email o asunto..." className="w-full px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
      </form>

      {messages.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{q ? "Sin resultados." : "No hay mensajes aún."}</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="p-4">Nombre</th>
                <th className="p-4">Email</th>
                <th className="p-4">Asunto</th>
                <th className="p-4">Mensaje</th>
                <th className="p-4">Fecha</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 font-medium text-charcoal">{m.name}</td>
                  <td className="p-4 text-charcoal/50">{m.email}</td>
                  <td className="p-4 text-charcoal/70">{m.subject || "—"}</td>
                  <td className="p-4 text-charcoal/50 max-w-xs truncate">{m.message}</td>
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <DeleteButton id={m.id} type="contact" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/contactos" query={q} />
        </div>
      )}
    </>
  );
}
