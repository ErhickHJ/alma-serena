"use client";

import { useUser } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";

export function AdminLink({ className }: { className?: string }) {
  const { user } = useUser();
  const metadata = user?.publicMetadata as { role?: string } | undefined;

  if (!isAdmin(metadata)) return null;

  return (
    <a href="/admin/estadisticas" className={className}>
      Admin
    </a>
  );
}
