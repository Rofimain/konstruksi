import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSettings, updateSettings } from '@/lib/db'

export async function GET() {
  try {
    return NextResponse.json(await getSettings())
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
export async function POST(req: Request) {
  await requireAuth()
  try {
    const body = await req.json()
    await updateSettings(body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
