import LiveMetrics from "@/components/LiveMetrics";

export const metadata = { title: "Estadísticas" };

export default function AdminStatsPage() {
  return (
    <>
      <h1 className="font-serif text-3xl sm:text-4xl text-sage-dark mb-8">Estadísticas</h1>
      <LiveMetrics />
    </>
  );
}
