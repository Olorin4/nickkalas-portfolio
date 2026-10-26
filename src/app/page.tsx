import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Showcase } from "@/sections/Showcase";
import { Skills } from "@/sections/Skills";
export default function Home() {
  return (
    <div className="shell">
      <SiteHeader />
      <main id="main">
        <Hero />
        <Journey />
        <Showcase />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
