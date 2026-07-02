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
    expect(screen.getByText("TypeScript").className).toContain("ink-400");
    rerender(<MonoChip accent>AI/OCR pipeline</MonoChip>);
    expect(screen.getByText("AI/OCR pipeline").className).toContain("amber");
  });
});

describe("StatusChip", () => {
  it.each([
    ["DELIVERED", "ok", "status-ok"],
    ["IN-TRANSIT", "warn", "amber-500"],
    ["TENDERED", "info", "status-info"],
    ["PLAN", "muted", "ink-400"],
  ] as const)("renders %s with %s styling", (label, kind, token) => {
    render(<StatusChip label={label} kind={kind} />);
    expect(screen.getByText(label).className).toContain(token);
  });
});

describe("MetricCard", () => {
  it("renders value and label", () => {
    render(<MetricCard metric={{ value: "0→1", label: "Solo build" }} />);
    expect(screen.getByText("0→1")).toBeInTheDocument();
    expect(screen.getByText("Solo build")).toBeInTheDocument();
  });
});
