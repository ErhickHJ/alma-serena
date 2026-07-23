"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/SectionTitle";
import DecorativeDivider from "@/components/DecorativeDivider";
import { useLang } from "@/context/LangContext";
import { translations } from "@/lib/translations";

export default function CarritoContent() {
  const { lang } = useLang();
  const t = translations[lang].carrito;
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const router = useRouter();

// ============ CARRITO VACÍO ============
  if (items.length === 0) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="text-5xl mb-4 text-sage/40">🛒</div>
          <SectionTitle>{t.emptyTitle}</SectionTitle>
          <DecorativeDivider className="my-6" />
          <p className="text-charcoal/60 leading-relaxed mb-8">
            {t.emptyDesc}
          </p>
          <a
            href="/tienda"
            className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors"
          >
            {t.goToShop}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionTitle>{t.title}</SectionTitle>
            <p className="text-sm text-charcoal/50 mt-1">{totalItems} {t.products}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-charcoal/40 hover:text-rose transition-colors"
          >
            {t.clearCart}
          </button>
        </div>
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-warm-white border border-sage/10"
            >
              <div className="text-3xl w-10 text-center">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-sage-dark truncate">{item.name}</h3>
                <p className="text-sm text-gold font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (item.quantity <= 1) {
                      removeItem(item.id);
                    } else {
                      updateQuantity(item.id, item.quantity - 1);
                    }
                  }}
                  aria-label={t.reduce}
                  className="w-7 h-7 rounded-full border border-sage/20 text-charcoal/50 hover:border-sage/40 transition-colors text-sm"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-medium text-charcoal">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={t.increase}
                  className="w-7 h-7 rounded-full border border-sage/20 text-charcoal/50 hover:border-sage/40 transition-colors text-sm"
                >
                  +
                </button>
              </div>
              <div className="text-sm font-medium text-charcoal w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                aria-label={t.remove}
                className="text-charcoal/30 hover:text-rose transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-cream/50 border border-sage/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-charcoal/60">{t.subtotal}</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2 text-sm text-charcoal/50">
            <span>{t.shipping}</span>
            <span>{t.shippingNote}</span>
          </div>
          <DecorativeDivider className="my-4" />
          <div className="flex items-center justify-between text-lg">
            <span className="font-medium text-charcoal">{t.total}</span>
            <span className="font-serif text-sage-dark text-xl">${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={() => router.push("/checkout")} className="w-full mt-6 px-6 py-3.5 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">
            {t.payBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
