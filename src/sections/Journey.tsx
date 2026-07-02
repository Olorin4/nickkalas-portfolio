import { SectionEyebrow } from "@/components/SectionEyebrow";
import { timeline } from "@/content/site";

export function Journey() {
  return (
    <section id="journey" className="border-t border-ink-400/10">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <SectionEyebrow>Route log</SectionEyebrow>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-100">
          An unusual route to engineering
        </h2>

        <ol className="mt-8 space-y-0">
          {timeline.map((stop, index) => (
            <li
              key={stop.org}
              className="relative border-l border-ink-400/15 pb-8 pl-6 last:pb-0"
            >
              <span
                aria-hidden
                className={`absolute top-1 -left-[5px] size-2.5 rounded-full ${
                  index === timeline.length - 1
                    ? "bg-amber-500"
                    : "bg-ink-400/40"
                }`}
              />
              <p className="font-mono text-[10.5px] tracking-[0.15em] text-ink-500 uppercase">
                {stop.period}
              </p>
              <h3 className="mt-1 text-base font-bold text-ink-100">
                {stop.role}
              </h3>
              <p className="font-mono text-xs text-amber-500">{stop.org}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-400">
                {stop.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
