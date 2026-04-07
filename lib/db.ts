// lib/db.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { getSupabaseClient, getSupabaseAdminClient } from './supabase'
import type { ProjectRow, ServiceRow, BlogPostRow, TeamRow, TestimonialRow } from './supabase'

function isConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// ── PROJECTS ─────────────────────────────────────────────
export async function getProjects(opts?: { featured?: boolean; status?: string }): Promise<ProjectRow[]> {
  if (!isConfigured()) return []
  const db = getSupabaseClient()
  if (!db) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q = (db as any).from('projects').select('*').order('created_at', { ascending: false })
  if (opts?.featured) q = q.eq('featured', true)
  if (opts?.status)   q = q.eq('status', opts.status)
  const { data, error } = await q
  if (error) { console.error('getProjects:', error.message); return [] }
  return (data ?? []) as ProjectRow[]
}

export async function getProject(slug: string): Promise<ProjectRow | null> {
  if (!isConfigured()) return null
  const db = getSupabaseClient()
  if (!db) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('projects').select('*').eq('slug', slug).single()
  if (error) return null
  return data as ProjectRow
}

export async function upsertProject(payload: Record<string, unknown>): Promise<ProjectRow> {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = admin as any
  const body = { ...payload, updated_at: new Date().toISOString() }
  if (payload.id) {
    const { data, error } = await db.from('projects').update(body).eq('id', payload.id).select().single()
    if (error) throw new Error(error.message)
    return data as ProjectRow
  }
  const { data, error } = await db.from('projects').insert(body).select().single()
  if (error) throw new Error(error.message)
  return data as ProjectRow
}

export async function deleteProject(id: string) {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── SERVICES ─────────────────────────────────────────────
export async function getServices(): Promise<ServiceRow[]> {
  if (!isConfigured()) return []
  const db = getSupabaseClient()
  if (!db) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('services').select('*').order('order', { ascending: true })
  if (error) { console.error('getServices:', error.message); return [] }
  return (data ?? []) as ServiceRow[]
}

export async function getService(slug: string): Promise<ServiceRow | null> {
  if (!isConfigured()) return null
  const db = getSupabaseClient()
  if (!db) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('services').select('*').eq('slug', slug).single()
  if (error) return null
  return data as ServiceRow
}

export async function upsertService(payload: Record<string, unknown>): Promise<ServiceRow> {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = admin as any
  const body = { ...payload, updated_at: new Date().toISOString() }
  if (payload.id) {
    const { data, error } = await db.from('services').update(body).eq('id', payload.id).select().single()
    if (error) throw new Error(error.message)
    return data as ServiceRow
  }
  const { data, error } = await db.from('services').insert(body).select().single()
  if (error) throw new Error(error.message)
  return data as ServiceRow
}

// ── BLOG ─────────────────────────────────────────────────
export async function getBlogPosts(opts?: { featured?: boolean; published?: boolean }): Promise<BlogPostRow[]> {
  if (!isConfigured()) return []
  const db = getSupabaseClient()
  if (!db) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let q = (db as any).from('blog_posts').select('*').order('published_at', { ascending: false })
  if (opts?.featured  !== undefined) q = q.eq('featured', opts.featured)
  if (opts?.published !== undefined) q = q.eq('published', opts.published)
  const { data, error } = await q
  if (error) { console.error('getBlogPosts:', error.message); return [] }
  return (data ?? []) as BlogPostRow[]
}

export async function getBlogPost(slug: string): Promise<BlogPostRow | null> {
  if (!isConfigured()) return null
  const db = getSupabaseClient()
  if (!db) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('blog_posts').select('*').eq('slug', slug).single()
  if (error) return null
  return data as BlogPostRow
}

export async function upsertBlogPost(payload: Record<string, unknown>): Promise<BlogPostRow> {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = admin as any
  const body = { ...payload, updated_at: new Date().toISOString() }
  if (payload.id) {
    const { data, error } = await db.from('blog_posts').update(body).eq('id', payload.id).select().single()
    if (error) throw new Error(error.message)
    return data as BlogPostRow
  }
  const { data, error } = await db.from('blog_posts').insert(body).select().single()
  if (error) throw new Error(error.message)
  return data as BlogPostRow
}

export async function deleteBlogPost(id: string) {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).from('blog_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── TEAM ─────────────────────────────────────────────────
export async function getTeam(): Promise<TeamRow[]> {
  if (!isConfigured()) return []
  const db = getSupabaseClient()
  if (!db) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('team').select('*').order('order', { ascending: true })
  if (error) { console.error('getTeam:', error.message); return [] }
  return (data ?? []) as TeamRow[]
}

export async function upsertTeamMember(payload: Record<string, unknown>): Promise<TeamRow> {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = admin as any
  if (payload.id) {
    const { data, error } = await db.from('team').update(payload).eq('id', payload.id).select().single()
    if (error) throw new Error(error.message)
    return data as TeamRow
  }
  const { data, error } = await db.from('team').insert(payload).select().single()
  if (error) throw new Error(error.message)
  return data as TeamRow
}

export async function deleteTeamMember(id: string) {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).from('team').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── TESTIMONIALS ─────────────────────────────────────────
export async function getTestimonials(): Promise<TestimonialRow[]> {
  if (!isConfigured()) return []
  const db = getSupabaseClient()
  if (!db) return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('testimonials').select('*').order('created_at', { ascending: false })
  if (error) { console.error('getTestimonials:', error.message); return [] }
  return (data ?? []) as TestimonialRow[]
}

export async function upsertTestimonial(payload: Record<string, unknown>): Promise<TestimonialRow> {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = admin as any
  if (payload.id) {
    const { data, error } = await db.from('testimonials').update(payload).eq('id', payload.id).select().single()
    if (error) throw new Error(error.message)
    return data as TestimonialRow
  }
  const { data, error } = await db.from('testimonials').insert(payload).select().single()
  if (error) throw new Error(error.message)
  return data as TestimonialRow
}

export async function deleteTestimonial(id: string) {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).from('testimonials').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// ── SETTINGS ─────────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  if (!isConfigured()) return {}
  const db = getSupabaseClient()
  if (!db) return {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any).from('settings').select('*')
  if (error) { console.error('getSettings:', error.message); return {} }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.fromEntries((data ?? []).map((s: any) => [s.key, s.value]))
}

export async function updateSettings(settings: Record<string, string>) {
  const admin = getSupabaseAdminClient()
  if (!admin) throw new Error('Supabase admin not configured')
  const rows = Object.entries(settings).map(([key, value]) => ({
    key, value, updated_at: new Date().toISOString(),
  }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin as any).from('settings').upsert(rows, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

export async function updateSetting(key: string, value: string) {
  await updateSettings({ [key]: value })
}
