import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { siteConfig } from '@/data'

export function CtaSection() {
  return (
    <section className="py-28 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gold/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '40px 40px' }} />
      </div>
      <div className="container-xl relative text-center">
        <div className="section-label mb-6">Mulai Proyek Anda</div>
        <h2 className="font-heading text-fluid-3xl font-bold text-brand-cream mb-6 max-w-3xl mx-auto">
          Siap Membangun <span className="text-gold-gradient">Impian</span> Anda Bersama Kami?
        </h2>
        <p className="text-brand-silver text-lg max-w-xl mx-auto mb-12">
          Hubungi tim kami sekarang untuk konsultasi gratis. Kami siap membantu mewujudkan visi Anda dengan standar kualitas terbaik.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Konsultasi Gratis <ArrowUpRight size={16} />
          </Link>
          <a href={`tel:${siteConfig.phone}`} className="btn-outline flex items-center gap-3">
            <Phone size={16} /> {siteConfig.phone}
          </a>
        </div>
        <div className="mt-16 grid grid-cols-3 max-w-lg mx-auto gap-8">
          {['Gratis Konsultasi', 'Estimasi Transparan', 'Garansi 10 Tahun'].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
                <div className="w-2 h-2 bg-gold rounded-full" />
              </div>
              <div className="text-brand-silver text-xs">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
