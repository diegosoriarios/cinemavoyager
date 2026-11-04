import { createClient } from '@supabase/supabase-js'

// NOTE: Phase 3 will split this into a cookie-aware browser client
// (@supabase/ssr createBrowserClient) and a server client that reads
// the request cookies, so API routes can validate the session user.
export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
