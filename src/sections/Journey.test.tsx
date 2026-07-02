import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { timeline } from "@/content/site";
import { Journey } from "@/sections/Journey";

describe("Journey", () => {
  it("renders all three stops with role, org, and period", () => {
    render(<Journey />);
    for (const stop of timeline) {
      expect(screen.getByText(stop.role)).toBeInTheDocument();
      expect(screen.getByText(stop.org)).toBeInTheDocument();
      expect(screen.getByText(stop.period)).toBeInTheDocument();
    }
  });

  it("is an anchorable section", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("section#journey")).not.toBeNull();
  });
});
