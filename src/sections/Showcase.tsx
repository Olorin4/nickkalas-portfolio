import {
  demo,
  links,
  screenshots,
  type DemoState,
  type Screenshot,
} from "@/content/site";
export function Showcase({
  screenshotList = screenshots,
  demoState = demo,
}: {
  screenshotList?: Screenshot[];
  demoState?: DemoState;
}) {
  const shot = screenshotList[0];
  return (
    <section id="kelevo" className="section">
      <h2>Selected work</h2>
      <div className="work-heading">
        <h3>Kelevo — transportation management</h3>
        <span className="caption">
          Independent product · deployed web application
        </span>
      </div>
      <p className="work-summary">
        A dispatch workflow from rate-confirmation documents to load tracking
        and owner-operator settlements. I developed the React interface, backend
        services, database model, and deployment.
      </p>
      <div className="actions">
        <a href={links.caseStudy}>Read the engineering case study →</a>
        <a href={demoState.live ? demoState.url : demoState.fallbackHref}>
          {demoState.live ? "Explore the demo" : "View the walkthrough"}
        </a>
      </div>
      {shot && (
        <figure className="work-image">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export with an unoptimized demo screenshot */}
          <img
            src={shot.src}
            alt={shot.alt}
            width={1440}
            height={960}
            loading="lazy"
          />
          <figcaption>
            Dispatch view with sample fleet data. The demo is available without
            creating an account.
          </figcaption>
        </figure>
      )}
    </section>
  );
}
