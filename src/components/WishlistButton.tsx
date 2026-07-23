"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ item }: { item: { id: string; name: string; price: number; emoji: string; image: string } }) {
  const { hasItem, addItem, removeItem } = useWishlist();
  const isLiked = hasItem(item.id);

  return (
    <button
      onClick={() => isLiked ? removeItem(item.id) : addItem(item)}
      className={`p-2 rounded-full transition-colors ${isLiked ? "text-red-400 hover:text-red-500" : "text-charcoal/30 hover:text-red-400"}`}
      title={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
