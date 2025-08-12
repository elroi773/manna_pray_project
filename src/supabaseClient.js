// src/supabaseClient.js
//key 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwb3ZmZ3Jxbmxiam90ZHJ2ZHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjU2MDAsImV4cCI6MjA3MDU0MTYwMH0.Tw8JKMJ-g5tyxApGApdryoIzK-IpUuTVTSCLvpZDh14
//url 
//https://zpovfgrqnlbjotdrvdya.supabase.co


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpovfgrqnlbjotdrvdya.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwb3ZmZ3Jxbmxiam90ZHJ2ZHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjU2MDAsImV4cCI6MjA3MDU0MTYwMH0.Tw8JKMJ-g5tyxApGApdryoIzK-IpUuTVTSCLvpZDh14'

export const supabase = createClient(supabaseUrl, supabaseKey)  // 여기 변수명을 맞춰주세요!
