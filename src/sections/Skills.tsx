import { skillGroups } from "@/content/site";
export function Skills() {
  return (
    <section id="background" className="section">
      <h2>Background & tools</h2>
      <p>
        Before working on logistics technology, I drove long-haul freight at
        Varsan Trucking (Apr 2016 – Jul 2017), then worked as a dispatcher (Aug
        2017 – Nov 2020). That experience informs how I model schedules, freight
        documents, and operational exceptions.
      </p>
      <dl className="skills">
        {skillGroups.map((group) => (
          <div key={group.label} className="contents">
            <dt>{group.label}</dt>
            <dd>{group.skills.join(", ")}</dd>
          </div>
        ))}
      </dl>
      <p className="caption">
        Self-taught through The Odin Project’s Full-Stack JavaScript curriculum
        and practical development work.
      </p>
    </section>
  );
}
