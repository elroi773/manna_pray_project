// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://manna-pray-project.supabase.co' // Supabase 프로젝트 URL
const supabaseKey = 'sb_publishable_sqcLcmJroymr_fUdVKFO2g_6zDDOUnH' // Publishable key
export const supabase = createClient(supabaseUrl, supabaseKey)
