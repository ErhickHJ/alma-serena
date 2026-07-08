import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PostForm } from "../save";

export const metadata = { title: "Editar artículo — Admin | Alma Serena" };

export default async function EditarArticuloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Editar artículo</h1>
      <PostForm post={post} />
    </>
  );
}
