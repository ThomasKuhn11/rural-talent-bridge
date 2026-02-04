import { createClient } from "@supabase/supabase-js";

// Supabase connection using external project credentials
const SUPABASE_URL = "https://khyxepaudvxxcpczyqqu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXhlcGF1ZHZ4eGNwY3p5cXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDE2ODksImV4cCI6MjA4NTcxNzY4OX0.94QXo_de7g5T6azat1Bji0R8FUM7o0uTdONAwTQnSy8";

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
