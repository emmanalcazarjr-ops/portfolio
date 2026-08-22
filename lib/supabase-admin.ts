import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.SUPABASE_URL
// Automatically point to active shared-backend project if env var is missing or points to legacy ref
const url =
  !rawUrl || rawUrl.includes('dzjklgrtpssflsygxnde') || rawUrl.includes('thzzejnnezophtyexmap')
    ? 'https://hulyouteasfuetiqlacq.supabase.co'
    : rawUrl

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function isSupabaseConfigured() {
  return Boolean(url && serviceKey)
}

export function getAdminClient() {
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}
