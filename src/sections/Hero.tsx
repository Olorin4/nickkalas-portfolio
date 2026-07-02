import { MetricCard } from "@/components/MetricCard";
import { MonoChip } from "@/components/MonoChip";
import {
  demo as defaultDemo,
  heroChips,
  identity,
  metrics,
  type DemoState,
} from "@/content/site";

export function Hero({ demoState = defaultDemo }: { demoState?: DemoState }) {
  const demoHref = demoState.live ? demoState.url : demoState.fallbackHref;
  const demoLabel = demoState.live ? "View live demo" : "Demo — launching soon";

  return (
    <header className="relative overflow-hidden">
      <div aria-hidden className="bg-blueprint absolute inset-0" />
      <div aria-hidden className="bg-navy-wash absolute inset-0" />
      <div aria-hidden className="bg-hero-glow absolute inset-0" />

      <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-12 sm:px-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-status-ok/30 bg-status-ok/10 px-3 py-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-status-ok" />
          <span className="font-mono text-[10px] tracking-[0.12em] text-status-ok uppercase">
            Open to work — founding engineer
          </span>
        </span>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tighter text-ink-100 sm:text-5xl">
          {identity.name}
        </h1>

        <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-ink-500 uppercase">
          {identity.role} · {identity.location}
        </p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-400 sm:text-base">
          {identity.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={demoHref}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 px-5 py-3 text-sm font-bold text-steel-950 transition hover:brightness-110"
          >
            {demoLabel} <span aria-hidden>→</span>
          </a>
          <a
            href="#case-study"
            className="inline-flex items-center rounded-lg border border-ink-400/20 bg-ink-400/5 px-5 py-3 text-sm font-semibold text-ink-300 transition hover:border-ink-400/40"
          >
            Read the case study
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {metrics.map((metric) => (
            <MetricCard key={metric.value} metric={metric} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {heroChips.map((chip) => (
            <MonoChip key={chip} accent={chip === "AI/OCR pipeline"}>
              {chip}
            </MonoChip>
          ))}
        </div>
      </div>
    </header>
  );
}
