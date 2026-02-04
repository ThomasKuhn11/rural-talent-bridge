import { createClient } from "@supabase/supabase-js";

// Supabase connection using external project credentials
const SUPABASE_URL = "https://khyxepaudvxxcpczyqqu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UZBvRWeFvfHy9emwnptJbw_1u7s2M2i";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_EXTERNAL_SUPABASE_URL and VITE_EXTERNAL_SUPABASE_ANON_KEY.",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
