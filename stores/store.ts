import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { themeSlice } from "./themeSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
