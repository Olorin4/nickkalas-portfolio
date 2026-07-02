import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("assembles all section anchors in order", () => {
    const { container } = render(<Home />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map(
      (el) => el.id,
    );
    expect(ids).toEqual([
      "journey",
      "kelevo",
      "case-study",
      "skills",
      "contact",
    ]);
    const header = container.querySelector("header");
    const main = container.querySelector("main");
    expect(header).not.toBeNull();
    expect(main).not.toBeNull();
    expect(
      header!.compareDocumentPosition(main!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(main!.querySelectorAll("section[id]")).toHaveLength(5);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("exposes exactly one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
