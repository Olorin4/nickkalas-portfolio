import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { timeline } from "@/content/site";
import { Journey } from "@/sections/Journey";

describe("Journey", () => {
  it("renders all four stops with role, org, and period", () => {
    render(<Journey />);
    const stops = screen.getAllByRole("listitem");
    expect(stops).toHaveLength(timeline.length);

    for (const [index, stop] of timeline.entries()) {
      const item = stops[index];
      expect(item).toBeDefined();
      const row = within(item!);
      expect(row.getByText(stop.role)).toBeInTheDocument();
      expect(row.getByText(stop.org)).toBeInTheDocument();
      expect(row.getByText(stop.period)).toBeInTheDocument();
    }
  });

  it("is an anchorable section", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("section#journey")).not.toBeNull();
  });
});
