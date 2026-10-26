import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { identity, links } from "@/content/site";
import { Hero } from "@/sections/Hero";
describe("Hero", () => {
  it("offers direct access to the CV and contact details", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: identity.name }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute(
      "href",
      links.cv,
    );
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      `mailto:${links.email}`,
    );
  });
});
