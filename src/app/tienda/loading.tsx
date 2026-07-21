export default function StoreLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-6xl mx-auto px-4">
      <div className="h-8 w-40 bg-sage/10 rounded-lg mx-auto mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-warm-white rounded-xl border border-sage/10 overflow-hidden">
            <div className="h-48 bg-sage/10" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-sage/10 rounded" />
              <div className="h-3 w-1/3 bg-sage/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
