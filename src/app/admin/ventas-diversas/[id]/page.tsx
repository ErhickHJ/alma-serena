import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PartnerProductForm } from "@/app/admin/save";

export const metadata = { title: "Editar producto partner — Admin | Alma Serena" };

export default async function EditarPartnerProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product = await prisma.partnerProduct.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Editar producto de partner</h1>
      <PartnerProductForm product={product as any} />
    </>
  );
}
