import type { User } from "@supabase/supabase-js";

export type Profile = {
  full_name: string | null;
  avatar_url: string | null;
  location: string | null;
};

// The user held in state: the Supabase auth user merged with
// profile fields fetched from the profiles table.
export type AuthUser = User & Partial<Profile>;
