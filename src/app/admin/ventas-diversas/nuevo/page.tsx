import { PartnerProductForm } from "@/app/admin/save";

export const metadata = { title: "Nuevo producto partner — Admin | Alma Serena" };

export default function NuevoPartnerProductPage() {
  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Nuevo producto de partner</h1>
      <PartnerProductForm />
    </>
  );
}
