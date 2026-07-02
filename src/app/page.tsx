import { identity } from "@/content/site";
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
      <footer className="border-t border-ink-400/10">
        <div className="mx-auto max-w-4xl px-6 py-6 sm:px-10">
          <p className="font-mono text-[10.5px] tracking-wider text-ink-500">
            © 2026 {identity.name} · built with Next.js · deployed on Cloudflare
          </p>
        </div>
      </footer>
    </>
  );
}
