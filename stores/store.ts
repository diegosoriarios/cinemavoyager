import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { themeSlice } from "./themeSlice";
import { persistReducer, persistStore, type Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeConfiguredStore> & {
  __persistor?: Persistor;
};

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", "theme"],
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    (store as AppStore).__persistor = persistStore(store);
    return store;
  }
};

export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
