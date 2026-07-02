# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Nick's single-page portfolio site (design: "Ops Console, Founder-Grade") per the approved spec at `docs/superpowers/specs/2026-07-02-portfolio-site-design.md`.

**Architecture:** Next.js App Router with static export (`output: 'export'`) — no server runtime. One page assembled from six section components, which are built on a small set of design-system primitives and a single typed content module. Deployed as Cloudflare Workers static assets via GitHub Actions.

**Tech Stack:** Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS v4 · Vitest + Testing Library + vitest-axe · Wrangler (Cloudflare) · GitHub Actions.

## Global Constraints

- TypeScript strict mode with `noUncheckedIndexedAccess`; **no `any`, no unsafe casts** — real types at every boundary.
- All colors come from Tailwind `@theme` tokens defined in `src/app/globals.css`; **no hardcoded hex values inside components** (complex gradients live in named `@utility` classes in globals.css).
- System font stacks only (sans + mono) — no webfont downloads.
- The site must build with `output: 'export'` (static) — no server-only runtime features.
- Product wordmark in copy is **"Kelévo"** (accented é); the company/org name is "Kelevo" (plain).
- The demo CTA behavior: while `demo.live === false`, primary CTA label is **"Demo — launching soon"** and links to `#case-study`; when `live: true`, label is **"View live demo"** and links to `https://demo.kelevo.ai`.
- Mobile-first responsive; WCAG AA contrast; `prefers-reduced-motion` respected.
- Conventional commit messages (`feat:`, `chore:`, `test:`, `docs:`, `ci:`).
- Repo root for all paths below: `/home/olorin4/web-dev/nickkalas-portfolio`.
- After each task's final step, run `npm run format` before committing so prettier never fails CI.

## File Structure

```
nickkalas-portfolio/
├── package.json, tsconfig.json, next.config.ts, postcss.config.mjs,
│   eslint.config.mjs, vitest.config.ts, vitest.setup.ts, wrangler.jsonc,
│   .gitignore, README.md
├── .github/workflows/ci.yml
├── public/cv/Nick_Kalaitzidis_CV_2026.pdf
└── src/
    ├── app/
    │   ├── globals.css        # @theme tokens + named utilities + base styles
    │   ├── layout.tsx         # html/body shell + site metadata
    │   ├── page.tsx           # assembles the six sections
    │   ├── icon.svg           # favicon
    │   ├── opengraph-image.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── content/site.ts        # ALL copy + data + links (single source of truth)
    ├── components/            # design-system primitives (one per file, co-located tests)
    │   ├── SectionEyebrow.tsx, MonoChip.tsx, StatusChip.tsx,
    │   ├── MetricCard.tsx, ConsolePanel.tsx, LoadsBoard.tsx
    └── sections/              # page sections (one per file, co-located tests)
        ├── Hero.tsx, Journey.tsx, Showcase.tsx,
        ├── CaseStudy.tsx, Skills.tsx, Contact.tsx
```

Sections read the content module directly (no prop drilling); the one exception is `Hero`, which accepts an optional `demoState` prop so the fallback logic is testable.

---

### Task 1: Project scaffold (Next.js, strict TS, Tailwind v4, static export)

**Files:**

