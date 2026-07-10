import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminBlogPage(props: { searchParams?: Promise<{ page?: string; q?: string; pub?: string }> }) {
  const { page: pageStr, q = "", pub = "" } = await (props.searchParams ?? Promise.resolve({ page: "1", q: "", pub: "" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" as const } },
      { slug: { contains: q, mode: "insensitive" as const } },
    ];
  }
  if (pub === "published") where.published = true;
  if (pub === "draft") where.published = false;
  const [posts, total] = await Promise.all([
    prisma.post.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.post.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Blog</h1>
        <Link href="/admin/blog/nuevo" className="px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">+ Nuevo artículo</Link>
      </div>

      <form className="flex gap-2 mb-6">
        <input type="text" name="q" defaultValue={q || ""} placeholder="Buscar por título o slug..." aria-label="Buscar artículo" className="flex-1 max-w-xs px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        <select name="pub" defaultValue={pub || ""} aria-label="Filtrar por estado" className="px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
          <option value="">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-sage text-white rounded-lg text-sm hover:bg-sage-dark transition-colors">Filtrar</button>
      </form>

      {posts.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{q || pub ? "Sin resultados." : "No hay artículos aún."}</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                  <th className="p-4">Título</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                    <td className="p-4">
                      <Link href={`/admin/blog/${p.id}`} className="font-medium text-charcoal hover:text-sage-dark transition-colors">{p.title}</Link>
                    </td>
                    <td className="p-4 text-charcoal/40 font-mono text-xs whitespace-nowrap">{p.slug}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{p.published ? "Publicado" : "Borrador"}</span>
                    </td>
                    <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-2 whitespace-nowrap">
                      <Link href={`/admin/blog/${p.id}`} className="text-xs text-sage hover:text-sage-dark transition-colors">Editar</Link>
                      {p.slug && <Link href={`/blog/${p.slug}`} className="text-xs text-charcoal/40 hover:text-sage-dark transition-colors" target="_blank">Ver</Link>}
                      <DeleteButton id={p.id} type="post" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/blog" query={q} />
        </div>
      )}
    </>
  );
}
