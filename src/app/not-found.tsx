import Link from "next/link";
import DecorativeDivider from "@/components/DecorativeDivider";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24 min-h-[60vh] flex items-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl text-sage/20 mb-2 font-serif">✿</div>
        <p className="font-serif text-[6rem] sm:text-[8rem] text-sage/10 leading-none mb-2">404</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-4">Página no encontrada</h1>
        <DecorativeDivider className="my-6" />
        <p className="text-charcoal/50 leading-relaxed mb-8">
          Tal vez esta página se perdió en el camino, como a veces nos perdemos nosotros.<br/>
          Respira hondo. Siempre puedes volver a empezar.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="px-6 py-3 bg-sage text-white rounded-full text-sm font-medium hover:bg-sage-dark transition-colors shadow-sm">
            Volver al inicio
          </Link>
          <Link href="/tienda" className="px-6 py-3 border border-sage/30 text-sage-dark rounded-full text-sm font-medium hover:bg-sage/5 transition-colors">
            Explorar tienda
          </Link>
        </div>
        <div className="mt-10 flex justify-center gap-6 text-xs text-charcoal/30">
          <Link href="/blog" className="hover:text-sage-dark transition-colors">Blog</Link>
          <Link href="/comunidad" className="hover:text-sage-dark transition-colors">Comunidad</Link>
          <Link href="/contacto" className="hover:text-sage-dark transition-colors">Contacto</Link>
        </div>
      </div>
    </section>
  );
}
