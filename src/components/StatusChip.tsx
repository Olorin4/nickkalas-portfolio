import type { StatusKind } from "@/content/site";

const kindClasses: Record<StatusKind, string> = {
  ok: "text-status-ok border-status-ok/35 bg-status-ok/10",
  warn: "text-amber-500 border-amber-500/35 bg-amber-500/10",
  info: "text-status-info border-status-info/35 bg-status-info/10",
  muted: "text-ink-400 border-ink-400/30 bg-ink-400/10",
};

export function StatusChip({
  label,
  kind,
}: {
  label: string;
  kind: StatusKind;
}) {
  return (
    <span
      className={`inline-block rounded-[5px] border px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-wider whitespace-nowrap ${kindClasses[kind]}`}
    >
      {label}
    </span>
  );
}
