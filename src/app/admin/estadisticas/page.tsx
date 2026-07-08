import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Estadísticas — Admin | Alma Serena",
};

export default async function AdminEstadisticasPage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

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

  let totalUsers = 0;
  let contactCount = 0;
  let partnerCount = 0;
  let orderCount = 0;
  let subscriberCount = 0;
  let recentContacts: { name: string; email: string; subject: string; message: string; createdAt: Date }[] = [];
  let recentOrders: { name: string; email: string; amount: number; status: string; createdAt: Date }[] = [];

  try {
    const client = await clerkClient();
    totalUsers = await client.users.getCount();
  } catch {}

  try {
    [contactCount, partnerCount, orderCount, subscriberCount, recentContacts, recentOrders] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.partnerRequest.count(),
      prisma.order.count(),
      prisma.subscriber.count(),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);
  } catch {}

  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Estadísticas y métricas</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        <StatCard label="Usuarios" value={totalUsers.toLocaleString()} icon={<UsersIcon />} />
        <StatCard label="Suscriptores" value={subscriberCount.toLocaleString()} icon={<MailIcon />} />
        <StatCard label="Mensajes" value={contactCount.toLocaleString()} icon={<ChatIcon />} />
        <StatCard label="Partners" value={partnerCount.toLocaleString()} icon={<PartnerIcon />} />
        <StatCard label="Pedidos" value={orderCount.toLocaleString()} icon={<PackageIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-6">
          <h2 className="font-serif text-lg text-sage-dark mb-4">Últimos mensajes de contacto</h2>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-charcoal/40">Sin mensajes aún</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={`${c.email}-${c.createdAt}`} className="text-sm border-b border-sage/5 pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-charcoal">{c.name}</span>
                    <span className="text-xs text-charcoal/40">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="text-charcoal/50 text-xs">{c.email}</span>
                  <p className="text-charcoal/60 text-xs mt-1 line-clamp-2">{c.subject} — {c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-6">
          <h2 className="font-serif text-lg text-sage-dark mb-4">Últimos pedidos</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-charcoal/40">Sin pedidos aún</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={`${o.email}-${o.createdAt}`} className="text-sm border-b border-sage/5 pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium text-charcoal">{o.name}</span>
                    <span className="text-xs text-charcoal/40">${(o.amount / 100).toFixed(2)}</span>
                  </div>
                  <span className="text-charcoal/50 text-xs">{o.email}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${o.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{o.status}</span>
                    <span className="text-xs text-charcoal/40">{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-5 text-center">
      <div className="w-7 h-7 mx-auto mb-2 text-sage-dark/60">{icon}</div>
      <div className="text-2xl font-serif text-sage-dark mb-0.5">{value}</div>
      <div className="text-[10px] text-charcoal/50 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function UsersIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>); }
function MailIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>); }
function ChatIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>); }
function PartnerIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>); }
function PackageIcon() { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>); }
