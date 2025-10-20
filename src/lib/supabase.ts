import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');
const isValidKey = supabaseAnonKey && supabaseAnonKey.length > 20;

if (!isValidUrl || !isValidKey) {
  console.error('❌ Supabase credentials not configured properly');
  console.error('Please update your .env file with valid credentials:');
  console.error('- VITE_SUPABASE_URL: Your Supabase project URL');
  console.error('- VITE_SUPABASE_ANON_KEY: Your Supabase anon/public key');
  console.error('Get your credentials from: https://app.supabase.com/project/_/settings/api');
} else {
  console.log('✅ Supabase client initialized');
  console.log(`📍 Connected to: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'ai-club-news-portal',
    },
  },
});

supabase.auth.onAuthStateChange((event, session) => {
  console.log(`🔐 Auth state changed: ${event}`);
  if (session?.user) {
    console.log(`👤 User: ${session.user.email}`);
  }
});

export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('admin_profiles').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('✅ Database connection test: SUCCESS');
    return { success: true, error: null };
  } catch (error: any) {
    console.error('❌ Database connection test: FAILED', error);
    return { success: false, error: error.message };
  }
};

export const testAuth = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('✅ Auth test: SUCCESS');
    return { success: true, session, error: null };
  } catch (error: any) {
    console.error('❌ Auth test: FAILED', error);
    return { success: false, session: null, error: error.message };
  }
};
