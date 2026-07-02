# Personal Portfolio Site — Design Spec

**Date:** 2026-07-02
**Owner:** Nick Kalaitzidis
**Status:** Approved design, pre-implementation

## Purpose

A single-page personal portfolio for job hunting, targeting **both early-stage
startups** (founding engineer, zero-to-one, high ownership) **and logistics/freight
software companies** (domain fluency, ops empathy). The centerpiece is **Kelévo**,
the TMS SaaS Nick built solo — presented through a live demo link and a written
case study.

Success criteria: a recruiter or hiring engineer lands, understands within
10 seconds who Nick is and what he built, and can reach the live demo, case
study, CV, and contact links without friction — on desktop or phone.

## Visual direction — "Ops Console, Founder-Grade"

Chosen after comparing four generated directions and three C+D hybrids.
Mockups are preserved in this repo under `docs/design/` — the selected mockup
is **tile 2 in `direction-mockups-hybrids.html`** (round 1 comparisons in
`direction-mockups-round1.html`).

A dark, premium ops-console aesthetic that proves logistics domain fluency,
injected with founder momentum so it never reads as a cold dashboard:

- **Base:** near-black steel (`#0b0f14` → `#0f151c`) under a faint blueprint
  grid; cool slate text (`#e6edf3` primary / `#9fb0bf` secondary).
- **Accent:** amber signal (`#f5a623` / `#ef9414`) — owns CTAs, live numerals,
  mono load IDs, and the accented **é** in Kelévo.
- **Founder warmth:** a subtle navy→blue gradient wash (`#0b2f4a` → `#125b8a`)
  plus warm amber radial glow behind the hero identity; amber→orange gradient
  primary CTA; oversized name at tight tracking (-1.4px).
- **Status-chip language** borrowed from a real loads board: green DELIVERED,
  amber IN-TRANSIT, blue TENDERED/DISPATCH, slate PLAN — with mono load IDs
  (e.g. `#10428`).
- **Type:** system sans for voice/headlines; `ui-monospace` stack for labels,
  metadata, IDs, tech chips.

## Project setup

- **Repo:** `~/web-dev/nickkalas-portfolio` (this repo) — separate from
  kelevoTMS. Public GitHub repo (the code is itself a work sample).
- **Stack:** Next.js (App Router) + TypeScript (strict mode from the start,
  no `any`) + Tailwind CSS v4.
- **Build:** static export (`output: 'export'`) — no server runtime needed.
- **Hosting:** Cloudflare Workers static assets, on a new personal domain
  (e.g. `nickkalas.dev` — **domain purchase is an owner action**, pending).
- **CI:** GitHub Actions — prettier check, eslint, typecheck, build, deploy
  to Cloudflare on push to `master`.

## Page structure (single-page scroll)

Sections in order, each an anchor target:

### 1. Hero

The Hybrid-2 mockup realized: steel base + blueprint grid + navy wash + amber
glow. Contains:

- "OPEN TO WORK — founding engineer" pill (green live dot, mono, uppercase).
- Name (oversized, tight tracking) + mono role line
  (FOUNDER & FOUNDING SOFTWARE ENGINEER · GREECE).
- Founder-voice value prop: former freight dispatcher turned founder; built
  Kelévo — a multi-tenant TMS SaaS — zero to launch, solo.
- CTAs: **View live demo** (amber gradient, primary → demo.kelevo.ai) and
  **Read the case study** (ghost button, anchor to §4).
- Three metric cards (mono numerals, amber): `0→1` solo build ·
  `11 yrs` ops & dispatch domain · `100%` product→deploy owned.
- Mono tech chips: TypeScript, React, Node.js, PostgreSQL, Prisma, AWS,
  Docker, Stripe, AI/OCR pipeline (last one amber-highlighted).

### 2. Journey ("route log")

Short ops-console-styled timeline — 3 stops, styled like dispatch route
entries: winery owner/manager (2011–2022) → truck dispatcher, Iron Wing
Dispatching (2024–2025) → founder & engineer, Kelevo (2024–present).
Self-taught via The Odin Project noted here. This section explains the
unusual path — it is the differentiator, kept tight (no filler).

