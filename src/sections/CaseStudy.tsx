import { demo, ocrDemo } from "@/content/site";
export function CaseStudy() {
  return (
    <article className="article">
      <section className="section" id="context">
        <h2>Context and scope</h2>
        <p>
          A freight dispatcher works across rate confirmations, driver
          assignments, delivery updates, and settlement statements. My
          experience in trucking and dispatch shaped Kelevo’s data model and
          workflows.
        </p>
        <p>
          I developed the application independently, including the interface,
          backend, database, and deployment. The public sandbox uses sample data
          and demonstrates the web application’s workflows.
        </p>
        <p>
          The examples below focus on implementation decisions, the behavior
          covered by integration tests, and the limitations of each approach.
        </p>
      </section>
      <section className="section" id="architecture">
        <h2>Architecture</h2>
        <dl className="architecture">
          <dt>Interface</dt>
          <dd>
            React and TypeScript for dispatch, fleet, documents, and
            settlements.
          </dd>
          <dt>API</dt>
          <dd>
            Node.js and Express with request validation, authentication, and
            role checks.
          </dd>
          <dt>Data</dt>
          <dd>
            PostgreSQL and Prisma; organization-scoped service queries for
            tenant data.
          </dd>
          <dt>Integrations</dt>
          <dd>
            Stripe billing, document storage, and OCR-assisted rate-confirmation
            intake.
          </dd>
          <dt>Delivery</dt>
          <dd>
            Docker and Linux infrastructure, with GitHub Actions checks for
            formatting, lint, types, and tests.
          </dd>
        </dl>
        <p>
          A shared TypeScript package defines domain types and lifecycle
          vocabulary. CI checks help catch differences between these contracts
          and their use in the application. They complement runtime validation
          and integration tests.
        </p>
      </section>
      <section className="section" id="engineering">
        <h2>Two engineering problems</h2>
        <h3>Concurrent settlement sends</h3>
        <p>
          Two requests can try to send the same settlement at once. A correction
          can also try to void it while a send is in progress.
        </p>
        <p>
          The send path locks the settlement row in a database transaction and
          checks its expected status and revision before calling the delivery
          provider. A second request based on an older revision is rejected. An
          intentional resend uses a newly read revision.
        </p>
        <div className="evidence">
          <p>
            <strong>Verification:</strong> integration tests exercise two
            concurrent initial sends, send-versus-void ordering, and an
            intentional resend. The concurrent-send test checks that the
            provider callback is called once.
          </p>
          <p>
            <strong>Trade-off:</strong> the database lock is held during the
            provider call. Database rollback also cannot undo an external
            delivery. If the provider accepts a message but the result is lost,
            the outcome can be ambiguous; this mechanism does not guarantee
            exactly-once delivery.
          </p>
        </div>
        <h3>Repeated billing events</h3>
        <p>
          A past-due subscription can appear in more than one Stripe event.
          Resetting its grace deadline on each event would keep extending
          access.
        </p>
        <p>
          The billing flow opens a seven-day grace window from the subscription
          event and writes the deadline only when it is unset. Repeated events
          in the same past-due cycle retain the existing deadline; recovery
          clears it.
        </p>
        <div className="evidence">
          <p>
            <strong>Verification:</strong> PostgreSQL integration tests check
            that both subscription and entitlement deadlines are stored,
            repeated events do not extend them, recovery clears them, and stale
            events do not override newer state.
          </p>
          <p>
            <strong>Trade-off:</strong> those tests need a real database because
            the behavior depends on conditional updates. They cover those event
            sequences, rather than every possible billing-provider failure.
          </p>
        </div>
      </section>
      <section className="section" id="walkthrough">
        <h2>Try the workflow</h2>
        <p>
          The sandbox opens a sample fleet. Inspect a load’s route and status,
          then explore the fleet and settlement screens.
        </p>
        {demo.live && (
          <p>
            <a href={demo.url}>Open the Kelevo demo →</a>
          </p>
        )}
        <figure>
          <video
            controls
            preload="none"
            poster="/screenshots/kelevo-ocr-poster.png"
            width={1280}
            height={720}
            aria-label="Recorded rate-confirmation import"
            src={ocrDemo.src}
          />
          <figcaption>{ocrDemo.caption}</figcaption>
        </figure>
      </section>
      <section className="section" id="discussion">
        <h2>What I can walk through</h2>
        <p>
          The repository is private. In a technical discussion, I can explain
          the service boundaries, the tests above, and the limitations of the
          chosen approaches.
        </p>
      </section>
    </article>
  );
}
