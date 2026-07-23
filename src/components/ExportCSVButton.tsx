"use client";

export default function ExportCSVButton({ data, filename }: { data: Record<string, unknown>[]; filename: string }) {
  function handleExport() {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={handleExport} className="px-4 py-2 text-xs text-sage border border-sage/20 rounded-lg hover:bg-sage/5 transition-colors">
      Exportar CSV
    </button>
  );
}
