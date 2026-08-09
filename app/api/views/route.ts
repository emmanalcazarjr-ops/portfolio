import { NextResponse } from 'next/server'
import { getAdminClient, isSupabaseConfigured } from '@/lib/supabase-admin'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ total: 0, today: 0 })
  }

  const client = getAdminClient()
  if (!client) {
    return NextResponse.json({ total: 0, today: 0 })
  }

  try {
    const { count: total } = await client
      .from('page_views')
      .select('id', { count: 'exact', head: true })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { count: today } = await client
      .from('page_views')
      .select('id', { count: 'exact', head: true })
      .gte('viewed_at', todayStart.toISOString())

    return NextResponse.json({ total: total ?? 0, today: today ?? 0 })
  } catch {
    return NextResponse.json({ total: 0, today: 0 })
  }
}

export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ total: 0, today: 0 })
  }

  const client = getAdminClient()
  if (!client) {
    return NextResponse.json({ total: 0, today: 0 })
  }

  try {
    await client.from('page_views').insert({ path: '/' })

    const { count: total } = await client
      .from('page_views')
      .select('id', { count: 'exact', head: true })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { count: today } = await client
      .from('page_views')
      .select('id', { count: 'exact', head: true })
      .gte('viewed_at', todayStart.toISOString())

    return NextResponse.json({ total: total ?? 0, today: today ?? 0 })
  } catch {
    return NextResponse.json({ total: 0, today: 0 })
  }
}
