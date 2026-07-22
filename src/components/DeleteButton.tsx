"use client";

import { useState } from "react";

export function DeleteButton({ id, type }: { id: string; type: "order" | "contact" | "subscriber" | "post" | "product" | "partnerProduct" }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/delete?type=${type}&id=${id}`, { method: "DELETE" });
      if (res.ok) window.location.reload();
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="text-rose hover:text-red-700 text-xs transition-colors">
        Eliminar
      </button>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-warm-white rounded-xl shadow-xl p-6 max-w-sm mx-4 border border-sage/10">
            <p className="text-charcoal text-sm mb-4">¿Eliminar este elemento? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm text-charcoal/50 border border-sage/20 rounded-lg hover:bg-sage/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-white bg-rose rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
