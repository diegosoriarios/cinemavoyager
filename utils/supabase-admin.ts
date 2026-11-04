import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key. It bypasses Row Level
// Security, so it must never be imported into client-side code.
export const createAdminClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
