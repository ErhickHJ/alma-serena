"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ item, label = "Añadir al carrito" }: { item: Product; label?: string }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          emoji: item.emoji,
        })
      }
      className="w-full px-4 py-2 bg-sage text-white rounded-full text-xs font-medium hover:bg-sage-dark transition-colors"
    >
      {label}
    </button>
  );
}
