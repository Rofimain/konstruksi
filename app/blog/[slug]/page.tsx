import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Calendar, Tag, ArrowUpRight } from 'lucide-react'
import { getBlogPost, getBlogPosts } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getBlogPosts({ published: true }).catch(() => [])
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getBlogPost(params.slug),
    getBlogPosts({ published: true }).catch(() => []),
  ])
  if (!post) notFound()
  const related = allPosts.filter(p => p.id !== post.id).slice(0, 3)

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="font-heading text-3xl text-brand-cream mt-8 mb-4">{line.slice(2)}</h1>
      if (line.startsWith('## ')) return <h2 key={i} className="font-heading text-2xl text-brand-cream mt-8 mb-4 pb-2 border-b border-brand-slate/30">{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="font-heading text-xl text-brand-cream mt-6 mb-3">{line.slice(4)}</h3>
      if (line.startsWith('- **')) {
        const m = line.match(/- \*\*(.+?)\*\*(.*)/)
        if (m) return <li key={i} className="mb-2 text-brand-silver ml-4"><strong className="text-gold">{m[1]}</strong>{m[2]}</li>
      }
      if (line.startsWith('- ')) return <li key={i} className="mb-2 text-brand-silver ml-4">{line.slice(2)}</li>
      if (line === '') return <br key={i} />
      return <p key={i} className="text-brand-silver leading-relaxed mb-4">{line}</p>
    })
  }

  return (
    <>
      <section className="pt-40 pb-12 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-lg relative">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-silver hover:text-gold text-sm mb-8 transition-colors">← Semua Artikel</Link>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="section-label bg-brand-charcoal border border-brand-slate/30 px-3 py-1">{post.category}</span>
            {(post.tags || []).map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-brand-silver border border-brand-slate/30 px-3 py-1">
                <Tag size={10} className="text-gold" />{tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-fluid-3xl font-bold text-brand-cream mb-6 max-w-3xl">{post.title}</h1>
          <p className="text-brand-silver text-lg max-w-2xl mb-8">{post.excerpt}</p>
          <div className="flex items-center gap-6 pb-8 border-b border-brand-slate/30">
            <div className="flex items-center gap-3">
              {post.author_image
                ? <img src={post.author_image} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-gold/20" />
                : <div className="w-10 h-10 rounded-full bg-brand-charcoal border border-gold/20 flex items-center justify-center"><span className="text-gold font-bold">{post.author?.[0]}</span></div>
              }
              <div>
                <div className="text-brand-cream text-sm font-medium">{post.author}</div>
                <div className="text-brand-gray text-xs">Penulis</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-brand-gray text-xs"><Calendar size={12} />{formatDate(post.published_at)}</div>
            <div className="flex items-center gap-2 text-brand-gray text-xs"><Clock size={12} />{post.read_time} menit baca</div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-dark">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 prose-dark">
              {post.cover_image && (
                <img src={post.cover_image} alt={post.title} className="w-full h-72 object-cover border border-brand-slate/30 mb-10" />
              )}
              {renderContent(post.content)}
            </article>
            <aside className="space-y-6">
              <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                <h3 className="font-heading text-lg text-brand-cream mb-4">Butuh Konstruksi?</h3>
                <p className="text-brand-silver text-sm mb-4">Konsultasi gratis dengan tim ahli kami.</p>
                <Link href="/contact" className="btn-primary w-full justify-center text-sm">Konsultasi Sekarang <ArrowUpRight size={14} /></Link>
              </div>
              {related.length > 0 && (
                <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                  <h3 className="font-heading text-lg text-brand-cream mb-4">Artikel Lainnya</h3>
                  <div className="space-y-4">
                    {related.map(p => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                        {p.cover_image && <img src={p.cover_image} alt={p.title} className="w-full h-20 object-cover mb-2 border border-brand-slate/20" />}
                        <div className="text-xs text-gold mb-1">{p.category}</div>
                        <div className="text-brand-cream text-sm group-hover:text-gold transition-colors line-clamp-2">{p.title}</div>
                        <div className="text-brand-gray text-xs mt-1">{formatDate(p.published_at)}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
