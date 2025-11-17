import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://luozpkidddegpowqytey.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1b3pwa2lkZGRlZ3Bvd3F5dGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODUxNjQsImV4cCI6MjA3MzU2MTE2NH0.POfWhooXtr2Gg4MOBh8Sy3uCtLmZptul9Y3M1kvKP_o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
