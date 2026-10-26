import { timeline } from "@/content/site";
export function Journey() {
  return (
    <section id="journey" className="section">
      <h2>Recent experience</h2>
      <ol className="experience-list">
        {timeline.map((stop) => (
          <li key={stop.org}>
            <p className="date">{stop.period}</p>
            <div>
              <h3>{stop.role}</h3>
              <p className="employer">{stop.org}</p>
              <p>{stop.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
