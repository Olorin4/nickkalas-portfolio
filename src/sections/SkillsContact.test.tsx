import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { links, skillGroups } from "@/content/site";
import { Contact } from "@/sections/Contact";
import { Skills } from "@/sections/Skills";

describe("Skills", () => {
  it("renders every group label and every skill chip", () => {
    render(<Skills />);
    for (const group of skillGroups) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const skill of group.skills) {
        expect(screen.getByText(skill)).toBeInTheDocument();
      }
    }
  });
});

describe("Contact", () => {
  it("renders email, GitHub, LinkedIn, and CV download links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${links.email}`,
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      links.github,
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      links.linkedin,
    );
    const cv = screen.getByRole("link", { name: /download cv/i });
    expect(cv).toHaveAttribute("href", links.cv);
    expect(cv).toHaveAttribute("download");
  });
});
