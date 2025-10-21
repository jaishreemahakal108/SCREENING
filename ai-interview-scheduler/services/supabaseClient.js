import { createClient } from '@supabase/supabase-js'

// Supabase URL
const supabaseURL=process.env.NEXT_PUBLIC_SUPABASE_URL;

// Supabase Anon Key
const supabaseAnonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseURL,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,        // ✅ ensures session is saved in localStorage
      autoRefreshToken: true,      // ✅ refreshes tokens automatically
      detectSessionInUrl: true,    // ✅ needed for OAuth redirect callback
    },
  }
)
