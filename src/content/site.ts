export const SITE_URL = "https://nickkalas.dev";
export const identity = {
  name: "Nick Kalaitzidis",
  role: "Full-Stack Developer",
  location: "Greece",
  tagline:
    "I build software for logistics workflows. My background spans freight operations, IT support, and internal tools. I independently developed Kelevo, a deployed transportation-management application, and I’m looking to contribute to a collaborative engineering team.",
};
export const links = {
  email: "nick-kalas@kelevo.ai",
  github: "https://github.com/Olorin4",
  linkedin: "https://www.linkedin.com/in/nick-kalas-93753841b",
  cv: "/cv/Nick_Kalaitzidis_CV_2026.pdf",
  caseStudy: "/work/kelevo",
};
export interface DemoState {
  live: boolean;
  url: string;
  fallbackHref: string;
}
export const demo: DemoState = {
  live: true,
  url: "https://tms.kelevo.ai/#/demo?mode=sandbox",
  fallbackHref: "/work/kelevo#walkthrough",
};
export const timeline = [
  {
    period: "Oct 2025 – Present",
    role: "Software Developer & Founder",
    org: "Kelevo · independent product",
    summary:
      "Developed a transportation-management application with React, TypeScript, Node.js, and PostgreSQL. The work covers dispatch workflows, document intake, settlements, billing, and deployment.",
  },
  {
    period: "Jan 2021 – Sep 2025",
    role: "IT Support & Internal Tools Developer",
    org: "Iron Wing Dispatching",
    summary:
      "Supported logistics technology and built operational dashboards, ELD-integrated tracking workflows, API integrations with commercial TMS platforms, and automations for repetitive tasks.",
  },
];
export const skillGroups = [
  {
    label: "Development",
    skills: ["TypeScript", "JavaScript", "React", "Node.js", "Express"],
  },
  {
    label: "Data & APIs",
    skills: ["PostgreSQL", "Prisma", "REST APIs", "Zod"],
  },
  {
    label: "Delivery",
    skills: [
      "Git",
      "Automated testing",
      "GitHub Actions",
      "Docker",
      "Linux",
      "AWS",
      "Cloudflare",
    ],
  },
];
export interface Screenshot {
  src: string;
  title: string;
  alt: string;
}
export const screenshots: Screenshot[] = [
  {
    src: "/screenshots/kelevo-loads-board.png",
    title: "Dispatch workflow",
    alt: "Kelevo demo loads board showing freight routes, drivers, and load statuses using sample data.",
  },
];
export const ocrDemo = {
  src: "/media/ocr-rate-con-import.mp4",
  caption:
    "A recorded rate-confirmation import using sample data. The recording shows an earlier interface; the live demo reflects the current application.",
};
