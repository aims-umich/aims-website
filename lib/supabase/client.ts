import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SITE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
