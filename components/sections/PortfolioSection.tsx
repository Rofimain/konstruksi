import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectRow } from '@/lib/supabase'
import { projects as staticProjects } from '@/data'

const statusColor: Record<string, string> = {
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ongoing: 'bg-gold/20 text-gold border-gold/30',
  upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}
const statusLabel: Record<string, string> = { completed: 'Selesai', ongoing: 'Berjalan', upcoming: 'Akan Datang' }

interface Props {
  projects?: ProjectRow[]
}

export function PortfolioSection({ projects }: Props) {
  const items = projects && projects.length > 0
    ? projects
    : staticProjects.filter(p => p.featured).slice(0, 4).map(p => ({
        ...p,
        id: p.id,
        created_at: '',
        updated_at: '',
        cover_image: null,
        full_description: p.fullDescription,
        images: p.images,
      })) as any[]

  const featured = items[0]
  const rest = items.slice(1, 3)

  return (
    <section className="py-28 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[120px]" />
      <div className="container-xl relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-label mb-4">Portofolio Pilihan</div>
            <h2 className="font-heading text-fluid-3xl font-bold text-brand-cream">
              Karya yang Berbicara<br /><span className="text-gold-gradient">Sendiri</span>
            </h2>
          </div>
          <Link href="/portfolio" className="btn-outline shrink-0">
            Semua Proyek <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {featured && (
            <Link href={`/portfolio/${featured.slug}`}
              className="lg:col-span-7 group relative overflow-hidden block h-[480px] bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-500">
              {featured.cover_image
                ? <img src={featured.cover_image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-charcoal" />
              }
              <div className="absolute inset-0 bg-card-gradient" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className={`text-xs px-2 py-1 border rounded-full mb-3 inline-block ${statusColor[featured.status]}`}>
                  {statusLabel[featured.status]}
                </span>
                <div className="section-label mb-1">{featured.category}</div>
                <h3 className="font-heading text-2xl lg:text-3xl text-brand-cream group-hover:text-gold transition-colors">{featured.title}</h3>
                <p className="text-brand-silver text-sm mt-2">{featured.location} · {featured.area}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight size={18} className="text-brand-black" />
              </div>
            </Link>
          )}

          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((project: any) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`}
                className="group relative overflow-hidden block h-[228px] bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-500">
                {project.cover_image
                  ? <img src={project.cover_image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  : <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal to-brand-slate" />
                }
                <div className="absolute inset-0 bg-card-gradient" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="section-label mb-1 text-[10px]">{project.category}</div>
                  <h3 className="font-heading text-lg text-brand-cream group-hover:text-gold transition-colors">{project.title}</h3>
                  <p className="text-brand-gray text-xs mt-1">{project.location} · {project.year}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} className="text-gold" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
