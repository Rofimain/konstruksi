import Link from 'next/link'
import { Home, Building2, Palette, Route, Hammer, ClipboardList, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServiceRow } from '@/lib/supabase'
import { services as staticServices } from '@/data'

const iconMap: Record<string, LucideIcon> = {
  Home, Building2, Palette, Route, Hammer, ClipboardList,
}

interface Props {
  services?: ServiceRow[]
}

export function ServicesSection({ services }: Props) {
  // Fallback ke data statis jika Supabase belum disetup
  const items = services && services.length > 0 ? services : staticServices.map(s => ({
    ...s,
    id: s.id,
    created_at: '',
    updated_at: '',
    full_description: s.fullDescription,
    cover_image: null,
    order: s.order,
  })) as any[]

  return (
    <section className="py-28 bg-brand-dark relative">
      <div className="container-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-label mb-4">Apa yang Kami Lakukan</div>
            <h2 className="font-heading text-fluid-3xl font-bold text-brand-cream">
              Layanan <span className="text-gold-gradient">Konstruksi</span><br />Terlengkap
            </h2>
          </div>
          <p className="text-brand-silver max-w-sm leading-relaxed">
            Dari perencanaan hingga serah terima, kami menyediakan solusi konstruksi komprehensif dengan standar kualitas internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-slate/20">
          {items.map((service: any, i: number) => {
            const Icon = iconMap[service.icon] ?? Home
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-brand-dark p-8 group hover:bg-brand-charcoal transition-all duration-300 relative overflow-hidden block"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-brand-slate group-hover:border-gold/50 flex items-center justify-center transition-colors duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <span className="text-brand-slate font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading text-xl text-brand-cream group-hover:text-gold transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-silver text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center gap-2 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Selengkapnya</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn-outline">Semua Layanan</Link>
        </div>
      </div>
    </section>
  )
}
