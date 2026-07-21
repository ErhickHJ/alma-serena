export default function PerfilLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-3xl mx-auto px-4">
      <div className="h-8 w-32 bg-sage/10 rounded-lg mx-auto mb-8" />
      <div className="bg-warm-white rounded-xl border border-sage/10 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-sage/10 rounded-full" />
          <div className="space-y-2">
            <div className="h-5 w-40 bg-sage/10 rounded" />
            <div className="h-3 w-56 bg-sage/10 rounded" />
          </div>
        </div>
        <div className="h-32 bg-sage/5 rounded-lg" />
      </div>
    </div>
  );
}
