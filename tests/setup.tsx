import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { vi } from "vitest";

vi.mock("next/link", () => {
  return {
    default: ({ children, href }: { children: ReactNode; href: string }) => (
      <a href={href} data-testid="mock-link">
        {children}
      </a>
    ),
  };
});
