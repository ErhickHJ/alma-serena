"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ item, label = "Comprar ahora" }: { item: { id: string; name: string; price: number; emoji: string }; label?: string }) {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        addItem({ id: item.id, name: item.name, price: item.price, quantity: 1, emoji: item.emoji });
        router.push("/carrito");
      }}
      className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-sage text-white rounded-full font-medium text-sm tracking-wide hover:bg-sage-dark transition-colors shadow-sm"
    >
      {label}
    </button>
  );
}
