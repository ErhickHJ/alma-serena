import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminBlogPage(props: { searchParams?: Promise<{ page?: string }> }) {
  const { page: pageStr } = await (props.searchParams ?? Promise.resolve({ page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const [posts, total] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.post.count(),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Blog</h1>
        <Link href="/admin/blog/nuevo" className="px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">+ Nuevo artículo</Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-charcoal/40 text-sm">No hay artículos aún.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
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
                  <td className="p-4 text-charcoal/40 font-mono text-xs">{p.slug}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{p.published ? "Publicado" : "Borrador"}</span>
                  </td>
                  <td className="p-4 text-charcoal/40 whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/blog/${p.id}`} className="text-xs text-sage hover:text-sage-dark transition-colors">Editar</Link>
                    <DeleteButton id={p.id} type="post" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/blog" />
        </div>
      )}
    </>
  );
}
