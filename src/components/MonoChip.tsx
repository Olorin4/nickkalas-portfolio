export function MonoChip({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  const variant = accent
    ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
    : "border-ink-400/15 bg-ink-400/5 text-ink-400";
  return (
    <span
      className={`inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] ${variant}`}
    >
      {children}
    </span>
  );
}
