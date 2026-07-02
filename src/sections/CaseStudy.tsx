import { ConsolePanel } from "@/components/ConsolePanel";
import { MonoChip } from "@/components/MonoChip";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const architecture = [
  {
    layer: "Clients",
    parts: ["Web app (React)", "Pro app (React)", "Mobile (planned)"],
  },
  {
    layer: "API",
    parts: ["Node.js / Express", "Zod-validated routes", "Plan+role gating"],
  },
  {
    layer: "Domain core",
    parts: [
      "Shared TS domain package",
      "Lifecycle state machines",
      "Org-scoped services",
    ],
  },
  {
    layer: "Data & integrations",
    parts: [
      "PostgreSQL + Prisma",
      "Cloudflare R2 documents",
      "Stripe billing",
      "AI/OCR intake",
    ],
  },
  {
    layer: "Infra",
    parts: ["Docker", "GitHub Actions CI/CD", "nginx edge", "VPS + EC2"],
  },
];

const decisions = [
  {
    title: "A shared domain vocabulary",
    body: "One TypeScript domain package owns enums, types and DTOs across backend and frontends — with CI drift-guards so the database schema, API and UI can never silently disagree.",
  },
  {
    title: "Explicit lifecycle state machines",
    body: "Loads, trucks and trailers move through authoritative transition tables, not scattered if-statements. Invalid transitions are unrepresentable, and the docs mirror the code.",
  },
  {
    title: "Multi-tenancy at the service layer",
    body: "Every query is org-scoped at the service boundary — tenant isolation is a structural guarantee, not a convention reviewers must catch.",
  },
  {
    title: "Document-heavy by design",
    body: "Freight runs on PDFs. Rate confirmations flow in via email + OCR into structured loads; settlements flow out as branded, immutable PDF statements.",
  },
];

const outcomes = [
  "A commercial, multi-tenant TMS SaaS taken from zero to launch by one person.",
  "A strictly-typed monorepo with a single consolidated CI gate: format, lint, typecheck, tests, typing-drift guards.",
  "Real operational workflows — dispatch, fleet, documents, settlements, billing — not a demo app.",
];

export function CaseStudy() {
  return (
    <section id="case-study" className="border-t border-ink-400/10">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <SectionEyebrow>Case study</SectionEyebrow>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-100">
          Building Kel<span className="text-amber-500">é</span>vo
        </h2>

        <h3 className="mt-8 text-lg font-bold text-ink-100">The problem</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
          Small trucking companies run million-dollar operations on
          spreadsheets, phone calls and inbox archaeology. As a dispatcher I
          lived it daily: every load means a rate confirmation to parse, a
          driver to assign, status calls to brokers, and a settlement to
          reconcile — all manual, all error-prone. Existing TMS products are
          priced and designed for large fleets. Kelévo is the system I wished I
          had at the dispatch desk.
        </p>

        <h3 className="mt-10 text-lg font-bold text-ink-100">Architecture</h3>
        <div className="mt-4">
          <ConsolePanel title="System layout" meta="monorepo">
            <ul className="divide-y divide-ink-400/10">
              {architecture.map((row) => (
                <li
                  key={row.layer}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center"
                >
                  <span className="w-44 shrink-0 font-mono text-[10.5px] tracking-widest text-ink-500 uppercase">
                    {row.layer}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {row.parts.map((part) => (
                      <MonoChip key={part}>{part}</MonoChip>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </ConsolePanel>
        </div>

        <h3 className="mt-10 text-lg font-bold text-ink-100">Hard decisions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {decisions.map((decision) => (
            <div
              key={decision.title}
              className="rounded-xl border border-ink-400/15 bg-steel-900 p-4"
            >
              <h4 className="text-sm font-bold text-amber-500">
                {decision.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
                {decision.body}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-bold text-ink-100">Outcomes</h3>
        <ul className="mt-3 max-w-2xl space-y-2">
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-sm text-ink-400">
              <span aria-hidden className="mt-0.5 font-mono text-amber-500">
                ▸
              </span>
              <span className="leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
