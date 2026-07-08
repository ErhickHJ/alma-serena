import { PostForm } from "../save";

export const metadata = { title: "Nuevo artículo — Admin | Alma Serena" };

export default function NuevoArticuloPage() {
  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Nuevo artículo</h1>
      <PostForm />
    </>
  );
}
