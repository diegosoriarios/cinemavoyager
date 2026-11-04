import { describe, expect, it } from "vitest";
import type { User } from "@supabase/supabase-js";
import authReducer, {
  fetchProfile,
  locationChanged,
  sessionChanged,
} from "@/stores/authSlice";

const mockUser = {
  id: "u1",
  email: "test@example.com",
} as unknown as User;

describe("authSlice", () => {
  it("sets the user on sessionChanged", () => {
    const state = authReducer(undefined, sessionChanged(mockUser));
    expect(state.user?.email).toBe("test@example.com");
    expect(state.user?.id).toBe("u1");
  });

  it("clears the user and resets profile status on sign out", () => {
    let state = authReducer(undefined, sessionChanged(mockUser));
    state = authReducer(state, fetchProfile.fulfilled(null, "req1"));
    expect(state.profileStatus).toBe("loaded");

    state = authReducer(state, sessionChanged(null));
    expect(state.user).toBeNull();
    expect(state.profileStatus).toBe("idle");
  });

  it("merges fetched profile fields into the user", () => {
    let state = authReducer(undefined, sessionChanged(mockUser));
    state = authReducer(
      state,
      fetchProfile.fulfilled(
        { full_name: "Diego", avatar_url: "avatar.png", location: "us" },
        "req1"
      )
    );
    expect(state.user?.full_name).toBe("Diego");
    expect(state.user?.avatar_url).toBe("avatar.png");
    expect(state.user?.location).toBe("us");
  });

  it("keeps the user when profile fetch returns null", () => {
    let state = authReducer(undefined, sessionChanged(mockUser));
    state = authReducer(state, fetchProfile.fulfilled(null, "req1"));
    expect(state.user).not.toBeNull();
  });

  it("changes location", () => {
    const state = authReducer(undefined, locationChanged("us"));
    expect(state.location).toBe("us");
  });
});
