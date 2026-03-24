// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export type Message = {
  id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

export type User = {
  id: string;
  username: string;
  created_at: string;
};