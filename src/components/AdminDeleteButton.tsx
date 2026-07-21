"use client";
import { useUser } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";

export function AdminDeleteButton({ postId, onDeleted }: { postId: string; onDeleted?: () => void }) {
  const { user } = useUser();
  const metadata = user?.publicMetadata as { role?: string } | undefined;

  if (!isAdmin(metadata)) return null;

  return (
    <button
      onClick={async () => {
        if (!confirm("¿Eliminar este mensaje?")) return;
        await fetch("/api/forum/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });
        if (onDeleted) onDeleted();
        else window.location.reload();
      }}
      className="text-xs text-charcoal/20 hover:text-red-400 transition-colors ml-2"
      title="Eliminar mensaje (admin)"
    >
      ✕
    </button>
  );
}
