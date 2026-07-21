export default function BlogLoading() {
  return (
    <div className="animate-pulse py-16 sm:py-24 max-w-4xl mx-auto px-4">
      <div className="h-8 w-32 bg-sage/10 rounded-lg mx-auto mb-4" />
      <div className="h-4 w-64 bg-sage/10 rounded mx-auto mb-8" />
      <div className="h-10 w-full max-w-md bg-sage/10 rounded-lg mx-auto mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-warm-white rounded-xl border border-sage/10 overflow-hidden">
            <div className="h-48 bg-sage/10" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-24 bg-sage/10 rounded" />
              <div className="h-5 w-3/4 bg-sage/10 rounded" />
              <div className="h-3 w-full bg-sage/10 rounded" />
              <div className="h-3 w-2/3 bg-sage/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
