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
