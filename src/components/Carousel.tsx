"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "@/lib/products";

export default function Carousel({ items }: { items: Product[] }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative">
      <div className="relative h-[340px] sm:h-[380px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <div className="relative w-full max-w-xs h-40 mb-4 rounded-lg overflow-hidden bg-sage/5">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-lg text-sage-dark mb-1">{item.name}</h3>
            <p className="text-sm text-gold font-medium mb-3">${item.price.toFixed(2)}</p>
            <div className="w-full max-w-[200px]"><AddToCartButton item={item} /></div>
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-white/80 border border-sage/20 flex items-center justify-center text-charcoal/60 hover:bg-warm-white hover:text-charcoal transition-all text-sm shadow-sm"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-white/80 border border-sage/20 flex items-center justify-center text-charcoal/60 hover:bg-warm-white hover:text-charcoal transition-all text-sm shadow-sm"
      >
        ›
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === current ? "bg-sage w-4" : "bg-sage/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
