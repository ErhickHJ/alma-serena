// Selector de estado para pedidos (client component)
// Workflow: pending → processing → shipped → delivered, o cancelled en cualquier paso
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export function StatusSelect({ orderId, current }: { orderId: string; current: string }) {
  const [status, setStatus] = useState(current);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setSaving(true);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });
    if (res.ok) {
      setStatus(newStatus);
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={saving}
      className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer font-medium ${COLORS[status] || "bg-gray-100 text-gray-700"} ${saving ? "opacity-50" : ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
