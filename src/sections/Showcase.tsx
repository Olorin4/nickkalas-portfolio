import { ConsolePanel } from "@/components/ConsolePanel";
import { LoadsBoard } from "@/components/LoadsBoard";
import { OcrVideo } from "@/components/OcrVideo";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  demo,
  features,
  ocrDemo,
  screenshots as defaultScreenshots,
  type Screenshot,
} from "@/content/site";

export function Showcase({
  screenshotList = defaultScreenshots,
}: {
  screenshotList?: Screenshot[];
}) {
  const demoHref = demo.live ? demo.url : demo.fallbackHref;
  const demoLabel = demo.live ? "Launch demo" : "Demo — launching soon";

  return (
    <section id="kelevo" className="border-t border-ink-400/10 bg-steel-900/40">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionEyebrow>Featured system</SectionEyebrow>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-500 uppercase">
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${demo.live ? "bg-status-ok" : "bg-amber-500"}`}
            />
            {demo.live ? "live · lite.kelevo.ai" : "demo launching soon"}
          </span>
        </div>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-100">
          Kel<span className="text-amber-500">é</span>vo
          <span className="ml-3 text-base font-semibold text-ink-500">
            Transportation Management System — SaaS
          </span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">
          Dispatching, fleet &amp; asset management, OCR document intake, and
          settlements — the ops backbone for small and mid-size trucking
          companies. Built solo, zero to launch.
        </p>

        <div className="mt-8">
          <LoadsBoard />
        </div>

        <figure className="mt-6">
          <ConsolePanel title={ocrDemo.title} meta="AI / OCR">
            <OcrVideo src={ocrDemo.src} label={ocrDemo.caption} />
          </ConsolePanel>
          <figcaption className="mt-2 text-xs leading-relaxed text-ink-500">
            {ocrDemo.caption}
          </figcaption>
        </figure>

        {screenshotList.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {screenshotList.map((shot) => (
              <ConsolePanel key={shot.src} title={shot.title}>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimized by design */}
                <img src={shot.src} alt={shot.alt} className="block w-full" />
              </ConsolePanel>
            ))}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-ink-400/15 bg-steel-900 p-4"
            >
              <h3 className="text-sm font-bold text-ink-100">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={demoHref}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 px-5 py-3 text-sm font-bold text-steel-950 transition hover:brightness-110"
          >
            {demoLabel} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
