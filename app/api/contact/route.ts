import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient, isSupabaseConfigured } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 503 })
  }

  const client = getAdminClient()
  if (!client) {
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 503 })
  }

  try {
    const body = await req.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'All fields are required' }, { status: 400 })
    }

    const { data, error } = await client
      .from('leads')
      .insert({ name, email, source: 'portfolio-contact', message })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }
}
