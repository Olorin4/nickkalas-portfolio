import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { links } from "@/content/site";
import { Contact } from "@/sections/Contact";
import { Skills } from "@/sections/Skills";
describe("Background", () => {
  it("keeps the operations history distinguishable from development", () => {
    render(<Skills />);
    expect(screen.getByText(/Apr 2016 – Jul 2017/)).toBeInTheDocument();
    expect(screen.getByText(/Aug 2017 – Nov 2020/)).toBeInTheDocument();
  });
});
describe("Contact", () => {
  it("exposes working email, profile, and download links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      `mailto:${links.email}`,
    );
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute(
      "download",
    );
    for (const name of ["GitHub", "LinkedIn"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "rel",
        "noopener noreferrer",
      );
    }
  });
});
