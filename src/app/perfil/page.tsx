import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import PerfilContent from "./PerfilContent";

export const metadata = { title: "Mi perfil" };

export default async function PerfilPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const orders = await prisma.order.findMany({
    where: { clerkUserId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return <PerfilContent orders={orders as any} />;
}
