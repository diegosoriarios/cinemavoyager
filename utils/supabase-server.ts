import { createServerClient, type CookieOptions } from '@supabase/ssr'
import cookie from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

// Server client for Next.js API routes: reads the session from the
// request cookies and can write refreshed cookies back on the response.
export default function createApiClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(req.cookies ?? {}).map(([name, value]) => ({
            name,
            value: value as string,
          }))
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const serialized = cookie.serialize(name, value, options)
            const existing = res.getHeader('Set-Cookie')
            const current = existing
              ? Array.isArray(existing)
                ? existing.map(String)
                : [String(existing)]
              : []
            res.setHeader('Set-Cookie', [...current, serialized])
          })
        },
      },
    }
  )
}
