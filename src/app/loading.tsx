// Loading global — Next.js la muestra mientras el server component de la página se resuelve
export default function RootLoading() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-5xl text-sage/20 mb-4 animate-pulse">✿</div>
        <p className="text-charcoal/30 text-sm">Cargando...</p>
      </div>
    </section>
  );
}