- Create: `package.json`, `.gitignore`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/globals.css` (minimal for now), `src/app/layout.tsx` (minimal), `src/app/page.tsx` (minimal)

**Interfaces:**

- Consumes: nothing (first code task).
- Produces: a repo where `npm run build` emits `out/index.html`, and `npm run lint` / `npm run typecheck` / `npm run format:check` pass. Path alias `@/*` → `src/*`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "nickkalas-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "deploy": "wrangler deploy"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd /home/olorin4/web-dev/nickkalas-portfolio
npm install next@^15 react@^19 react-dom@^19
npm install -D typescript @types/react @types/react-dom @types/node \
  tailwindcss @tailwindcss/postcss \
  eslint eslint-config-next @eslint/eslintrc prettier
```

Expected: both commands exit 0; `package-lock.json` created.

- [ ] **Step 3: Write config files**

`.gitignore`:

```
node_modules/
.next/
out/
*.tsbuildinfo
.env*
.DS_Store
.superpowers/
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

`postcss.config.mjs`:

```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

`eslint.config.mjs`:

```js
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
```

- [ ] **Step 4: Write the minimal app shell**

`src/app/globals.css`:

```css
@import "tailwindcss";
```

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nick Kalaitzidis — Founder & Founding Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```tsx
export default function Home() {
  return <main>Nick Kalaitzidis</main>;
}
```

- [ ] **Step 5: Verify the toolchain**

```bash
npm run format && npm run lint && npm run typecheck && npm run build
ls out/index.html
```

Expected: all commands exit 0; `out/index.html` exists (static export worked).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + strict TS + Tailwind v4 static-export project"
```

---

### Task 2: Design tokens, global styles, and page shell

**Files:**

- Modify: `src/app/globals.css`, `src/app/layout.tsx`

**Interfaces:**

- Consumes: Task 1 scaffold.
- Produces: Tailwind color tokens usable in classes by every later task: `steel-950 #0b0f14`, `steel-900 #0f151c`, `steel-800 #12181f`, `ink-100 #e6edf3`, `ink-300 #cdd8e2`, `ink-400 #9fb0bf`, `ink-500 #7f93a4`, `amber-400 #f7ad57`, `amber-500 #f5a623`, `amber-600 #ef9414`, `navy-900 #0b2f4a`, `navy-700 #125b8a`, `status-ok #3ecf8e`, `status-info #4aa3e0`. Named utilities `bg-blueprint`, `bg-hero-glow`, `bg-navy-wash`. Fonts `font-sans` / `font-mono` (system stacks). Body defaults: dark steel background, light text.

- [ ] **Step 1: Write the full `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-steel-950: #0b0f14;
  --color-steel-900: #0f151c;
  --color-steel-800: #12181f;

  --color-ink-100: #e6edf3;
  --color-ink-300: #cdd8e2;
  --color-ink-400: #9fb0bf;
  --color-ink-500: #7f93a4;

  --color-amber-400: #f7ad57;
  --color-amber-500: #f5a623;
  --color-amber-600: #ef9414;

  --color-navy-900: #0b2f4a;
  --color-navy-700: #125b8a;

  --color-status-ok: #3ecf8e;
  --color-status-info: #4aa3e0;

  --font-sans:
    ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  --font-mono:
    ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
}

/* Faint blueprint grid used by hero and console surfaces. */
@utility bg-blueprint {
  background-image:
    repeating-linear-gradient(
      0deg,
      color-mix(in srgb, var(--color-ink-400) 6%, transparent) 0 1px,
      transparent 1px 38px
    ),
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-ink-400) 6%, transparent) 0 1px,
      transparent 1px 38px
    );
}

/* Warm amber radial glow, top-right (founder warmth over the console). */
@utility bg-hero-glow {
  background-image: radial-gradient(
    circle at 88% 0%,
    color-mix(in srgb, var(--color-amber-500) 18%, transparent),
    transparent 42%
  );
}

/* Navy -> transparent diagonal wash behind the hero identity. */
@utility bg-navy-wash {
  background-image: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-navy-700) 30%, transparent),
    color-mix(in srgb, var(--color-navy-900) 10%, transparent) 52%,
    transparent 74%
  );
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}

body {
  @apply bg-steel-950 font-sans text-ink-100 antialiased;
}
```

- [ ] **Step 2: Update `src/app/layout.tsx` body (no visual classes needed on body — globals handles it)**

No change needed beyond Task 1's version; confirm it still imports `./globals.css`.

- [ ] **Step 3: Verify**

```bash
npm run build
grep -o "steel-950\|bg-blueprint" out/index.html | head -2 || true
npm run typecheck
```

Expected: build exits 0. (The grep may print nothing yet — tokens are unused until sections exist; that's fine.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: design tokens, blueprint/glow utilities, global base styles"
```

---

### Task 3: Test infrastructure + typed content module

**Files:**

- Create: `vitest.config.ts`, `vitest.setup.ts`, `src/content/site.ts`, `src/content/site.test.ts`

**Interfaces:**

- Consumes: Task 1 toolchain.
- Produces: the content module every section imports. Exact exports:
  - `interface Metric { value: string; label: string }`
  - `type StatusKind = "ok" | "warn" | "info" | "muted"`
  - `interface LoadRow { id: string; lane: string; status: string; kind: StatusKind }`
  - `interface TimelineStop { period: string; role: string; org: string; summary: string }`
  - `interface Feature { title: string; description: string }`
  - `interface SkillGroup { label: string; skills: string[] }`
  - `interface DemoState { live: boolean; url: string; fallbackHref: string }`
  - `const SITE_URL: string` · `const identity: { name; role; location; tagline }` (all string fields) · `const links: { email; github; linkedin; cv }` (all strings) · `const demo: DemoState` · `const metrics: Metric[]` · `const heroChips: string[]` · `const loadRows: LoadRow[]` · `const timeline: TimelineStop[]` · `const features: Feature[]` · `const skillGroups: SkillGroup[]`
    Also produces a working `npm test` (Vitest + jsdom + Testing Library + vitest-axe).

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom vitest-axe
```

- [ ] **Step 2: Write test config**

`vitest.config.ts`:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

`vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing content test**

