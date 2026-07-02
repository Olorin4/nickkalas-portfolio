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
