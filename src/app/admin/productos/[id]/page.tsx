// Admin — Formulario para editar un producto existente
// Carga el producto por ID desde la DB, muestra 404 si no existe
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "../save";

export const metadata = { title: "Editar producto" };

export default async function EditarProductoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Editar producto</h1>
      <ProductForm product={product} />
    </>
  );
}
