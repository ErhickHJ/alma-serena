// Botón "Añadir al carrito" — agrega item al contexto CartContext
"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ item, label = "Añadir al carrito" }: { item: { id: string; name: string; price: number; emoji: string }; label?: string }) {
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
