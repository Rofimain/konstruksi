"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectRow } from '@/lib/supabase'

const statusLabel: Record<string, string> = { completed: 'Selesai', ongoing: 'Berjalan', upcoming: 'Akan Datang' }
const statusColor: Record<string, string> = {
  completed: 'bg-emerald-500/20 text-emerald-400',
  ongoing: 'bg-gold/20 text-gold',
  upcoming: 'bg-blue-500/20 text-blue-400',
}

export function PortfolioGrid({ projects }: { projects: ProjectRow[] }) {
  const categories = ['Semua', ...Array.from(new Set(projects.map(p => p.category)))]
  const [active, setActive] = useState('Semua')
  const filtered = active === 'Semua' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 container-xl">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`shrink-0 px-5 py-2 text-sm font-medium transition-all ${active === cat ? 'bg-gold text-brand-black' : 'text-brand-silver border border-brand-slate/50 hover:border-brand-slate'}`}>
            {cat}
          </button>
        ))}
      </div>

      <section className="py-12 bg-brand-dark min-h-screen">
        <div className="container-xl">
          <p className="text-brand-gray text-sm font-mono mb-6">{filtered.length} proyek</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <Link key={project.id} href={`/portfolio/${project.slug}`}
                className="group bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-500 overflow-hidden block">
                <div className="h-56 relative overflow-hidden bg-brand-slate">
                  {project.cover_image
                    ? <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate/80 to-brand-charcoal" />
                  }
                  <div className="absolute inset-0 bg-card-gradient" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor[project.status]}`}>{statusLabel[project.status]}</span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={14} className="text-gold" />
                  </div>
                  <div className="absolute bottom-4 right-4 text-brand-gray font-mono text-xs">{project.year}</div>
                </div>
                <div className="p-6">
                  <div className="section-label text-[10px] mb-2">{project.category}</div>
                  <h2 className="font-heading text-xl text-brand-cream group-hover:text-gold transition-colors mb-1">{project.title}</h2>
                  <p className="text-brand-gray text-xs mb-3">{project.location}</p>
                  <p className="text-brand-silver text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {[project.area, project.duration].filter(Boolean).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 border border-brand-slate/50 text-brand-gray">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-24 text-brand-gray">Belum ada proyek dalam kategori ini.</div>
          )}
        </div>
      </section>
    </>
  )
}
