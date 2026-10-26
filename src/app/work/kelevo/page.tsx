import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseStudy } from "@/sections/CaseStudy";
import { Contact } from "@/sections/Contact";
export const metadata: Metadata = {
  title: "Kelevo engineering case study — Nick Kalaitzidis",
  description:
    "Dispatch software, concurrent settlement sends, and repeated billing events: implementation decisions and tests from Kelevo.",
  alternates: { canonical: "/work/kelevo" },
};
export default function KelevoCaseStudy() {
  return (
    <div className="shell">
      <SiteHeader />
      <main id="main">
        <header className="case-intro">
          <Link href="/#kelevo">← Back to selected work</Link>
          <h1>Building Kelevo</h1>
          <p>
            A transportation-management application shaped by experience at the
            dispatch desk.
          </p>
          <p className="caption">
            Independent product · Oct 2025 – present · TypeScript, React,
            Node.js, PostgreSQL
          </p>
        </header>
        <CaseStudy />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
