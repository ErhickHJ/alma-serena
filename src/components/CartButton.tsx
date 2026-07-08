"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center text-charcoal/70 hover:text-sage-dark transition-colors"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
