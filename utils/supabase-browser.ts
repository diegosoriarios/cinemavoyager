import { createBrowserClient } from '@supabase/ssr'

// Browser client: session is stored in cookies so the server
// (middleware + API routes) can read and validate it.
export default createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
