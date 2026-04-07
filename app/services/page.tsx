import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Building2, Palette, Route, Hammer, ClipboardList, ArrowUpRight, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { services } from '@/data'

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Layanan konstruksi komprehensif dari ROFIMAIN.',
}

const iconMap: Record<string, LucideIcon> = {
  Home, Building2, Palette, Route, Hammer, ClipboardList,
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative">
          <div className="section-label mb-6">Layanan Kami</div>
          <h1 className="font-heading text-fluid-4xl font-bold text-brand-cream max-w-3xl mb-6">
            Solusi Konstruksi <span className="text-gold-gradient">Lengkap</span>
          </h1>
          <p className="text-brand-silver text-lg max-w-xl">
            Kami menyediakan seluruh spektrum layanan konstruksi, dari konsep awal hingga serah terima kunci.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-dark">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Home
              return (
                <div
                  key={service.id}
                  className="group bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500" />
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 border border-brand-slate group-hover:border-gold/50 flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="section-label text-[10px] mb-2">{service.subtitle}</div>
                          <h2 className="font-heading text-xl text-brand-cream group-hover:text-gold transition-colors mb-3">
                            {service.title}
                          </h2>
                        </div>
                        <span className="text-brand-slate font-mono text-xs ml-4">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="text-brand-silver text-sm leading-relaxed mb-5">{service.description}</p>
                      <ul className="grid grid-cols-2 gap-2 mb-6">
                        {service.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-brand-silver">
                            <CheckCircle size={12} className="text-gold shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all"
                      >
                        <span>Detail Layanan</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-charcoal">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">Proses Kami</div>
              <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream mb-4">Bagaimana Kami Bekerja</h2>
              <p className="text-brand-silver leading-relaxed mb-8">
                Setiap proyek kami tangani dengan proses yang terstruktur dan transparan, memastikan Anda selalu mengetahui progress pembangunan.
              </p>
              <Link href="/contact" className="btn-primary">Mulai Proyek Anda</Link>
            </div>
            <div className="space-y-4">
              {['Konsultasi & Perencanaan', 'Desain & Perizinan', 'Pelaksanaan Konstruksi', 'Quality Control', 'Serah Terima'].map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-4 p-4 bg-brand-dark border border-brand-slate/30 hover:border-gold/30 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gold text-brand-black flex items-center justify-center text-sm font-bold font-mono shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-brand-cream group-hover:text-gold transition-colors">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
