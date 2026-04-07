import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdminClient } from '@/lib/supabase'

export async function GET() {
  await requireAuth()
  try {
    const admin = getSupabaseAdminClient()
    if (!admin) return NextResponse.json([], { status: 200 })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (admin as any).storage.from('media').list('', {
      limit: 500, sortBy: { column: 'created_at', order: 'desc' },
    })

    if (error) return NextResponse.json([], { status: 200 })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files = (data || []).filter((f: any) => f.name !== '.emptyFolderPlaceholder')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((f: any) => ({
        name:       f.name,
        url:        `${supabaseUrl}/storage/v1/object/public/media/${f.name}`,
        size:       f.metadata?.size ?? 0,
        created_at: f.created_at ?? '',
      }))

    return NextResponse.json(files)
  } catch (e) {
    console.error('media list error:', e)
    return NextResponse.json([], { status: 200 })
  }
}
