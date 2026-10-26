import Link from "next/link";
import { identity, links } from "@/content/site";
export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="site-name">
          {identity.name}
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#journey">Experience</Link>
          <Link href="/#kelevo">Work</Link>
          <a href={links.cv}>CV</a>
        </nav>
      </header>
    </>
  );
}
