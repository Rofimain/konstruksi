import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getBlogPosts, upsertBlogPost, deleteBlogPost } from '@/lib/db'

export async function GET() {
  await requireAuth()
  try {
    return NextResponse.json(await getBlogPosts())
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
export async function POST(req: Request) {
  await requireAuth()
  try {
    const body = await req.json()
    return NextResponse.json(await upsertBlogPost(body))
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
export async function DELETE(req: Request) {
  await requireAuth()
  try {
    const { id } = await req.json()
    await deleteBlogPost(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
