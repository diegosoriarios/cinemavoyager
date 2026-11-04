import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "@/stores/themeSlice";
import type { AppDispatch } from "@/stores/store";

// Applies the theme to <html> (all pages) and persists the choice.
// Reads the stored theme or the OS preference once on mount.
export default function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const stored = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    dispatch(setTheme(initial));
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("color-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
