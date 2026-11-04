import { describe, expect, it } from "vitest";
import { buildPosterUrl, mapDiscoverResult } from "@/utils/tmdb";

const genreMap = { 28: "Action", 12: "Adventure" };

const baseResult = {
  id: 446159,
  title: "Bacurau",
  poster_path: "/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
  release_date: "2019-08-29",
  genre_ids: [28, 12],
  overview: "A Brazilian western.",
  vote_average: 7.631,
};

describe("buildPosterUrl", () => {
  it("builds a TMDB poster url", () => {
    expect(buildPosterUrl("/poster.jpg")).toBe(
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
  });

  it("returns an empty string without a poster", () => {
    expect(buildPosterUrl(null)).toBe("");
  });
});

describe("mapDiscoverResult", () => {
  it("maps a TMDB result to a movie row", () => {
    const row = mapDiscoverResult(baseResult, genreMap, "BRA");

    expect(row).toMatchObject({
      tmdb_id: 446159,
      name: "Bacurau",
      image: "https://image.tmdb.org/t/p/w500/tBa4zMGzZUco26XT3WfZZCwQ76i.jpg",
      year: 2019,
      genres: "Action,Adventure",
      country: "BRA",
      sinopsis: "A Brazilian western.",
      rating: 7.631,
    });
  });

  it("returns null when there is no poster", () => {
    expect(
      mapDiscoverResult({ ...baseResult, poster_path: null }, genreMap, "BRA")
    ).toBeNull();
  });

  it("drops genre ids that are not in the map", () => {
    const row = mapDiscoverResult(
      { ...baseResult, genre_ids: [28, 999] },
      genreMap,
      "BRA"
    );

    expect(row?.genres).toBe("Action");
  });

  it("handles missing optional fields", () => {
    const row = mapDiscoverResult(
      {
        id: 1,
        title: "Unknown",
        poster_path: "/x.jpg",
      },
      genreMap,
      "BRA"
    );

    expect(row).toMatchObject({
      year: null,
      genres: "",
      sinopsis: "",
      rating: null,
    });
  });
});
