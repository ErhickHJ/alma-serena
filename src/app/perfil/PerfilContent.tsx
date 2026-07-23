"use client";

import Link from "next/link";
import DecorativeDivider from "@/components/DecorativeDivider";
import { ReferralSection } from "./ReferralSection";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

type Order = {
  id: string;
  product: string;
  amount: number;
  status: string;
  createdAt: Date | string;
};

export default function PerfilContent({ orders }: { orders: Order[] }) {
  const { lang } = useLang();
  const t = translations[lang].perfil;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-2">{t.title}</h1>
        <p className="text-charcoal/50 text-sm mb-10">{t.subtitle}</p>
        <DecorativeDivider className="mb-10" />

        <h2 className="font-serif text-xl text-sage-dark mb-4">{t.ordersTitle}</h2>
        {orders.length === 0 ? (
          <p className="text-charcoal/40 text-sm">{t.noOrders}</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <Link key={o.id} href={`/perfil/pedidos/${o.id}`} className="block bg-warm-white rounded-xl border border-sage/10 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-medium text-charcoal">{o.product}</p>
                  <p className="text-xs text-charcoal/50">${(o.amount / 100).toFixed(2)} · {new Date(o.createdAt).toLocaleDateString("es")}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {o.status === "completed" ? t.completed : t.pending}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-sage/10">
          <ReferralSection />
        </div>

        <div className="mt-8 pt-8 border-t border-sage/10">
          <Link href="/" className="text-sm text-sage hover:text-sage-dark transition-colors">← {t.backHome}</Link>
        </div>
      </div>
    </section>
  );
}
