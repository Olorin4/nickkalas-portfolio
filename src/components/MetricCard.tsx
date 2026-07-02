import type { Metric } from "@/content/site";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="flex-1 rounded-xl border border-ink-400/15 bg-linear-to-b from-ink-400/10 to-ink-400/3 p-3">
      <div className="font-mono text-xl font-bold tracking-tight text-amber-500">
        {metric.value}
      </div>
      <div className="mt-1 text-[11px] leading-snug text-ink-500">
        {metric.label}
      </div>
    </div>
  );
}
