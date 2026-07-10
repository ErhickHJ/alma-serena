export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="h-9 w-48 bg-sage/10 rounded-lg" />
        <div className="h-4 w-20 bg-sage/10 rounded" />
      </div>
      <div className="h-10 w-72 bg-sage/10 rounded-lg" />
      <div className="bg-warm-white rounded-xl border border-sage/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sage/10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <th key={i} className="p-4"><div className="h-3 w-16 bg-sage/10 rounded" /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, r) => (
                <tr key={r} className="border-b border-sage/5">
                  {Array.from({ length: 5 }).map((_, c) => (
                    <td key={c} className="p-4"><div className="h-4 bg-sage/10 rounded" style={{ width: `${60 + Math.random() * 30}%` }} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
