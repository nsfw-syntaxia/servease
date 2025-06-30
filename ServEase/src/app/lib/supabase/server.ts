import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// This is the one and only server-side client creator.
export function createClient() {
  const cookieStore = cookies()

  // We return a new Supabase client configured for server-side rendering.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // The get method now correctly reads from the cookie store.
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // The set method is for server actions to update the cookie.
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // This can be ignored on Server Components
          }
        },
        // The remove method is for server actions to delete the cookie.
        remove(name: string, options: CookieOptions) {
          try {
            // In a Server Component, this would be `cookieStore.set({ name, value: '', ...options })`
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // This can be ignored on Server Components
          }
        },
      },
    }
  )
}