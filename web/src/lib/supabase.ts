import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we are using real credentials
export const isSupabaseConfigured = 
  supabaseUrl !== '' && 
  supabaseAnonKey !== '' && 
  supabaseUrl !== 'https://placeholder.supabase.co';

// Prevent crash if env vars are missing
if (!isSupabaseConfigured) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase credentials missing or invalid. Running in Demo Mode with mock data.');
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
