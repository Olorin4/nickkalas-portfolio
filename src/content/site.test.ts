import { describe, expect, it } from "vitest";
import { demo, links, timeline } from "@/content/site";
describe("Portfolio content", () => {
  it("keeps public contact and document links usable", () => {
    expect(links.email).toContain("@");
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toBe(
      "https://www.linkedin.com/in/nick-kalas-93753841b",
    );
    expect(links.cv).toMatch(/^\/cv\/.+\.pdf$/);
  });
  it("preserves the demo entry route and a separate walkthrough fallback", () => {
    expect(demo.url).toBe("https://tms.kelevo.ai/#/demo?mode=sandbox");
    expect(demo.fallbackHref).toBe("/work/kelevo#walkthrough");
  });
  it("preserves the established technical experience dates", () => {
    expect(timeline.map((item) => item.period)).toEqual([
      "Oct 2025 – Present",
      "Jan 2021 – Sep 2025",
    ]);
  });
});
