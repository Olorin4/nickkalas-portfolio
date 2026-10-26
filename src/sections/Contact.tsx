import { links } from "@/content/site";
export function Contact() {
  return (
    <section id="contact" className="section">
      <h2>Get in touch</h2>
      <p>
        I’m interested in full-stack and backend work, particularly software for
        logistics, operations, and business workflows.
      </p>
      <div className="actions">
        <a href={`mailto:${links.email}`}>Email</a>
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={links.cv} download>
          Download CV
        </a>
      </div>
    </section>
  );
}
