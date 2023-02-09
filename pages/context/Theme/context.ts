import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const DarkModeContext = createContext('dark');
export const SetDarkModeContext = createContext(() => {});

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}

export function useSetDarkModeContext() {
  return useContext(SetDarkModeContext);
}