### 3. Kelévo showcase (the star)

- Live-demo CTA repeated + `live · demo.kelevo.ai` mono affordance.
- Real product screenshots (curated, **seeded/fictional data only** — never
  real customer data), framed as console panels with faux window chrome.
- 4–6 feature highlights: dispatch/loads board, fleet lifecycle state
  machines, OCR rate-con intake, settlements + branded PDF statements,
  multi-tenant auth, Stripe billing.

### 4. Case study

Written for two readers — skimmable headlines for recruiters, depth for
engineers. Flow: problem (trucking ops pain observed first-hand) →
architecture (diagram: monorepo, backend/Prisma/Postgres, Lite/Pro frontends,
shared domain package, R2 storage, OCR pipeline, Stripe) → hard decisions
(shared TS domain vocabulary, lifecycle state machines, multi-tenancy,
document pipeline) → outcomes (launched product, CI discipline, typed
codebase).

### 5. Stack & skills

Grouped mono chips mirroring the CV taxonomy: Languages / Product & Frontend /
Backend / Cloud & DevOps / Execution.

### 6. Contact

Email (nick.kalas@proton.me), GitHub (Olorin4), LinkedIn (nick-kalas),
**CV PDF download** (copied into the repo from kelevoTMS
`docs/Nick_Kalaitzidis_Startup_Founding_Engineer_CV_2026.pdf`).
Footer with a small mono "built with Next.js · deployed on Cloudflare" note.

## Design system implementation

- Palette codified as Tailwind theme tokens (steel, slate, amber, navy,
  status-chip green/amber/blue/slate) — no hardcoded hex in components.
- Reusable primitives: `StatusChip`, `MetricCard`, `ConsolePanel` (framed
  screenshot/window), `MonoChip` (tech tag), section eyebrow.
- Accessibility: WCAG AA contrast (amber-on-dark and slate-on-steel pairs
  verified), semantic HTML landmarks, keyboard navigable,
  `prefers-reduced-motion` respected (glow/scroll animations disabled).
- SEO: meta tags, Open Graph + social preview card image, sitemap, favicon.
- Performance: static export, system fonts only (no webfont downloads),
  optimized images. Target Lighthouse ≥ 95 across categories.
- Responsive mobile-first — recruiters open links on phones; the loads-board
  panels and metric cards must degrade gracefully to single-column.

## Companion task (out of scope here, tracked separately in kelevoTMS)

**demo.kelevo.ai** — dedicated demo deployment with a seeded, fictional,
read-only demo org and one-click demo login (auto-login or demo-user button).
The portfolio ships first; until the demo env is live, the primary CTA reads
"Demo — launching soon" and falls back to the case study anchor. That task
gets its own brainstorm/plan in the kelevoTMS repo.

## Quality gates

- CI: prettier, eslint, typecheck (strict), build — all green before deploy.
- Manual pass before sharing the URL: responsive check (phone + desktop),
  cross-browser (Chromium/Firefox/Safari), Lighthouse ≥ 95, and a link check
  (demo URL, GitHub, LinkedIn, CV download, mailto).

## Decisions log

| Decision                           | Choice                                                   |
| ---------------------------------- | -------------------------------------------------------- |
| Separate repo vs. inside kelevoTMS | Separate repo (`nickkalas-portfolio`)                    |
| Target audience                    | Both startups and logistics software companies           |
| Kelevo experience                  | Live demo link (primary) + case study backbone           |
| Stack                              | Next.js + TypeScript strict + Tailwind v4, static export |
| Structure                          | Single-page scroll                                       |
| Visual direction                   | Hybrid 2 — "Ops Console, Founder-Grade" (from C+D blend) |
| Demo strategy                      | Dedicated demo env + auto-login (companion task)         |
| Hosting                            | New personal domain + Cloudflare Workers static assets   |
