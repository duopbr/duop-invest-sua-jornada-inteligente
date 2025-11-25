import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nlfpajonnkbgccaptayl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZnBham9ubmtiZ2NjYXB0YXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwODIxMDQsImV4cCI6MjA2MjY1ODEwNH0.HCXVSIXIt6DesjBMjjdVyqd7yz8QsEnMD_rzu8dDilc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
