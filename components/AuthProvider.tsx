import { useEffect } from "react";
import { useDispatch } from "react-redux";
import supabase from "@/utils/supabase-browser";
import { fetchProfile, sessionChanged } from "@/stores/authSlice";
import type { AppDispatch } from "@/stores/store";

// Keeps the redux auth state in sync with the Supabase session.
// The session itself lives in cookies managed by Supabase.
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(sessionChanged(session?.user ?? null));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch(sessionChanged(session?.user ?? null));

      if (
        session?.user &&
        (event === "INITIAL_SESSION" || event === "SIGNED_IN")
      ) {
        dispatch(fetchProfile());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
