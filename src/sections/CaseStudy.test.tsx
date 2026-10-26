import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy } from "@/sections/CaseStudy";
describe("Case study", () => {
  it("provides context, implementation examples, and an accessible walkthrough", () => {
    render(<CaseStudy />);
    expect(
      screen.getByRole("heading", { name: "Concurrent settlement sends" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Repeated billing events" }),
    ).toBeInTheDocument();
    const video = screen.getByLabelText("Recorded rate-confirmation import");
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoplay");
  });
});
