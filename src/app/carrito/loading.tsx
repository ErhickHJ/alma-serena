export default function CartLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-3xl mx-auto px-4">
      <div className="h-8 w-32 bg-sage/10 rounded-lg mx-auto mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-warm-white rounded-xl border border-sage/10 p-4 flex gap-4">
            <div className="w-20 h-20 bg-sage/10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-sage/10 rounded" />
              <div className="h-3 w-1/4 bg-sage/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
