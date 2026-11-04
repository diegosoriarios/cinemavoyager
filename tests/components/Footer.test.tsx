import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/pages/components/Footer";
import { SITE_NAME } from "@/utils/labels";

describe("Footer", () => {
  it("renders the site name", () => {
    render(<Footer />);
    const siteNameMatches = screen.getAllByText(SITE_NAME);
    expect(siteNameMatches.length).toBeGreaterThan(0);
  });

  it("renders nav links", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
