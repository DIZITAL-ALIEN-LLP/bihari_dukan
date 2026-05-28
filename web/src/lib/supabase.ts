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

// Helper to get current user ID (mocked for now if not logged in)
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    // Fetch profile from our table to get the role
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return {
      ...user,
      profile: profile || { role: 'owner', name: user.email?.split('@')[0] } // Default fallback
    };
  } catch {
    // Fallback for demo mode
    return {
      id: 'd3b07384-d990-4395-9056-b054848074d1',
      email: 'demo@biharikirana.com',
      user_metadata: { name: 'Demo Owner' },
      profile: { role: 'owner', name: 'Demo Owner' }
    };
  }
};
