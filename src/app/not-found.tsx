import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-7xl text-sage/20 mb-4 font-serif">✿</div>
        <h1 className="font-serif text-4xl text-sage-dark mb-4">Página no encontrada</h1>
        <p className="text-charcoal/50 mb-8">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage-dark transition-colors">Volver al inicio</Link>
      </div>
    </section>
  );
}
