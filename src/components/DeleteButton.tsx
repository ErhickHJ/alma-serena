"use client";

export function DeleteButton({ id, type }: { id: string; type: "order" | "contact" | "subscriber" | "post" }) {
  async function handleDelete() {
    if (!confirm("¿Eliminar este elemento?")) return;
    const res = await fetch(`/api/admin/delete?type=${type}&id=${id}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
  }

  return (
    <button onClick={handleDelete} className="text-rose hover:text-red-700 text-xs transition-colors">
      Eliminar
    </button>
  );
}
