"use client";

import dynamic from "next/dynamic";

const LiveMetrics = dynamic(() => import("@/components/LiveMetrics"), {
  ssr: false,
  loading: () => <p className="text-xs text-charcoal/40">Cargando métricas...</p>,
});

export default function LiveMetricsDynamic() {
  return <LiveMetrics />;
}
