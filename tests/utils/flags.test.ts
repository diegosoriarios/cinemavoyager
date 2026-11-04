import { describe, expect, it } from "vitest";
import {
  getCountryAlpha2ByAlpha3,
  getCountryAlpha2ByName,
  getFlagByCountryNameMini,
} from "@/utils/flags";

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

describe("getCountryAlpha2ByName", () => {
  it("returns the ISO-2 code for a known country", () => {
    expect(getCountryAlpha2ByName("Brazil")).toBe("br");
  });

  it("returns an empty string for an unknown country", () => {
    expect(getCountryAlpha2ByName("Atlantis")).toBe("");
  });
});

describe("getCountryAlpha2ByAlpha3", () => {
  it("maps an ISO-3 code to ISO-2", () => {
    expect(getCountryAlpha2ByAlpha3("BRA")).toBe("br");
  });

  it("returns an empty string for an unknown code", () => {
    expect(getCountryAlpha2ByAlpha3("XXX")).toBe("");
  });
});
