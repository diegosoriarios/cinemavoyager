import { createSlice, type AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { AppState } from "./store";

export type Theme = "dark" | "light";

export interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: "dark"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const theme: Theme = state.theme === "dark" ? "light" : "dark";
      const colorTheme: Theme = state.theme === "dark" ? "dark" : "light";
      localStorage.setItem("color-theme", theme);

      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      state.theme = theme
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.theme
      }
    })
  }
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: AppState) => state.theme.theme;

export default themeSlice.reducer;
