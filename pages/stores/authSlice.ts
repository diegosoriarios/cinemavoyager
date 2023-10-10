import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import api from "../utils/api";

export interface AuthState {
  isLoggedIn: Boolean,
  isLoginPending: Boolean,
  loginError: Boolean | null,
  location: string,
  user: any,
}

const initialState : AuthState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  location: "br",
  user: null,
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (payload, next) => {
    try {
      const { data } = await api.post(
        "/login",
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const {
        data: { profile },
      } = await api.get("/profile", { params: { user: data.user.id } });
  
      const initialValues = {
        name: profile.full_name,
        avatar_url: profile.avatar_url,
        location: profile.location,
      }

      const value = {
        error: data.error,
        isLoggedIn: data.isLoggedIn,
        user: {
          ...data.user,
          ...initialValues,
        }
      }

      return value;
    } catch (e) {
      return null;
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (email) => {
    const { data } = await api.post(
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
    const { data } = await api.get("/login/isLoggedIn", {
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
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload
    },
    saveUser(state, action) {
      console.log(action);
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
        state.user= action.payload.user;
        state.isLoggedIn= action.payload.isLoggedIn;
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
