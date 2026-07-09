// Admin — CRUD de productos
// Lista paginada con enlace a formulario de edición/creación

import { prisma } from "@/lib/db";
import Link from "next/link";
import { DeleteButton } from "@/components/DeleteButton";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 20;

export default async function AdminProductosPage(props: { searchParams?: Promise<{ page?: string }> }) {
  const { page: pageStr } = await (props.searchParams ?? Promise.resolve({ page: "1" }));
  const page = Math.max(1, Number(pageStr) || 1);
  const [products, total] = await Promise.all([
    prisma.product.findMany({ orderBy: { category: "asc" }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.product.count(),
  ]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark">Productos</h1>
        <Link href="/admin/productos/nuevo" className="px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">+ Nuevo producto</Link>
      </div>
      {products.length === 0 ? (
        <p className="text-charcoal/40 text-sm">No hay productos aún.</p>
      ) : (
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10 text-left text-charcoal/50 text-xs uppercase tracking-wider">
                <th className="p-4">Nombre</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Destacado</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-sage/5 hover:bg-sage/5 transition-colors">
                  <td className="p-4 font-medium text-charcoal">{p.emoji} {p.name}</td>
                  <td className="p-4 text-charcoal/50">{p.category}</td>
                  <td className="p-4 text-charcoal">${p.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.featured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{p.featured ? "Sí" : "No"}</span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/admin/productos/${p.id}`} className="text-xs text-sage hover:text-sage-dark transition-colors">Editar</Link>
                    <DeleteButton id={p.id} type="product" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} basePath="/admin/productos" />
        </div>
      )}
    </>
  );
}
