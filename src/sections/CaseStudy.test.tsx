import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "@/sections/CaseStudy";

describe("CaseStudy", () => {
  it("renders the four sub-blocks", () => {
    render(<CaseStudy />);
    expect(
      screen.getByRole("heading", { name: /the problem/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /architecture/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /hard decisions/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /outcomes/i }),
    ).toBeInTheDocument();
  });

  it("anchors at #case-study (the demo-fallback CTA target)", () => {
    const { container } = render(<CaseStudy />);
    expect(container.querySelector("section#case-study")).not.toBeNull();
  });
});