`src/content/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  demo,
  features,
  heroChips,
  identity,
  links,
  loadRows,
  metrics,
  skillGroups,
  timeline,
} from "@/content/site";

describe("site content", () => {
  it("has the three hero metrics", () => {
    expect(metrics).toHaveLength(3);
    expect(metrics.map((m) => m.value)).toEqual(["0→1", "11 yrs", "100%"]);
  });

  it("has valid contact links", () => {
    expect(links.email).toContain("@");
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(links.cv).toMatch(/^\/cv\/.+\.pdf$/);
  });

  it("demo starts not-live with a case-study fallback", () => {
    expect(demo.live).toBe(false);
    expect(demo.url).toBe("https://demo.kelevo.ai");
    expect(demo.fallbackHref).toBe("#case-study");
  });

  it("has substantive section data", () => {
    expect(identity.name).toBe("Nick Kalaitzidis");
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(heroChips.length).toBeGreaterThanOrEqual(6);
    expect(loadRows).toHaveLength(4);
    expect(timeline).toHaveLength(3);
    expect(features).toHaveLength(6);
    expect(skillGroups).toHaveLength(5);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/content/site'` (or equivalent resolve error).

- [ ] **Step 5: Write `src/content/site.ts`**

```ts
export interface Metric {
  value: string;
  label: string;
}

export type StatusKind = "ok" | "warn" | "info" | "muted";

export interface LoadRow {
  id: string;
  lane: string;
  status: string;
  kind: StatusKind;
}

export interface TimelineStop {
  period: string;
  role: string;
  org: string;
  summary: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface DemoState {
  live: boolean;
  url: string;
  fallbackHref: string;
}

export const SITE_URL = "https://nickkalas.dev";

export const identity = {
  name: "Nick Kalaitzidis",
  role: "Founder & Founding Software Engineer",
  location: "Greece",
  tagline:
    "Former freight dispatcher turned founder. I built Kelévo — a multi-tenant TMS SaaS — from zero to launch, solo. Product, architecture, deploy: all owned.",
};

export const links = {
  email: "nick.kalas@proton.me",
  github: "https://github.com/Olorin4",
  linkedin: "https://www.linkedin.com/in/nick-kalas",
  cv: "/cv/Nick_Kalaitzidis_CV_2026.pdf",
};

export const demo: DemoState = {
  live: false,
  url: "https://demo.kelevo.ai",
  fallbackHref: "#case-study",
};

export const metrics: Metric[] = [
  { value: "0→1", label: "Solo build, zero to launch" },
  { value: "11 yrs", label: "Ops & dispatch domain" },
  { value: "100%", label: "Product → deploy owned" },
];

export const heroChips: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "AWS",
  "Docker",
  "Stripe",
  "AI/OCR pipeline",
];

export const loadRows: LoadRow[] = [
  {
    id: "#10428",
    lane: "Atlanta, GA → Dallas, TX",
    status: "DELIVERED",
    kind: "ok",
  },
  {
    id: "#10431",
    lane: "Memphis, TN → Chicago, IL",
    status: "IN-TRANSIT",
    kind: "warn",
  },
  {
    id: "#10436",
    lane: "Denver, CO → Phoenix, AZ",
    status: "TENDERED",
    kind: "info",
  },
  {
    id: "#10442",
    lane: "Kansas City, MO → Omaha, NE",
    status: "PLAN",
    kind: "muted",
  },
];

export const timeline: TimelineStop[] = [
  {
    period: "2011 – 2022",
    role: "Owner & Manager",
    org: "Nick Kalas Winery",
    summary:
      "Ran a production business end to end — operations, planning, equipment, seasonal crews, customers. Eleven years of owning outcomes.",
  },
  {
    period: "2024 – 2025",
    role: "Truck Dispatcher",
    org: "Iron Wing Dispatching",
    summary:
      "Dispatched US freight — brokers, drivers, rate confirmations, settlements. Lived the operational pain that became Kelévo's spec.",
  },
  {
    period: "2024 – Present",
    role: "Founder & Founding Engineer",
    org: "Kelevo",
    summary:
      "Self-taught via The Odin Project, then built a commercial TMS SaaS solo: product, architecture, code, infra, launch.",
  },
];

export const features: Feature[] = [
  {
    title: "Dispatch & loads board",
    description:
      "Full load lifecycle from tender to delivery, driven by an explicit state machine — no invalid transitions, ever.",
  },
  {
    title: "Fleet & asset management",
    description:
      "Trucks, trailers and drivers with their own lifecycles, assignments and per-org numbering.",
  },
  {
    title: "AI/OCR document intake",
    description:
      "Rate confirmations parsed on arrival — email ingestion, OCR, structured extraction into loads.",
  },
  {
    title: "Settlements & statements",
    description:
      "Owner-operator settlements with branded, immutable PDF statements emailed on issue.",
  },
  {
    title: "Multi-tenant core",
    description:
      "Org-scoped data isolation enforced at the service layer, with plan- and role-based capability gating.",
  },
  {
    title: "Stripe billing",
    description:
      "Trial-to-paid subscription lifecycle wired into plan entitlements.",
  },
];

export const skillGroups: SkillGroup[] = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python"] },
  {
    label: "Product & Frontend",
    skills: ["React", "UX Design", "HTML5", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Prisma"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS", "Linux", "Docker", "Cloudflare", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Execution",
    skills: [
      "Product Strategy",
      "Roadmap",
      "SaaS",
      "Testing",
      "Launch Prep",
      "Customer Discovery",
    ],
  },
];
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (4 tests).

- [ ] **Step 7: Commit**

```bash
npm run format
git add -A
git commit -m "feat: test infrastructure (vitest/RTL/axe) and typed site content module"
```

---

### Task 4: Small primitives — SectionEyebrow, MonoChip, StatusChip, MetricCard

**Files:**

- Create: `src/components/SectionEyebrow.tsx`, `src/components/MonoChip.tsx`, `src/components/StatusChip.tsx`, `src/components/MetricCard.tsx`
- Test: `src/components/primitives.test.tsx`

**Interfaces:**

- Consumes: `Metric`, `StatusKind` from `@/content/site` (Task 3).
- Produces (exact signatures later tasks rely on):
  - `SectionEyebrow({ children }: { children: React.ReactNode })`
  - `MonoChip({ children, accent }: { children: React.ReactNode; accent?: boolean })` — `accent` defaults to `false`
  - `StatusChip({ label, kind }: { label: string; kind: StatusKind })`
  - `MetricCard({ metric }: { metric: Metric })`

- [ ] **Step 1: Write the failing tests**

`src/components/primitives.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "@/components/MetricCard";
import { MonoChip } from "@/components/MonoChip";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { StatusChip } from "@/components/StatusChip";

