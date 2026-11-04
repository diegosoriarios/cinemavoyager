import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "./store";

export type Theme = "dark" | "light";

export interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: "dark"
};

// Pure slice: applying the class to <html> and persisting to
// localStorage is handled by the ThemeInitializer component.
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme(state, action: { payload: Theme }) {
      state.theme = action.payload;
    },
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state: AppState) => state.theme.theme;

export default themeSlice.reducer;
