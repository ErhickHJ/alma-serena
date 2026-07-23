"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function CheckoutContent() {
  const { lang } = useLang();
  const t = translations[lang].checkout;
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      clearCart();
      setDone(true);
    }
  }, [clearCart]);

  useEffect(() => {
    if (items.length === 0 && !done) router.push("/carrito");
  }, [items, done, router]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      body: JSON.stringify({
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          type: i.type,
          partnerName: i.partnerName,
          partnerContact: i.partnerContact,
          commission: i.commission,
        })),
        clerkUserId: user?.id,
        successUrl: `${window.location.origin}/checkout?success=true`,
        cancelUrl: `${window.location.origin}/checkout?cancelled=true`,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.url) {
      window.location.href = json.url;
    }
  };

  if (done) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="text-5xl mb-4 text-sage">✓</div>
          <SectionTitle>{t.successTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">
            {t.successDesc}
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm"
          >
            {t.backHome}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle>{t.title}</SectionTitle>
        <DecorativeDivider className="my-6" />
        <form ref={formRef} onSubmit={handlePay}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-4">
              <h2 className="font-serif text-xl text-sage-dark">{t.shippingTitle}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-charcoal/60 mb-1">{t.name} *</label>
                  <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-charcoal/60 mb-1">{t.address} *</label>
                  <input name="address" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">{t.city} *</label>
                  <input name="city" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">{t.postalCode}</label>
                  <input name="zip" className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-charcoal/60 mb-1">{t.phone} *</label>
                  <input name="phone" required className="w-full px-4 py-2.5 rounded-lg border border-sage/20 bg-warm-white text-sm focus:outline-none focus:border-sage transition-colors" />
                </div>
              </div>

              <h2 className="font-serif text-xl text-sage-dark pt-4">{t.paymentTitle}</h2>
              <div className="p-4 rounded-lg border border-sage/10 bg-warm-white text-center">
                <p className="text-sm text-charcoal/60">
                  {t.stripeNote}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl bg-cream/50 border border-sage/10 p-6 sticky top-24">
                <h3 className="font-serif text-lg text-sage-dark mb-4">{t.summary}</h3>
                <div className="space-y-3 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-charcoal/60 truncate mr-2">{item.name} × {item.quantity}</span>
                      <span className="text-charcoal font-medium shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <DecorativeDivider className="my-4" />
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">{t.subtotal}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal/50 mt-1">
                  <span>{t.shipping}</span>
                  <span>{t.free}</span>
                </div>
                <DecorativeDivider className="my-4" />
                <div className="flex justify-between text-lg">
                  <span className="font-medium text-charcoal">{t.total}</span>
                  <span className="font-serif text-sage-dark text-xl">${totalPrice.toFixed(2)}</span>
                </div>
                <label className="flex items-start gap-2 mt-4 cursor-pointer">
                  <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 shrink-0 accent-sage" />
                  <span className="text-[11px] text-charcoal/50 leading-relaxed">
                    {t.terms}
                  </span>
                </label>
                <button type="submit" disabled={sending || !accepted} className="w-full mt-4 px-6 py-3.5 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm disabled:opacity-50">
                  {sending ? t.redirecting : t.payBtn}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
