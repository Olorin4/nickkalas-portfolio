import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { features } from "@/content/site";
import { Showcase } from "@/sections/Showcase";

describe("Showcase", () => {
  it("renders the product intro and all six features", () => {
    render(<Showcase />);
    expect(
      screen.getByText("Transportation Management System — SaaS"),
    ).toBeInTheDocument();
    for (const feature of features) {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    }
  });

  it("renders the loads board panel", () => {
    render(<Showcase />);
    expect(screen.getByText("Loads board")).toBeInTheDocument();
  });

  it("renders no screenshot images while the list is empty", () => {
    render(<Showcase />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders registered screenshots as console panels", () => {
    render(
      <Showcase
        screenshotList={[
          {
            src: "/screenshots/loads-board.png",
            title: "Loads board",
            alt: "Kelévo loads board showing active loads",
          },
        ]}
      />,
    );
    expect(
      screen.getByAltText("Kelévo loads board showing active loads"),
    ).toBeInTheDocument();
  });

  it("is an anchorable section", () => {
    const { container } = render(<Showcase />);
    expect(container.querySelector("section#kelevo")).not.toBeNull();
  });

  it("links the demo CTA to the case study when not live", () => {
    render(<Showcase />);
    expect(
      screen.getByRole("link", { name: /demo — launching soon/i }),
    ).toHaveAttribute("href", "#case-study");
  });
});
