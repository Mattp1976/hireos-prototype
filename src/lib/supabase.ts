import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bczptkfbwnnhyytdrbxj.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjenB0a2Zid25uaHl5dGRyYnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDcxNjcsImV4cCI6MjA4NjQ4MzE2N30.KHMblHrjEb_8OAI8hDTtQJeZ5xrAmYlcXRF0TrK7Jz0';

export const supabase = createClient(supabaseUrl, supabaseKey);
