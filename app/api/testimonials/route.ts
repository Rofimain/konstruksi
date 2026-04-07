import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getTestimonials, upsertTestimonial, deleteTestimonial } from '@/lib/db'

export async function GET() {
  try {
    return NextResponse.json(await getTestimonials())
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
export async function POST(req: Request) {
  await requireAuth()
  try {
    const body = await req.json()
    return NextResponse.json(await upsertTestimonial(body))
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
export async function DELETE(req: Request) {
  await requireAuth()
  try {
    const { id } = await req.json()
    await deleteTestimonial(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
