import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadsBoard } from "@/components/LoadsBoard";
import { loadRows } from "@/content/site";

describe("LoadsBoard", () => {
  it("renders every load row with id, lane, and status chip", () => {
    render(<LoadsBoard />);
    for (const row of loadRows) {
      expect(screen.getByText(row.id)).toBeInTheDocument();
      expect(screen.getByText(row.lane)).toBeInTheDocument();
      expect(screen.getByText(row.status)).toBeInTheDocument();
    }
  });

  it("shows the panel title and active count", () => {
    render(<LoadsBoard />);
    expect(screen.getByText("Loads board")).toBeInTheDocument();
    expect(screen.getByText(`${loadRows.length} active`)).toBeInTheDocument();
  });
});
