import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { vi } from "vitest";

type LinkHref = string | { pathname: string; query?: Record<string, unknown> };

const serializeHref = (href: LinkHref) => {
  if (typeof href === "string") return href;
  const params = new URLSearchParams(
    href.query as Record<string, string> | undefined
  ).toString();
  return params ? `${href.pathname}?${params}` : href.pathname;
};

vi.mock("next/link", () => {
  return {
    default: ({ children, href }: { children: ReactNode; href: LinkHref }) => (
      <a href={serializeHref(href)} data-testid="mock-link">
        {children}
      </a>
    ),
  };
});
