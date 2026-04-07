import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Home, Building2, Palette, Route, Hammer, ClipboardList, CheckCircle, ArrowRight, ArrowUpRight } from 'lucide-react'
import { services } from '@/data'

import type { LucideIcon } from 'lucide-react'
const iconMap: Record<string, LucideIcon> = {
  Home, Building2, Palette, Route, Hammer, ClipboardList,
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return { title: service.title, description: service.description }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()
  const Icon = iconMap[service.icon] || Home

  return (
    <>
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative">
          <Link href="/services" className="inline-flex items-center gap-2 text-brand-silver hover:text-gold text-sm mb-8 transition-colors">
            ← Kembali ke Layanan
          </Link>
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 border border-gold/30 flex items-center justify-center shrink-0">
              <Icon size={28} className="text-gold" />
            </div>
            <div>
              <div className="section-label mb-2">{service.subtitle}</div>
              <h1 className="font-heading text-fluid-3xl font-bold text-brand-cream">{service.title}</h1>
            </div>
          </div>
          <p className="text-brand-silver text-lg max-w-2xl leading-relaxed">{service.fullDescription}</p>
        </div>
      </section>

      <section className="py-20 bg-brand-dark">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-heading text-2xl text-brand-cream mb-6">Fitur Layanan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-4 bg-brand-charcoal border border-brand-slate/30">
                      <CheckCircle size={16} className="text-gold shrink-0" />
                      <span className="text-brand-cream text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-brand-cream mb-6">Tahapan Pengerjaan</h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4 p-5 bg-brand-charcoal border border-brand-slate/30 hover:border-gold/20 transition-colors group">
                      <div className="w-8 h-8 bg-gold text-brand-black flex items-center justify-center text-sm font-bold font-mono shrink-0">{step.step}</div>
                      <div>
                        <h3 className="text-brand-cream font-semibold group-hover:text-gold transition-colors">{step.title}</h3>
                        <p className="text-brand-silver text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-brand-charcoal border border-gold/20 p-6">
                <h3 className="font-heading text-xl text-brand-cream mb-4">Mulai Proyek Anda</h3>
                <p className="text-brand-silver text-sm mb-6">Konsultasikan kebutuhan {service.title.toLowerCase()} Anda dengan tim ahli kami.</p>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Konsultasi Gratis <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                <h3 className="font-heading text-lg text-brand-cream mb-4">Layanan Lainnya</h3>
                <div className="space-y-2">
                  {services.filter(s => s.id !== service.id).slice(0, 4).map(s => (
                    <Link key={s.id} href={`/services/${s.slug}`}
                      className="flex items-center justify-between py-2 text-brand-silver hover:text-gold text-sm transition-colors group border-b border-brand-slate/20 last:border-0">
                      <span>{s.title}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