describe("SectionEyebrow", () => {
  it("renders its label", () => {
    render(<SectionEyebrow>Featured system</SectionEyebrow>);
    expect(screen.getByText("Featured system")).toBeInTheDocument();
  });
});

describe("MonoChip", () => {
  it("renders plain and accent variants", () => {
    const { rerender } = render(<MonoChip>TypeScript</MonoChip>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    rerender(<MonoChip accent>AI/OCR pipeline</MonoChip>);
    expect(screen.getByText("AI/OCR pipeline").className).toContain("amber");
  });
});

describe("StatusChip", () => {
  it("renders the label with kind-specific styling", () => {
    render(<StatusChip label="DELIVERED" kind="ok" />);
    const chip = screen.getByText("DELIVERED");
    expect(chip).toBeInTheDocument();
    expect(chip.className).toContain("status-ok");
  });
});

describe("MetricCard", () => {
  it("renders value and label", () => {
    render(<MetricCard metric={{ value: "0→1", label: "Solo build" }} />);
    expect(screen.getByText("0→1")).toBeInTheDocument();
    expect(screen.getByText("Solo build")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/MetricCard` (and the other three).

- [ ] **Step 3: Implement the four components**

`src/components/SectionEyebrow.tsx`:

```tsx
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.2em] text-amber-500 uppercase">
      {children}
    </p>
  );
}
```

`src/components/MonoChip.tsx`:

```tsx
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
```

`src/components/StatusChip.tsx`:

```tsx
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
```

`src/components/MetricCard.tsx`:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add -A
git commit -m "feat: design-system primitives (eyebrow, chips, metric card)"
```

---

### Task 5: ConsolePanel + LoadsBoard

**Files:**

- Create: `src/components/ConsolePanel.tsx`, `src/components/LoadsBoard.tsx`
- Test: `src/components/LoadsBoard.test.tsx`

**Interfaces:**

- Consumes: `StatusChip` (Task 4), `loadRows` (Task 3).
- Produces:
  - `ConsolePanel({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode })` — framed window with faux chrome bar
  - `LoadsBoard()` — no props; renders `loadRows` inside a ConsolePanel

- [ ] **Step 1: Write the failing test**

`src/components/LoadsBoard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadsBoard } from "@/components/LoadsBoard";
import { loadRows } from "@/content/site";

describe("LoadsBoard", () => {
  it("renders every load row with id, lane, and status chip", () => {
    render(<LoadsBoard />);
    for (const row of loadRows) {
      expect(screen.getByText(row.id)).toBeInTheDocument();
      expect(screen.getByText(row.lane)).toBeInTheDocument();
      expect(screen.getByText(row.status)).toBeInTheDocument();
    }
  });

  it("shows the panel title and active count", () => {
    render(<LoadsBoard />);
    expect(screen.getByText("Loads board")).toBeInTheDocument();
    expect(screen.getByText(`${loadRows.length} active`)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/LoadsBoard`.

- [ ] **Step 3: Implement**

`src/components/ConsolePanel.tsx`:

```tsx
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
```

(The `shadow-[...]` arbitrary value uses a plain black shadow — shadows are not palette colors, so this does not violate the token rule.)

`src/components/LoadsBoard.tsx`:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add -A
git commit -m "feat: ConsolePanel frame and LoadsBoard panel"
```

---

### Task 6: Hero section

**Files:**

- Create: `src/sections/Hero.tsx`
- Test: `src/sections/Hero.test.tsx`

**Interfaces:**

- Consumes: `MetricCard`, `MonoChip` (Task 4); `identity`, `links`, `metrics`, `heroChips`, `demo`, `DemoState` (Task 3).
- Produces: `Hero({ demoState }: { demoState?: DemoState })` — `demoState` defaults to the content module's `demo`. Renders a `<header>` landmark.

- [ ] **Step 1: Write the failing test**

`src/sections/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { identity, metrics } from "@/content/site";
import { Hero } from "@/sections/Hero";

describe("Hero", () => {
  it("renders name, role, tagline, pill, and metrics", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: identity.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(/founding software engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/open to work/i)).toBeInTheDocument();
    for (const metric of metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
    }
  });

  it("falls back to the case study while the demo is not live", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /demo — launching soon/i });
    expect(cta).toHaveAttribute("href", "#case-study");
  });

  it("links to the live demo when live", () => {
    render(
      <Hero
        demoState={{
          live: true,
          url: "https://demo.kelevo.ai",
          fallbackHref: "#case-study",
        }}
      />,
    );
    const cta = screen.getByRole("link", { name: /view live demo/i });
    expect(cta).toHaveAttribute("href", "https://demo.kelevo.ai");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/sections/Hero`.

- [ ] **Step 3: Implement `src/sections/Hero.tsx`**

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add -A
git commit -m "feat: hero section with demo-fallback CTA, metrics, tech chips"
```

---

### Task 7: Journey section (route log)

**Files:**

- Create: `src/sections/Journey.tsx`
- Test: `src/sections/Journey.test.tsx`

**Interfaces:**

- Consumes: `SectionEyebrow` (Task 4); `timeline` (Task 3).
- Produces: `Journey()` — a `<section id="journey">` with an ordered list of the three timeline stops.

- [ ] **Step 1: Write the failing test**

`src/sections/Journey.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { timeline } from "@/content/site";
import { Journey } from "@/sections/Journey";

describe("Journey", () => {
  it("renders all three stops with role, org, and period", () => {
    render(<Journey />);
    for (const stop of timeline) {
      expect(screen.getByText(stop.role)).toBeInTheDocument();
      expect(screen.getByText(stop.org)).toBeInTheDocument();
      expect(screen.getByText(stop.period)).toBeInTheDocument();
    }
  });

  it("is an anchorable section", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("section#journey")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/sections/Journey`.

- [ ] **Step 3: Implement `src/sections/Journey.tsx`**

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add -A
git commit -m "feat: journey section (route-log timeline)"
```

---

### Task 8: Kelévo showcase section

**Files:**

- Create: `src/sections/Showcase.tsx`
- Modify: `src/content/site.ts` (add `Screenshot` type + `screenshots` export)
- Test: `src/sections/Showcase.test.tsx`

**Interfaces:**

- Consumes: `SectionEyebrow` (Task 4), `LoadsBoard` (Task 5); `features`, `demo` (Task 3).
- Produces:
  - In `@/content/site`: `interface Screenshot { src: string; title: string; alt: string }` and `const screenshots: Screenshot[]` (ships empty; owner populates later — see Task 14 README).
  - `Showcase({ screenshotList }: { screenshotList?: Screenshot[] })` — defaults to the content module's `screenshots`. A `<section id="kelevo">` with the product intro, LoadsBoard panel, optional screenshot panels, six feature cards, and the demo affordance (same fallback rule as Hero).

- [ ] **Step 1: Add the screenshot type + export to `src/content/site.ts`**

Append to the file:

```ts
export interface Screenshot {
  src: string;
  title: string;
  alt: string;
}

/**
 * Curated product screenshots (seeded/fictional data only — never real
 * customer data). Drop PNGs in public/screenshots/ and register them here.
 */
export const screenshots: Screenshot[] = [];
```

- [ ] **Step 2: Write the failing test**

`src/sections/Showcase.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { features } from "@/content/site";
import { Showcase } from "@/sections/Showcase";

describe("Showcase", () => {
  it("renders the product intro and all six features", () => {
    render(<Showcase />);
    expect(
      screen.getByText("Transportation Management System — SaaS"),
    ).toBeInTheDocument();
    for (const feature of features) {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    }
  });

  it("renders the loads board panel", () => {
    render(<Showcase />);
    expect(screen.getByText("Loads board")).toBeInTheDocument();
  });

  it("renders no screenshot images while the list is empty", () => {
    render(<Showcase />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders registered screenshots as console panels", () => {
    render(
      <Showcase
        screenshotList={[
          {
            src: "/screenshots/loads-board.png",
            title: "Loads board",
            alt: "Kelévo loads board showing active loads",
          },
        ]}
      />,
    );
    expect(
      screen.getByAltText("Kelévo loads board showing active loads"),
    ).toBeInTheDocument();
  });

  it("is an anchorable section", () => {
    const { container } = render(<Showcase />);
    expect(container.querySelector("section#kelevo")).not.toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/sections/Showcase`.

- [ ] **Step 4: Implement `src/sections/Showcase.tsx`**

```tsx
import { ConsolePanel } from "@/components/ConsolePanel";
import { LoadsBoard } from "@/components/LoadsBoard";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  demo,
  features,
  screenshots as defaultScreenshots,
  type Screenshot,
} from "@/content/site";

export function Showcase({
  screenshotList = defaultScreenshots,
}: {
  screenshotList?: Screenshot[];
}) {
  const demoHref = demo.live ? demo.url : demo.fallbackHref;
  const demoLabel = demo.live ? "View live demo" : "Demo — launching soon";

  return (
    <section id="kelevo" className="border-t border-ink-400/10 bg-steel-900/40">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionEyebrow>Featured system</SectionEyebrow>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-500 uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-status-ok" />
            {demo.live ? "live · demo.kelevo.ai" : "demo launching soon"}
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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
npm run format
git add -A
git commit -m "feat: Kelévo showcase section with loads board, screenshot slots, feature grid"
```

---

### Task 9: Case study section

**Files:**

- Create: `src/sections/CaseStudy.tsx`
- Test: `src/sections/CaseStudy.test.tsx`

**Interfaces:**

- Consumes: `SectionEyebrow`, `MonoChip` (Task 4), `ConsolePanel` (Task 5).
- Produces: `CaseStudy()` — a `<section id="case-study">` (the Hero/Showcase fallback CTA target) with four sub-blocks: Problem, Architecture (CSS diagram inside a ConsolePanel), Hard decisions, Outcomes.

- [ ] **Step 1: Write the failing test**

`src/sections/CaseStudy.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "@/sections/CaseStudy";

describe("CaseStudy", () => {
  it("renders the four sub-blocks", () => {
    render(<CaseStudy />);
    expect(
      screen.getByRole("heading", { name: /the problem/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /architecture/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /hard decisions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /outcomes/i }),
    ).toBeInTheDocument();
  });

  it("anchors at #case-study (the demo-fallback CTA target)", () => {
    const { container } = render(<CaseStudy />);
    expect(container.querySelector("section#case-study")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/sections/CaseStudy`.

- [ ] **Step 3: Implement `src/sections/CaseStudy.tsx`**

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add -A
git commit -m "feat: case study section (problem, architecture, decisions, outcomes)"
```

---

### Task 10: Skills, Contact, footer — and the CV asset

**Files:**

- Create: `src/sections/Skills.tsx`, `src/sections/Contact.tsx`, `public/cv/Nick_Kalaitzidis_CV_2026.pdf` (copied)
- Test: `src/sections/SkillsContact.test.tsx`

**Interfaces:**

- Consumes: `SectionEyebrow`, `MonoChip` (Task 4); `skillGroups`, `links`, `identity` (Task 3).
- Produces:
  - `Skills()` — `<section id="skills">` with the five grouped chip rows
  - `Contact()` — `<section id="contact">` with mailto/GitHub/LinkedIn/CV links, plus the site `<footer>` inside it

- [ ] **Step 1: Copy the CV into the repo**

```bash
mkdir -p /home/olorin4/web-dev/nickkalas-portfolio/public/cv
cp /home/olorin4/web-dev/kelevoTMS/docs/Nick_Kalaitzidis_Startup_Founding_Engineer_CV_2026.pdf \
   /home/olorin4/web-dev/nickkalas-portfolio/public/cv/Nick_Kalaitzidis_CV_2026.pdf
```

Expected: file exists at the new path (matches `links.cv` = `/cv/Nick_Kalaitzidis_CV_2026.pdf`).

- [ ] **Step 2: Write the failing tests**

`src/sections/SkillsContact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { links, skillGroups } from "@/content/site";
import { Contact } from "@/sections/Contact";
import { Skills } from "@/sections/Skills";

describe("Skills", () => {
  it("renders every group label and every skill chip", () => {
    render(<Skills />);
    for (const group of skillGroups) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const skill of group.skills) {
        expect(screen.getByText(skill)).toBeInTheDocument();
      }
    }
  });
});

describe("Contact", () => {
  it("renders email, GitHub, LinkedIn, and CV download links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${links.email}`,
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      links.github,
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      links.linkedin,
    );
    const cv = screen.getByRole("link", { name: /download cv/i });
    expect(cv).toHaveAttribute("href", links.cv);
    expect(cv).toHaveAttribute("download");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/sections/Skills` / `@/sections/Contact`.

- [ ] **Step 4: Implement**

`src/sections/Skills.tsx`:

```tsx
import { MonoChip } from "@/components/MonoChip";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { skillGroups } from "@/content/site";

export function Skills() {
  return (
    <section id="skills" className="border-t border-ink-400/10 bg-steel-900/40">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <SectionEyebrow>Stack &amp; skills</SectionEyebrow>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-100">
          What I work with
        </h2>

        <div className="mt-8 space-y-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-[10.5px] tracking-[0.15em] text-ink-500 uppercase">
                {group.label}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <MonoChip key={skill}>{skill}</MonoChip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`src/sections/Contact.tsx`:

```tsx
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { identity, links } from "@/content/site";

const contactLinks = [
  { label: "Email", href: `mailto:${links.email}`, download: false },
  { label: "GitHub", href: links.github, download: false },
  { label: "LinkedIn", href: links.linkedin, download: false },
  { label: "Download CV", href: links.cv, download: true },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-ink-400/10">
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        <SectionEyebrow>Contact</SectionEyebrow>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-100">
          Let&apos;s talk
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-400">
          Open to founding-engineer and senior full-stack roles — especially
          where logistics domain depth matters.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download ? { download: "" } : {})}
              {...(link.href.startsWith("https://")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center rounded-lg border border-ink-400/20 bg-ink-400/5 px-4 py-2.5 text-sm font-semibold text-ink-300 transition hover:border-amber-500/50 hover:text-amber-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <footer className="mt-14 border-t border-ink-400/10 pt-6">
          <p className="font-mono text-[10.5px] tracking-wider text-ink-500">
            © 2026 {identity.name} · built with Next.js · deployed on Cloudflare
          </p>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
npm run format
git add -A
git commit -m "feat: skills and contact sections, footer, CV download asset"
```

---

### Task 11: Page assembly + accessibility test

**Files:**

- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**

- Consumes: all six sections (Tasks 6–10).
- Produces: the complete assembled page — `Hero` header, then `<main>` containing Journey, Showcase, CaseStudy, Skills, Contact.

- [ ] **Step 1: Write the failing tests**

`src/app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("assembles all section anchors in order", () => {
    const { container } = render(<Home />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map(
      (el) => el.id,
    );
    expect(ids).toEqual([
      "journey",
      "kelevo",
      "case-study",
      "skills",
      "contact",
    ]);
    expect(container.querySelector("header")).not.toBeNull();
    expect(container.querySelector("main")).not.toBeNull();
  });

  it("exposes exactly one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — the placeholder page from Task 1 has no sections.

- [ ] **Step 3: Implement `src/app/page.tsx`**

```tsx
import { CaseStudy } from "@/sections/CaseStudy";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Showcase } from "@/sections/Showcase";
import { Skills } from "@/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Journey />
        <Showcase />
        <CaseStudy />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all suites). If axe reports violations, fix the flagged markup in the offending section (do not silence the test) and re-run.

- [ ] **Step 5: Full local gate**

```bash
npm run format && npm run lint && npm run typecheck && npm test && npm run build
```

Expected: all exit 0; `out/index.html` contains the full page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble single-page portfolio with a11y regression test"
```

---

### Task 12: SEO — metadata, OG image, favicon, robots, sitemap

**Files:**

- Modify: `src/app/layout.tsx`
- Create: `src/app/icon.svg`, `src/app/opengraph-image.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`

**Interfaces:**

- Consumes: `SITE_URL`, `identity` (Task 3).
- Produces: build artifacts `out/icon.svg`, `out/opengraph-image.png`, `out/robots.txt`, `out/sitemap.xml`, and full metadata in the page `<head>`.

- [ ] **Step 1: Update `src/app/layout.tsx` metadata**

```tsx
import type { Metadata } from "next";
import { SITE_URL, identity } from "@/content/site";
import "./globals.css";

const description =
  "Former freight dispatcher turned founder. Built Kelévo — a multi-tenant TMS SaaS for trucking operations — solo, zero to launch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${identity.name} — ${identity.role}`,
  description,
  openGraph: {
    title: `${identity.name} — ${identity.role}`,
    description,
    url: SITE_URL,
    siteName: identity.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `src/app/icon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0b0f14"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="10.5" fill="none" stroke="#f5a623" stroke-opacity="0.4" stroke-width="3"/>
  <text x="32" y="42" font-family="Menlo, monospace" font-size="26" font-weight="700" fill="#f5a623" text-anchor="middle">NK</text>
</svg>
```

(SVG assets may use raw hex — the token rule applies to components.)

- [ ] **Step 3: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { identity } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${identity.name} — ${identity.role}`;

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b0f14",
        color: "#e6edf3",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 6,
          color: "#f5a623",
          textTransform: "uppercase",
        }}
      >
        {identity.role}
      </div>
      <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16 }}>
        {identity.name}
      </div>
      <div style={{ fontSize: 32, color: "#9fb0bf", marginTop: 24 }}>
        Built Kelévo — a TMS SaaS — solo, zero to launch.
      </div>
    </div>,
    size,
  );
}
```

- [ ] **Step 4: Create robots and sitemap**

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
```

- [ ] **Step 5: Verify build artifacts**

```bash
npm run build
ls out/icon.svg out/robots.txt out/sitemap.xml out/opengraph-image*
grep -o 'property="og:title"' out/index.html
```

Expected: all files listed; the grep finds the og:title meta tag.

- [ ] **Step 6: Commit**

```bash
npm run format
git add -A
git commit -m "feat: SEO metadata, OG image, favicon, robots, sitemap"
```

---

### Task 13: CI workflow

**Files:**

- Create: `.github/workflows/ci.yml`

**Interfaces:**

- Consumes: npm scripts from Task 1/3.
- Produces: a `validate` job on every push/PR, and a `deploy` job (master only) that Task 14 completes. The deploy job is included here but will fail until Task 14's wrangler config + secrets exist — that is expected and documented.

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [master]
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run format:check
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  deploy:
    needs: validate
    if: github.event_name == 'push' && github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

- [ ] **Step 2: Verify the workflow file parses (local YAML sanity)**

```bash
node -e "const y=require('js-yaml')" 2>/dev/null \
  || npx --yes yaml-lint .github/workflows/ci.yml 2>/dev/null \
  || echo "skip lint - reviewed by eye"
```

Expected: no YAML syntax errors (or the explicit skip line — a push will validate it definitively).

- [ ] **Step 3: Commit and push; confirm the validate job passes**

```bash
git add -A
git commit -m "ci: validate (format/lint/typecheck/test/build) + deploy gate"
git push
gh run watch --exit-status || gh run list --limit 1
```

Expected: `validate` job SUCCESS. `deploy` job FAILS at the wrangler step (no wrangler.jsonc/secrets yet) — expected until Task 14 + owner secrets.

---

### Task 14: Cloudflare deploy config + README

**Files:**

- Create: `wrangler.jsonc`, `README.md`

**Interfaces:**

- Consumes: `out/` static export (Task 1), CI deploy job (Task 13).
- Produces: a deployable Workers-static-assets config; README documenting setup + the two owner actions (GitHub secrets, custom-domain activation).

- [ ] **Step 1: Install wrangler and write `wrangler.jsonc`**

```bash
npm install -D wrangler
```

`wrangler.jsonc`:

```jsonc
{
  "name": "nickkalas-portfolio",
  "compatibility_date": "2026-07-01",
  "assets": {
    "directory": "./out",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page",
  },
  "routes": [{ "pattern": "nickkalas.dev", "custom_domain": true }],
}
```

(If the purchased domain differs from `nickkalas.dev`, update the `pattern` here **and** `SITE_URL` in `src/content/site.ts` — nothing else hardcodes it.)

- [ ] **Step 2: Verify config locally**

```bash
npm run build
npx wrangler deploy --dry-run
```

Expected: dry-run succeeds, reporting the asset directory and route. (An auth prompt/error at upload stage is fine — dry-run must parse config and find `./out`.)

- [ ] **Step 3: Write `README.md`**

```markdown
# nickkalas-portfolio

Personal portfolio — single-page, static-export Next.js site
("Ops Console, Founder-Grade" design). Spec and plan live in
`docs/superpowers/`.

## Develop

    npm install
    npm run dev          # http://localhost:3000

## Validate

    npm run format:check && npm run lint && npm run typecheck && npm test && npm run build

## Deploy

Pushes to `master` run CI and deploy `out/` to Cloudflare Workers
static assets via `wrangler.jsonc`.

One-time setup (owner actions):

1. GitHub repo secrets: `CLOUDFLARE_API_TOKEN` (Workers Scripts:Edit
   token) and `CLOUDFLARE_ACCOUNT_ID`.
2. The domain must be active in the Cloudflare account; the custom
   domain binds from `wrangler.jsonc` `routes` on first deploy.
3. When demo.kelevo.ai goes live, flip `demo.live` to `true` in
   `src/content/site.ts`.
4. Product screenshots: drop curated PNGs (seeded/fictional data
   only) into `public/screenshots/` and register each in the
   `screenshots` array in `src/content/site.ts`.

Manual deploy: `npm run build && npm run deploy`.

## Pre-share checklist

- Responsive pass (phone + desktop), cross-browser.
- Lighthouse ≥ 95 all categories.
- Link check: demo CTA, GitHub, LinkedIn, CV download, mailto.
```

- [ ] **Step 4: Commit and push**

```bash
npm run format
git add -A
git commit -m "feat: Cloudflare Workers static-assets deploy config + README"
git push
```

Expected: CI `validate` passes. `deploy` succeeds once the owner has added the two Cloudflare secrets; until then it fails at auth — documented in README.

---

## Verification (whole-plan)

After Task 14, run the pre-share checklist from the README manually: `npm run dev`, check every section on desktop + narrow viewport, run Lighthouse in Chrome DevTools against the built site (`npx serve out` or the deployed URL), and click every external link. Confirm the hero CTA scrolls to the case study while `demo.live` is `false`.
