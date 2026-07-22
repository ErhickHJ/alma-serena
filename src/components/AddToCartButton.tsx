// Botón "Añadir al carrito" — agrega item al contexto CartContext
"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function AddToCartButton({ item, label = "Añadir al carrito" }: { item: { id: string; name: string; price: number; emoji: string; type?: "store" | "partner"; partnerName?: string; partnerContact?: string; commission?: number }; label?: string }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <button
      onClick={() => {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          emoji: item.emoji,
          type: item.type,
          partnerName: item.partnerName,
          partnerContact: item.partnerContact,
          commission: item.commission,
        });
        showToast(`${item.emoji || ""} ${item.name} añadido al carrito`);
      }}
      className="w-full px-4 py-2 bg-sage text-white rounded-full text-xs font-medium hover:bg-sage-dark transition-colors"
    >
      {label}
    </button>
  );
}
