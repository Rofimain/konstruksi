// components/sections/BlogSection.tsx

import Link from 'next/link'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/data'
import { formatDate } from '@/lib/utils'

export function BlogSection() {
  const featured = blogPosts.filter(p => p.featured).slice(0, 3)

  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="section-label">Artikel & Insight</span>
            </div>
            <h2 className="font-heading text-fluid-3xl font-bold text-brand-cream">
              Wawasan dari<br /><span className="text-gold-gradient">Para Ahli</span>
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold text-sm font-medium group shrink-0">
            <span>Semua Artikel</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 bg-brand-slate/20">
          {featured.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-brand-dark hover:bg-brand-charcoal transition-colors duration-300 overflow-hidden"
            >
              {/* Cover image placeholder */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-charcoal via-brand-slate to-brand-charcoal overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-3/4 h-3/4 opacity-10">
                    <rect x="10" y="10" width="180" height="100" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
                    <line x1="10" y1="40" x2="190" y2="40" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                    {[0,1,2,3,4].map(j => (
                      <rect key={j} x={20+j*35} y={55} width="25" height="45" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-gold text-brand-black font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Read time */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] text-brand-silver bg-brand-black/60 px-2 py-1">
                  <Clock size={10} />
                  {post.readTime} min
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs text-brand-gray font-mono mb-3">
                  {formatDate(post.publishedAt)} — {post.author}
                </div>
                <h3 className="font-heading text-lg text-brand-cream mb-3 leading-snug group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-brand-silver text-sm leading-relaxed line-clamp-3 mb-5">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 border border-brand-slate/50 text-brand-gray flex items-center gap-1">
                      <Tag size={8} />{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Baca Selengkapnya <ArrowUpRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
