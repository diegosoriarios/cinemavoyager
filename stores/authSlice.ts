import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";
import api from "@/utils/api";
import type { AppState } from "./store";
import type { AuthUser, Profile } from "@/types/user";

// Auth state is derived from the Supabase session: AuthProvider listens to
// supabase.auth.onAuthStateChange and dispatches sessionChanged.
export interface AuthState {
  user: AuthUser | null;
  profileStatus: "idle" | "loading" | "loaded" | "error";
  // Preferred streaming region for the "where to watch" info.
  location: string;
}

const initialState: AuthState = {
  user: null,
  profileStatus: "idle",
  location: "br",
};

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async () => {
    const { data } = await api.get<{ profile: Profile | null }>("/profile");
    return data.profile;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionChanged(state, action: { payload: User | null }) {
      state.user = action.payload ? { ...action.payload } : null;
      if (!action.payload) {
        state.profileStatus = "idle";
      }
    },
    locationChanged(state, action: { payload: string }) {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileStatus = "loaded";
        if (state.user && action.payload) {
          state.user.full_name = action.payload.full_name ?? undefined;
          state.user.avatar_url = action.payload.avatar_url ?? undefined;
          state.user.location = action.payload.location ?? undefined;
        }
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.profileStatus = "error";
      });
  },
});

export const { sessionChanged, locationChanged } = authSlice.actions;

export const selectUser = (state: AppState) => state.auth.user;

export const selectIsLoggedIn = (state: AppState) => state.auth.user !== null;

export const selectLocation = (state: AppState) => state.auth.location;

export default authSlice.reducer;
