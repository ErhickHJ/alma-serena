"use client";
export default function CheckoutError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-24 text-center max-w-md mx-auto px-4">
      <div className="text-4xl mb-4">⚠️</div>
      <h1 className="font-serif text-xl text-sage-dark mb-2">Error en el pago</h1>
      <p className="text-sm text-charcoal/50 mb-6">Ocurrió un error al procesar tu compra. Intenta de nuevo.</p>
      <button onClick={reset} className="px-6 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">
        Intentar de nuevo
      </button>
    </div>
  );
}
