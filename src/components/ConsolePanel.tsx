export function ConsolePanel({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-400/15 bg-steel-900 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-1.5 border-b border-ink-400/10 bg-steel-800 px-3 py-2">
        <span aria-hidden className="size-1.5 rounded-full bg-ink-400/30" />
        <span aria-hidden className="size-1.5 rounded-full bg-ink-400/30" />
        <span className="ml-1.5 font-mono text-[10.5px] tracking-widest text-ink-400 uppercase">
          {title}
        </span>
        {meta ? (
          <span className="ml-auto font-mono text-[10px] text-amber-500">
            {meta}
          </span>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
