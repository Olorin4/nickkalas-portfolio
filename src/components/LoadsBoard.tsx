import { ConsolePanel } from "@/components/ConsolePanel";
import { StatusChip } from "@/components/StatusChip";
import { loadRows } from "@/content/site";

export function LoadsBoard() {
  return (
    <ConsolePanel title="Loads board" meta={`${loadRows.length} active`}>
      <div className="grid grid-cols-[70px_1fr_auto] gap-x-2.5 border-b border-ink-400/10 px-3 py-1.5 font-mono text-[9.5px] tracking-wider text-ink-500 uppercase">
        <span>Load</span>
        <span>Lane</span>
        <span>Status</span>
      </div>
      <ul>
        {loadRows.map((row) => (
          <li
            key={row.id}
            className="grid grid-cols-[70px_1fr_auto] items-center gap-x-2.5 border-b border-ink-400/5 px-3 py-2 last:border-b-0"
          >
            <span className="font-mono text-xs text-amber-500">{row.id}</span>
            <span className="truncate text-xs text-ink-300">{row.lane}</span>
            <StatusChip label={row.status} kind={row.kind} />
          </li>
        ))}
      </ul>
    </ConsolePanel>
  );
}
