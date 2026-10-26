import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { demo, screenshots } from "@/content/site";
import { Showcase } from "@/sections/Showcase";
describe("Selected work", () => {
  it("provides one screenshot and links to the demo and case study", () => {
    render(<Showcase />);
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByAltText(screenshots[0]!.alt)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore the demo" }),
    ).toHaveAttribute("href", demo.url);
    expect(screen.getByRole("link", { name: /case study/i })).toHaveAttribute(
      "href",
      "/work/kelevo",
    );
  });
  it("works without screenshots and falls back when the demo is unavailable", () => {
    render(
      <Showcase screenshotList={[]} demoState={{ ...demo, live: false }} />,
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(
      screen.getByRole("link", { name: "View the walkthrough" }),
    ).toHaveAttribute("href", demo.fallbackHref);
  });
});
