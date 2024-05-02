import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://sdhwzkrvwyagdfeanxcw.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkaHd6a3J2d3lhZ2RmZWFueGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjEyMTcsImV4cCI6MjAyNzk5NzIxN30.rm645j0N7o_1koempBLkPjnpjYpw6j2wU8Sq8zH1VCI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
