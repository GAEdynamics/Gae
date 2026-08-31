import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export type QuoteStatus = 'novo' | 'em_contato' | 'convertido' | 'arquivado';

export interface QuoteRequest {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  status?: QuoteStatus;
  created_at?: string;
}
