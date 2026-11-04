import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { User } from "@supabase/supabase-js";
import api from "@/utils/api";
import type { AppState } from "./store";
import type { AuthUser, Profile } from "@/types/user";

export interface AuthState {
  isLoggedIn: boolean;
  isLoginPending: boolean;
  loginError: boolean | null;
  location: string;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  location: "br",
  user: null,
};

type FetchLoginPayload = { email: string; password: string };

type FetchLoginResult = {
  error: string | null;
  isLoggedIn: boolean;
  user: AuthUser;
} | null;

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (payload: FetchLoginPayload): Promise<FetchLoginResult> => {
    try {
      const { data } = await api.post<{
        user: User;
        isLoggedIn: boolean;
        error: string | null;
      }>("/login", {
        email: payload.email,
        password: payload.password,
      });

      const {
        data: { profile },
      } = await api.get<{ profile: Profile | null }>("/profile", {
        params: { user: data.user.id },
      });

      const profileValues = {
        full_name: profile?.full_name ?? undefined,
        avatar_url: profile?.avatar_url ?? undefined,
        location: profile?.location ?? undefined,
      }

      return {
        error: data.error,
        isLoggedIn: data.isLoggedIn,
        user: {
          ...data.user,
          ...profileValues,
        },
      }
    } catch (e) {
      return null;
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (email: string) => {
    const { data } = await api.post<{ isLoggedIn: boolean }>(
      "/login/logout",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
)

export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async () => {
    const { data } = await api.get<{
      user: User | null;
      isLoggedIn: boolean;
      error: string | null;
    }>("/login/isLoggedIn", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return data;
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: { payload: boolean }) {
      state.isLoggedIn = action.payload
    },
    saveUser(state, action: { payload: AuthUser | null }) {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (!action.payload) {
        state.isLoggedIn = false;
        state.loginError = true;
        state.user = null;
        return;
      }
      state.loginError = false;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    }).addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.isLoginPending = action.payload.isLoggedIn;
        state.loginError = null;
        state.user = null;
    }).addCase(checkLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = action.payload.isLoggedIn;
    });
  }
});

export const { setIsLoggedIn, saveUser } = authSlice.actions;

export const selectUser = (state: AppState) => state.auth.user;

export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;

export const selectIsLoggedInError = (state: AppState) => state.auth.loginError;

export const selectIsLoggedInPending = (state: AppState) => state.auth.isLoginPending;

export const selectLocation = (state: AppState) => state.auth.location;

export default authSlice.reducer;
