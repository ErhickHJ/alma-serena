export default function RootLoading() {
  return (
    <div className="animate-pulse space-y-12 py-24 max-w-6xl mx-auto px-4">
      <div className="space-y-4">
        <div className="h-10 w-72 bg-sage/10 rounded-lg mx-auto" />
        <div className="h-4 w-96 bg-sage/10 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-warm-white rounded-xl border border-sage/10 shadow-sm p-6 space-y-3">
            <div className="h-40 bg-sage/10 rounded-lg" />
            <div className="h-4 w-3/4 bg-sage/10 rounded" />
            <div className="h-3 w-1/2 bg-sage/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
