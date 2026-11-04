import { useLocalStorage } from "../utils/localStorage";

export function useTheme() {
  return useLocalStorage('theme', 'dark');
}