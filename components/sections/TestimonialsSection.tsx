'use client'
import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { TestimonialRow } from '@/lib/supabase'
import { testimonials as staticTestimonials } from '@/data'

interface Props {
  testimonials?: TestimonialRow[]
}

export function TestimonialsSection({ testimonials }: Props) {
  const items = testimonials && testimonials.length > 0
    ? testimonials
    : staticTestimonials.map(t => ({
        ...t,
        created_at: '',
        project_id: t.projectId || null,
        featured: false,
      })) as any[]

  const [active, setActive] = useState(0)
  if (items.length === 0) return null
  const t = items[active]

  return (
    <section className="py-28 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '50px 50px' }} />
      <div className="container-xl relative">
        <div className="section-label mb-4 text-center">Apa Kata Mereka</div>
        <h2 className="font-heading text-fluid-2xl text-center text-brand-cream mb-16">
          Kepercayaan <span className="text-gold-gradient">Klien Kami</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-brand-dark border border-brand-slate/40 p-10 lg:p-14">
            <Quote size={48} className="text-gold/10 absolute top-8 left-8" />
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_: any, i: number) => (
                <Star key={i} size={16} className="text-gold fill-gold" />
              ))}
            </div>
            <p className="font-heading text-xl lg:text-2xl text-brand-cream italic leading-relaxed mb-8">
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              {t.image
                ? <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gold/20" />
                : <div className="w-12 h-12 bg-brand-slate rounded-full flex items-center justify-center">
                    <span className="text-gold font-heading text-lg font-bold">{t.name[0]}</span>
                  </div>
              }
              <div>
                <div className="font-semibold text-brand-cream">{t.name}</div>
                <div className="text-brand-silver text-sm">{t.role}{t.company ? `, ${t.company}` : ''}</div>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 text-brand-slate font-mono text-xs">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setActive((active - 1 + items.length) % items.length)}
              className="w-12 h-12 border border-brand-slate hover:border-gold text-brand-silver hover:text-gold transition-all flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {items.map((_: any, i: number) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`transition-all duration-300 ${i === active ? 'w-8 h-1 bg-gold' : 'w-2 h-1 bg-brand-slate hover:bg-brand-silver'}`} />
              ))}
            </div>
            <button onClick={() => setActive((active + 1) % items.length)}
              className="w-12 h-12 border border-brand-slate hover:border-gold text-brand-silver hover:text-gold transition-all flex items-center justify-center">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
