import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowUpRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Blog', description: 'Wawasan dan inspirasi dari ARKON Konstruksi.' }
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getBlogPosts({ published: true }).catch(() => [])
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => p.id !== featured?.id)

  return (
    <>
      <section className="pt-40 pb-20 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative">
          <div className="section-label mb-6">Blog & Artikel</div>
          <h1 className="font-heading text-fluid-4xl font-bold text-brand-cream mb-6">
            Wawasan <span className="text-gold-gradient">Konstruksi</span>
          </h1>
          <p className="text-brand-silver text-lg max-w-xl">Tips, tren, dan inspirasi dari para ahli kami.</p>
        </div>
      </section>

      {featured && (
        <section className="py-12 bg-brand-dark">
          <div className="container-xl">
            <div className="section-label mb-6">Artikel Pilihan</div>
            <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 overflow-hidden block">
              <div className="h-72 lg:h-auto min-h-[280px] relative overflow-hidden bg-brand-slate">
                {featured.cover_image
                  ? <img src={featured.cover_image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-dark" />
                }
                <div className="absolute inset-0 bg-card-gradient" />
                <div className="absolute top-6 left-6 section-label bg-brand-dark/80 px-2 py-1">{featured.category}</div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex gap-4 text-xs text-brand-gray mb-4">
                  <span>{formatDate(featured.published_at)}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{featured.read_time} menit</span>
                </div>
                <h2 className="font-heading text-2xl lg:text-3xl text-brand-cream group-hover:text-gold transition-colors mb-4">{featured.title}</h2>
                <p className="text-brand-silver leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  {featured.author_image
                    ? <img src={featured.author_image} alt={featured.author} className="w-8 h-8 rounded-full object-cover border border-gold/20" />
                    : <div className="w-8 h-8 rounded-full bg-brand-slate border border-gold/20 flex items-center justify-center"><span className="text-gold text-sm font-bold">{featured.author?.[0]}</span></div>
                  }
                  <span className="text-brand-silver text-sm">{featured.author}</span>
                  <span className="ml-auto text-gold text-sm flex items-center gap-1"><ArrowUpRight size={14} /> Baca</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-12 pb-24 bg-brand-dark">
        <div className="container-xl">
          {rest.length > 0 && <div className="section-label mb-6">Semua Artikel</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 overflow-hidden block">
                <div className="h-48 relative overflow-hidden bg-brand-slate">
                  {post.cover_image
                    ? <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-dark" />
                  }
                  <div className="absolute inset-0 bg-card-gradient" />
                  <div className="absolute top-4 left-4 section-label text-[10px] bg-brand-dark/80 px-2 py-1">{post.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex gap-3 text-xs text-brand-gray mb-3">
                    <span>{formatDate(post.published_at)}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{post.read_time} mnt</span>
                  </div>
                  <h2 className="font-heading text-lg text-brand-cream group-hover:text-gold transition-colors mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-brand-silver text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-16 text-brand-gray">Belum ada artikel yang dipublikasikan.</div>
          )}
        </div>
      </section>
    </>
  )
}
