import { identity, links } from "@/content/site";
export function Hero() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="eyebrow">
        {identity.role} · {identity.location}
      </p>
      <h1 id="intro-title">{identity.name}</h1>
      <p>{identity.tagline}</p>
      <p className="availability">
        Open to remote full-stack and backend roles.
      </p>
      <div className="actions">
        <a className="button" href={links.cv} download>
          Download CV
        </a>
        <a href={`mailto:${links.email}`}>Email me</a>
        <a href={links.github}>GitHub</a>
      </div>
    </section>
  );
}
