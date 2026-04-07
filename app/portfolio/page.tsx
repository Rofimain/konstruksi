import type { Metadata } from 'next'
import { getProjects } from '@/lib/db'
import { PortfolioGrid } from './PortfolioGrid'

export const metadata: Metadata = { title: 'Portofolio', description: 'Proyek-proyek unggulan ARKON Konstruksi.' }
export const revalidate = 60

export default async function PortfolioPage() {
  const projects = await getProjects().catch(() => [])
  return (
    <>
      <section className="pt-40 pb-16 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative">
          <div className="section-label mb-6">Portofolio</div>
          <h1 className="font-heading text-fluid-4xl font-bold text-brand-cream mb-6">
            Karya-Karya <span className="text-gold-gradient">Terbaik</span> Kami
          </h1>
          <p className="text-brand-silver text-lg max-w-xl">
            Setiap proyek adalah cerita unik tentang kepercayaan klien yang kami wujudkan.
          </p>
        </div>
      </section>
      <section className="py-4 bg-brand-dark border-y border-brand-slate/30 sticky top-16 z-10 backdrop-blur-md">
        <PortfolioGrid projects={projects} />
      </section>
    </>
  )
}
