import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/Card";
import type { CardProps } from "@/types/props";

const mockMovie: CardProps = {
  id: "123",
  name: "City of God",
  image: "https://example.com/poster.jpg",
  genres: "Crime,Drama",
  sinopsis:
    "Two boys growing up in a violent neighborhood of Rio de Janeiro take very different paths, one becoming a criminal and the other a photographer documenting the violence around him.",
};

describe("Card", () => {
  it("renders the movie name", () => {
    render(<Card {...mockMovie} />);
    expect(screen.getByText("City of God")).toBeInTheDocument();
  });

  it("clamps long sinopsis to three lines", () => {
    render(<Card {...mockMovie} />);
    const text = screen.getByText(/Two boys growing up/);
    expect(text).toHaveClass("line-clamp-3");
  });

  it("renders genre chips", () => {
    render(<Card {...mockMovie} />);
    expect(screen.getByText("Crime")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
  });

  it("links to the movie page with movie data in query", () => {
    render(<Card {...mockMovie} />);
    const link = screen.getByTestId("mock-link");
    const href = link.getAttribute("href") ?? "";
    expect(href.startsWith("/movie/City of God?")).toBe(true);
    expect(href).toContain("id=123");
  });
});
