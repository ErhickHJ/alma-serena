import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/DeleteButton";

export default async function AdminContactosPage() {
  const contacts = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Mensajes de contacto</h1>
      {contacts.length === 0 ? (
        <p className="text-charcoal/40 text-sm">No hay mensajes aún.</p>
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
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 font-medium text-charcoal">{c.name}</td>
                  <td className="p-4 text-charcoal/50">{c.email}</td>
                  <td className="p-4 text-charcoal/70">{c.subject || "—"}</td>
                  <td className="p-4 text-charcoal/60 max-w-xs truncate">{c.message}</td>
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <DeleteButton id={c.id} type="contact" />
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
