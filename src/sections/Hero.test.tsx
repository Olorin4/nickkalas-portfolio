import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { identity, metrics } from "@/content/site";
import { Hero } from "@/sections/Hero";

describe("Hero", () => {
  it("renders name, role, tagline, pill, and metrics", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: identity.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(/founding software engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/open to work/i)).toBeInTheDocument();
    for (const metric of metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
    }
  });

  it("links the default CTA to the live Kelevo Lite demo", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /view live demo/i });
    expect(cta).toHaveAttribute("href", "https://lite.kelevo.ai/#/demo");
  });

  it("falls back to the case study when not live", () => {
    render(
      <Hero
        demoState={{
          live: false,
          url: "https://lite.kelevo.ai/#/demo",
          fallbackHref: "#case-study",
        }}
      />,
    );
    const cta = screen.getByRole("link", { name: /demo — launching soon/i });
    expect(cta).toHaveAttribute("href", "#case-study");
  });
});
