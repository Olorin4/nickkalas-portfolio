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
    "OTR driver → dispatcher → logistics IT and internal-tools developer → founder. I built Kelévo — a multi-tenant TMS SaaS — from zero to launch, solo.",
};

export const links = {
  email: "nick.kalas@proton.me",
  github: "https://github.com/Olorin4",
  linkedin: "https://www.linkedin.com/in/nick-kalas-93753841b",
  cv: "/cv/Nick_Kalaitzidis_CV_2026.pdf",
};

export const demo: DemoState = {
  live: true,
  url: "https://lite.kelevo.ai/#/demo?mode=sandbox",
  fallbackHref: "#case-study",
};

export const metrics: Metric[] = [
  { value: "0→1", label: "Solo build, zero to launch" },
  { value: "9+ yrs", label: "Trucking & logistics operations" },
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
    period: "Apr 2016 – Jul 2017",
    role: "OTR Truck Driver",
    org: "Varsan Trucking",
    summary:
      "Drove long-haul freight, gaining first-hand knowledge of routes, delivery appointments, freight documentation and driver-side operations.",
  },
  {
    period: "Aug 2017 – Nov 2020",
    role: "Truck Dispatcher",
    org: "Varsan Trucking",
    summary:
      "Coordinated drivers, brokers, loads, routes, pickup and delivery schedules, and operational exceptions across US freight.",
  },
  {
    period: "Jan 2021 – Sep 2025",
    role: "IT Support & Internal Tools Developer",
    org: "Iron Wing Dispatching",
    summary:
      "Supported logistics technology and built operational dashboards, ELD-integrated live tracking, commercial-TMS API integrations and business-process automations.",
  },
  {
    period: "Oct 2025 – Present",
    role: "Founder & Founding Engineer",
    org: "Kelevo",
    summary:
      "Built a commercial TMS SaaS solo: product, architecture, code, infrastructure and launch — informed by nine years in trucking operations and logistics technology.",
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
      "Rate confirmations imported from PDFs — OCR, validation, and structured extraction into loads.",
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

export interface Screenshot {
  src: string;
  title: string;
  alt: string;
}

/**
 * Curated product screenshots (seeded/fictional data only — never real
 * customer data). Drop PNGs in public/screenshots/ and register them here.
 */
export const screenshots: Screenshot[] = [
  {
    src: "/screenshots/kelevo-loads-board.png",
    title: "Active loads",
    alt: "Kelévo Active Loads board: a table of loads with route, assigned driver, pickup and delivery windows, rate, and status such as Completed and Delivered, in the app's dark-sidebar interface.",
  },
  {
    src: "/screenshots/kelevo-fleet-roster.png",
    title: "Fleet roster",
    alt: "Kelévo Fleet roster: drivers listed with their current load, equipment, compliance-risk flag, and availability status such as On Route, Dispatched, and Available.",
  },
  {
    src: "/screenshots/kelevo-settlements.png",
    title: "Owner-operator settlements",
    alt: "Kelévo Owner-Operator Settlements: a guided setup checklist plus a run-period form for generating owner-operator settlement statements.",
  },
];

export interface DemoVideo {
  src: string;
  title: string;
  caption: string;
}

/**
 * Screen recording of the AI/OCR rate-confirmation import flow (seeded data).
 * Drop the file in public/media/ and register it here.
 */
export const ocrDemo: DemoVideo = {
  src: "/media/ocr-rate-con-import.mp4",
  title: "OCR rate-con import",
  caption:
    "A broker's rate-confirmation PDF is dropped in and Kelévo's OCR pipeline extracts the lane, dates, and rate to draft the load automatically.",
};
