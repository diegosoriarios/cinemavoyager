import { createClient } from '@supabase/supabase-js'

// Plain client for public (unauthenticated) data reads, e.g. browsing
// movies by country. Auth-scoped operations must use the cookie-based
// clients in supabase-browser / supabase-server instead.
export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
)
