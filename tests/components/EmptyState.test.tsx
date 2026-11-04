import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/EmptyState";

describe("EmptyState", () => {
  it("renders the empty message", () => {
    render(<EmptyState />);
    expect(screen.getByText(/bit empty here/i)).toBeInTheDocument();
  });

  it("links to the add movie page", () => {
    render(<EmptyState />);
    const link = screen.getByRole("link", { name: /add first movie/i });
    expect(link).toHaveAttribute("href", "/addNewMovie");
  });
});
