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
