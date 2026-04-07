import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { BlogPostRow } from '@/lib/supabase'
import { blogPosts as staticPosts } from '@/data'
import { formatDate } from '@/lib/utils'

interface Props {
  posts?: BlogPostRow[]
}

export function BlogPreviewSection({ posts }: Props) {
  const items = posts && posts.length > 0
    ? posts.slice(0, 3)
    : staticPosts.filter(p => p.featured).slice(0, 3).map(p => ({
        ...p,
        cover_image: null,
        author_image: null,
        published_at: p.publishedAt,
        read_time: p.readTime,
        full_description: '',
        published: true,
        created_at: '',
        updated_at: '',
      })) as any[]

  if (items.length === 0) return null

  return (
    <section className="py-28 bg-brand-black relative">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="section-label mb-4">Wawasan & Inspirasi</div>
            <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream">
              Blog & <span className="text-gold-gradient">Artikel</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-gold text-sm font-medium group">
            <span>Semua Artikel</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 overflow-hidden block">
              <div className="h-48 relative overflow-hidden bg-brand-slate">
                {post.cover_image
                  ? <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-dark" />
                }
                <div className="absolute inset-0 bg-card-gradient" />
                <div className="absolute top-4 left-4">
                  <span className="section-label text-[10px] bg-brand-dark/80 px-2 py-1">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-brand-gray mb-3">
                  <span>{formatDate(post.published_at || post.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{post.read_time || post.readTime} menit</span>
                </div>
                <h3 className="font-heading text-lg text-brand-cream group-hover:text-gold transition-colors mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-brand-silver text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
