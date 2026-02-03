import { createClient } from '@supabase/supabase-js';

// These are loaded from secrets - user must configure their external Supabase project
const SUPABASE_URL = import.meta.env.EXTERNAL_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.EXTERNAL_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase configuration. Please set EXTERNAL_SUPABASE_URL and EXTERNAL_SUPABASE_ANON_KEY secrets.');
}

export const supabase = createClient(
  SUPABASE_URL || '',
  SUPABASE_ANON_KEY || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
