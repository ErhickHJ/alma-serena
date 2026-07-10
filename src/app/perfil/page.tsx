import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import DecorativeDivider from "@/components/DecorativeDivider";
import { ReferralSection } from "./ReferralSection";

export const metadata = { title: "Mi perfil" };

export default async function PerfilPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const orders = await prisma.order.findMany({
    where: { clerkUserId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-2">Mi perfil</h1>
        <p className="text-charcoal/50 text-sm mb-10">Tus pedidos y actividad</p>
        <DecorativeDivider className="mb-10" />

        <h2 className="font-serif text-xl text-sage-dark mb-4">Mis pedidos</h2>
        {orders.length === 0 ? (
          <p className="text-charcoal/40 text-sm">Todavía no has realizado ningún pedido.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal">${(o.amount / 100).toFixed(2)}</p>
                  <p className="text-xs text-charcoal/40">{new Date(o.createdAt).toLocaleDateString("es")}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {o.status === "completed" ? "Completado" : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-sage/10">
          <ReferralSection />
        </div>

        <div className="mt-8 pt-8 border-t border-sage/10">
          <Link href="/" className="text-sm text-sage hover:text-sage-dark transition-colors">← Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
}
