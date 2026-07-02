import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  demo,
  features,
  heroChips,
  identity,
  links,
  loadRows,
  metrics,
  skillGroups,
  timeline,
} from "@/content/site";

describe("site content", () => {
  it("has the three hero metrics", () => {
    expect(metrics).toHaveLength(3);
    expect(metrics.map((m) => m.value)).toEqual(["0→1", "13 yrs", "100%"]);
  });

  it("has valid contact links", () => {
    expect(links.email).toContain("@");
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(links.cv).toMatch(/^\/cv\/.+\.pdf$/);
  });

  it("demo starts not-live with a case-study fallback", () => {
    expect(demo.live).toBe(false);
    expect(demo.url).toBe("https://demo.kelevo.ai");
    expect(demo.fallbackHref).toBe("#case-study");
  });

  it("has substantive section data", () => {
    expect(identity.name).toBe("Nick Kalaitzidis");
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(heroChips.length).toBeGreaterThanOrEqual(6);
    expect(loadRows).toHaveLength(4);
    expect(timeline).toHaveLength(3);
    expect(features).toHaveLength(6);
    expect(skillGroups).toHaveLength(5);
  });
});
