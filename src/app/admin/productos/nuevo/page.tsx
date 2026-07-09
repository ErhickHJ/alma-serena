import { ProductForm } from "../save";

export const metadata = { title: "Nuevo producto" };

export default function NuevoProductoPage() {
  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Nuevo producto</h1>
      <ProductForm />
    </>
  );
}
