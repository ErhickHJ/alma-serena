import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminVentasDiversasPage(props: { searchParams?: Promise<{ page?: string; q?: string; cat?: string }> }) {
  const { page: pageStr, q = "", cat = "" } = await (props.searchParams ?? Promise.resolve({ page: "1", q: "", cat: "" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const where: Record<string, unknown> = {};
  if (q) where.name = { contains: q, mode: "insensitive" as const };
  if (cat) where.category = cat;
  const [products, total] = await Promise.all([
    prisma.partnerProduct.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.partnerProduct.count({ where }),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Ventas Diversas</h1>
        <Link href="/admin/ventas-diversas/nuevo" className="px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">+ Nuevo producto</Link>
      </div>

      <form className="flex gap-2 mb-6">
        <input type="text" name="q" defaultValue={q || ""} placeholder="Buscar por nombre..." aria-label="Buscar producto" className="flex-1 max-w-xs px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
        <select name="cat" defaultValue={cat || ""} aria-label="Filtrar por categoría" className="px-4 py-2 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors">
          <option value="">Todas</option>
          <option value="artesanias">Artesanías</option>
          <option value="alimentos">Alimentos</option>
          <option value="bienestar">Bienestar</option>
          <option value="servicios">Servicios</option>
          <option value="otros">Otros</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-sage text-white rounded-lg text-sm hover:bg-sage-dark transition-colors">Filtrar</button>
      </form>

      {products.length === 0 ? (
        <p className="text-charcoal/40 text-sm">{q || cat ? "Sin resultados." : "No hay productos de partners aún."}</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Partner</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Activo</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                    <td className="p-4 font-medium text-charcoal whitespace-nowrap">{p.name}</td>
                    <td className="p-4 text-charcoal/50 whitespace-nowrap">{p.partnerName}</td>
                    <td className="p-4 text-charcoal/50 whitespace-nowrap">{p.category}</td>
                    <td className="p-4 text-charcoal whitespace-nowrap">${(p.price / 100).toFixed(2)}</td>
                    <td className="p-4 text-charcoal whitespace-nowrap">{p.stock}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{p.active ? "Sí" : "No"}</span>
                    </td>
                    <td className="p-4 flex gap-2 whitespace-nowrap">
                      <Link href={`/admin/ventas-diversas/${p.id}`} className="text-xs text-sage hover:text-sage-dark transition-colors">Editar</Link>
                      <DeleteButton id={p.id} type="partnerProduct" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/ventas-diversas" query={q} />
        </div>
      )}
    </>
  );
}
