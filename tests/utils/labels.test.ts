import { describe, expect, it } from "vitest";
import { SITE_NAME } from "@/utils/labels";

describe("labels", () => {
  it("has a site name", () => {
    expect(SITE_NAME).toBeTruthy();
  });
});
