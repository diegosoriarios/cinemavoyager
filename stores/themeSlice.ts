import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface ThemeState {
  theme: string
}

const initialState : ThemeState = {
  theme: "dark"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      const theme = state.theme === "dark" ? "light" : "dark";
      const colorTheme = state.theme === "dark" ? "dark" : "light";
      localStorage.setItem("color-theme", theme);
    
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
    
      state.theme = state.theme === "dark" ? "light" : "dark"
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.theme
      }
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: AppState) => state.theme.theme;

export default themeSlice.reducer;
