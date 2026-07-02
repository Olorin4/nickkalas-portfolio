import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "@/components/MetricCard";
import { MonoChip } from "@/components/MonoChip";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { StatusChip } from "@/components/StatusChip";

describe("SectionEyebrow", () => {
  it("renders its label", () => {
    render(<SectionEyebrow>Featured system</SectionEyebrow>);
    expect(screen.getByText("Featured system")).toBeInTheDocument();
  });
});

describe("MonoChip", () => {
  it("renders plain and accent variants", () => {
    const { rerender } = render(<MonoChip>TypeScript</MonoChip>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    rerender(<MonoChip accent>AI/OCR pipeline</MonoChip>);
    expect(screen.getByText("AI/OCR pipeline").className).toContain("amber");
  });
});

describe("StatusChip", () => {
  it("renders the label with kind-specific styling", () => {
    render(<StatusChip label="DELIVERED" kind="ok" />);
    const chip = screen.getByText("DELIVERED");
    expect(chip).toBeInTheDocument();
    expect(chip.className).toContain("status-ok");
  });
});

describe("MetricCard", () => {
  it("renders value and label", () => {
    render(<MetricCard metric={{ value: "0→1", label: "Solo build" }} />);
    expect(screen.getByText("0→1")).toBeInTheDocument();
    expect(screen.getByText("Solo build")).toBeInTheDocument();
  });
});
