// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  const url     = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) return null
  return createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export interface ProjectRow {
  id: string; created_at: string; updated_at: string
  title: string; subtitle: string; slug: string; category: string
  location: string; area: string; duration: string; year: number
  status: 'completed' | 'ongoing' | 'upcoming'; client: string
  description: string; full_description: string; cover_image: string | null
  images: string[]; tags: string[]; featured: boolean
  value: string | null; architect: string | null
}

export interface ServiceRow {
  id: string; created_at: string; updated_at: string
  title: string; subtitle: string; slug: string
  description: string; full_description: string; icon: string
  cover_image: string | null; features: string[]
  process: { step: number; title: string; description: string }[]
  featured: boolean; order: number
}

export interface BlogPostRow {
  id: string; created_at: string; updated_at: string
  title: string; slug: string; excerpt: string; content: string
  author: string; author_image: string | null; category: string
  tags: string[]; cover_image: string | null; published_at: string
  featured: boolean; read_time: number; published: boolean
}

export interface TeamRow {
  id: string; created_at: string; name: string; role: string
  bio: string; image: string | null; order: number
  linkedin: string | null; instagram: string | null
}

export interface TestimonialRow {
  id: string; created_at: string; name: string; role: string
  company: string; content: string; rating: number
  image: string | null; project_id: string | null; featured: boolean
}
