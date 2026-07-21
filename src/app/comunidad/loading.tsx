export default function ComunidadLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-4xl mx-auto px-4">
      <div className="h-48 bg-sage/5 rounded-2xl mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-warm-white rounded-xl border border-sage/10 p-5 space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-sage/10 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-32 bg-sage/10 rounded" />
                <div className="h-3 w-full bg-sage/10 rounded" />
                <div className="h-3 w-3/4 bg-sage/10 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
