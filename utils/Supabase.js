import { createClient } from '@supabase/supabase-js'
import keys from '../env.js'

export const supabase = createClient(keys.SUPABASE_URL, keys.SUPABASE_ANON_KEY);