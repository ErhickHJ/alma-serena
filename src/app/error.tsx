"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="py-24 text-center">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-7xl text-sage/20 mb-4 font-serif">✿</div>
        <h1 className="font-serif text-4xl text-sage-dark mb-4">Algo salió mal</h1>
        <p className="text-charcoal/50 mb-4">Ocurrió un error inesperado. Intenta de nuevo.</p>
        <p className="text-xs text-charcoal/30 mb-8 font-mono">{error.message}</p>
        <button onClick={reset} className="px-6 py-3 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">Intentar de nuevo</button>
      </div>
    </section>
  );
}
