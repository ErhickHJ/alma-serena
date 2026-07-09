import Link from "next/link";

export function Pagination({ page, totalPages, basePath, query }: { page: number; totalPages: number; basePath: string; query?: string }) {
  if (totalPages <= 1) return null;

  const qs = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    if (query) params.set("q", query);
    return params.toString();
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {page > 1 && (
        <Link href={`${basePath}?${qs(page - 1)}`} className="px-3 py-1.5 text-sm rounded-lg border border-sage/20 text-charcoal/60 hover:text-sage-dark hover:border-sage/40 transition-colors">
          ← Anterior
        </Link>
      )}
      <span className="text-sm text-charcoal/40">
        {page} / {totalPages}
      </span>
      {page < totalPages && (
        <Link href={`${basePath}?${qs(page + 1)}`} className="px-3 py-1.5 text-sm rounded-lg border border-sage/20 text-charcoal/60 hover:text-sage-dark hover:border-sage/40 transition-colors">
          Siguiente →
        </Link>
      )}
    </div>
  );
}
