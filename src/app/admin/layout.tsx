// Layout del panel admin — Verifica auth + rol admin, muestra navegación lateral
// Si no está autenticado → mensaje de login
// Si no es admin → acceso restringido
// Middleware adicional en proxy.ts filtra por IP

import { auth, clerkClient } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session.userId) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-5xl mb-4 text-sage/40">✿</div>
          <h1 className="font-serif text-3xl text-sage-dark mb-4">Inicia sesión</h1>
          <p className="text-charcoal/50">Debes iniciar sesión para acceder al panel de administración.</p>
        </div>
      </section>
    );
  }

  const user = session.userId ? await (await clerkClient()).users.getUser(session.userId) : null;
  const metadata = user?.publicMetadata as { role?: string } | undefined;

  if (!isAdmin(metadata)) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-5xl mb-4 text-sage/40">✿</div>
          <h1 className="font-serif text-3xl text-sage-dark mb-4">Acceso restringido</h1>
          <p className="text-charcoal/50">Esta sección solo está disponible para administradores.</p>
        </div>
      </section>
    );
  }

  const links = [
    { href: "/admin/estadisticas", label: "Estadísticas" },
    { href: "/admin/pedidos", label: "Pedidos" },
    { href: "/admin/productos", label: "Productos" },
    { href: "/admin/ventas-diversas", label: "Ventas Diversas" },
    { href: "/admin/contactos", label: "Contactos" },
    { href: "/admin/suscriptores", label: "Suscriptores" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/log", label: "Actividad" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-sage/5 to-warm-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gold/60 text-xs tracking-widest uppercase mb-2 font-medium">Admin</p>
        <nav className="flex flex-wrap gap-1 mb-10 border-b border-sage/10 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-charcoal/50 hover:text-sage-dark hover:bg-sage/5 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </section>
  );
}
