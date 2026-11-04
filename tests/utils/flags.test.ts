import { describe, expect, it } from "vitest";
import { getFlagByCountryNameMini } from "@/utils/flags";

describe("getFlagByCountryNameMini", () => {
  it("returns a flag url for a known country", () => {
    const url = getFlagByCountryNameMini("Brazil");
    expect(url).not.toBe("");
    expect(url).toMatch(/^https?:\/\//);
  });

  it("returns an empty string for an unknown country", () => {
    expect(getFlagByCountryNameMini("Atlantis")).toBe("");
  });
});
