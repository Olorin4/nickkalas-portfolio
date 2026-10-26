import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import KelevoCaseStudy from "@/app/work/kelevo/page";

describe("Portfolio pages", () => {
  it("makes the CV accessible before the experience and work sections", () => {
    const { container } = render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const cv = screen.getAllByRole("link", { name: "Download CV" })[0]!;
    expect(
      cv.compareDocumentPosition(container.querySelector("#journey")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /engineering case study/i }),
    ).toHaveAttribute("href", "/work/kelevo");
    expect(container.querySelector("#engineering")).toBeNull();
  });
  it("keeps navigation and skip links usable on the case-study page", () => {
    const { container } = render(<KelevoCaseStudy />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main");
    expect(container.querySelector("main#main")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: /back to selected work/i }),
    ).toHaveAttribute("href", "/#kelevo");
  });
  for (const [name, Page] of [
    ["home", Home],
    ["case study", KelevoCaseStudy],
  ] as const) {
    it(`${name} has no axe violations`, async () => {
      const { container } = render(<Page />);
      expect((await axe(container)).violations).toEqual([]);
    });
  }
});
