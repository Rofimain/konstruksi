import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdminClient } from '@/lib/supabase'

const ALLOWED_TYPES = ['image/jpeg','image/png','image/webp','image/gif','image/avif']
const MAX_SIZE = 10 * 1024 * 1024

function sanitizeFolder(s: string) {
  return (s || 'misc').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'misc'
}

export async function POST(req: Request) {
  await requireAuth()
  try {
    const formData = await req.formData()
    const file   = formData.get('file') as File
    const folder = sanitizeFolder(formData.get('folder') as string)

    if (!file)                               return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Tipe file tidak didukung' }, { status: 400 })
    if (file.size > MAX_SIZE)               return NextResponse.json({ error: 'Ukuran file maks 10MB' }, { status: 400 })
    if (file.size === 0)                    return NextResponse.json({ error: 'File kosong' }, { status: 400 })

    const admin = getSupabaseAdminClient()
    if (!admin) return NextResponse.json({ error: 'Storage belum dikonfigurasi' }, { status: 503 })

    const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`
    const buffer   = Buffer.from(await file.arrayBuffer())

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (admin as any).storage.from('media').upload(safeName, buffer, {
      contentType: file.type, cacheControl: '3600', upsert: false,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = (admin as any).storage.from('media').getPublicUrl(safeName)
    return NextResponse.json({ url: data.publicUrl })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  await requireAuth()
  try {
    const { url } = await req.json()
    if (!url || !url.includes('/media/')) return NextResponse.json({ error: 'URL tidak valid' }, { status: 400 })
    const admin = getSupabaseAdminClient()
    if (admin) {
      const path = url.split('/media/')[1]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (path) await (admin as any).storage.from('media').remove([path])
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
