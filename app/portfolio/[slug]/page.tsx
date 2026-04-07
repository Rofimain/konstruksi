import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Maximize2, Calendar, User, ArrowUpRight, Tag } from 'lucide-react'
import { getProject, getProjects } from '@/lib/db'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => [])
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

const statusLabel: Record<string, string> = { completed: 'Selesai', ongoing: 'Sedang Berjalan', upcoming: 'Akan Datang' }
const statusColor: Record<string, string> = {
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  ongoing: 'bg-gold/20 text-gold border-gold/30',
  upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, allProjects] = await Promise.all([
    getProject(params.slug),
    getProjects().catch(() => []),
  ])
  if (!project) notFound()
  const related = allProjects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3)

  return (
    <>
      <section className="pt-40 pb-0 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative pb-16">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-silver hover:text-gold text-sm mb-8 transition-colors">← Semua Proyek</Link>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`text-xs px-3 py-1 border rounded-full ${statusColor[project.status]}`}>{statusLabel[project.status]}</span>
            <span className="text-xs px-3 py-1 border border-brand-slate text-brand-silver">{project.category}</span>
            <span className="text-xs px-3 py-1 border border-brand-slate text-brand-silver">{project.year}</span>
          </div>
          <h1 className="font-heading text-fluid-3xl font-bold text-brand-cream mb-3">{project.title}</h1>
          <p className="text-brand-silver text-xl">{project.subtitle}</p>
        </div>

        {/* Cover image */}
        <div className="h-[50vh] relative overflow-hidden bg-brand-charcoal">
          {project.cover_image
            ? <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
            : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-charcoal flex items-center justify-center"><span className="font-heading text-6xl text-gold/10">{project.title[0]}</span></div>
          }
          <div className="absolute inset-0 bg-card-gradient" />
        </div>
      </section>

      <section className="py-16 bg-brand-dark">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl text-brand-cream mb-6">Tentang Proyek</h2>
              <p className="text-brand-silver leading-relaxed mb-8">{project.full_description || project.description}</p>
              
              {/* Gallery */}
              {(project.images || []).length > 0 && (
                <div className="mt-8">
                  <h3 className="font-heading text-xl text-brand-cream mb-4">Galeri Foto</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.images.map((img, i) => (
                      <img key={i} src={img} alt={`${project.title} - Foto ${i+1}`} className="w-full aspect-video object-cover border border-brand-slate/30 hover:border-gold/30 transition-colors" />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-8">
                {(project.tags || []).map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 border border-brand-slate/50 text-brand-silver">
                    <Tag size={10} className="text-gold" />{tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-brand-charcoal border border-brand-slate/30 p-6 space-y-5 sticky top-24">
                <h3 className="font-heading text-lg text-brand-cream border-b border-brand-slate/30 pb-3">Detail Proyek</h3>
                {[
                  { icon: MapPin, label: 'Lokasi', value: project.location },
                  { icon: Maximize2, label: 'Luas Area', value: project.area },
                  { icon: Calendar, label: 'Durasi', value: project.duration },
                  { icon: User, label: 'Klien', value: project.client },
                  ...(project.value ? [{ icon: Tag, label: 'Nilai Proyek', value: project.value }] : []),
                  ...(project.architect ? [{ icon: User, label: 'Arsitek', value: project.architect }] : []),
                ].filter(i => i.value).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={14} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <div className="text-brand-gray text-xs">{label}</div>
                      <div className="text-brand-cream text-sm font-medium">{value}</div>
                    </div>
                  </div>
                ))}
                <Link href="/contact" className="btn-primary w-full justify-center mt-4">
                  Proyek Serupa <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-brand-black">
          <div className="container-xl">
            <div className="section-label mb-4">Proyek Terkait</div>
            <h2 className="font-heading text-2xl text-brand-cream mb-10">Proyek {project.category} Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/portfolio/${p.slug}`} className="group bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 overflow-hidden block">
                  <div className="h-40 relative overflow-hidden bg-brand-slate">
                    {p.cover_image
                      ? <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-dark" />
                    }
                    <div className="absolute inset-0 bg-card-gradient" />
                  </div>
                  <div className="p-5">
                    <div className="section-label text-[10px] mb-1">{p.category}</div>
                    <h3 className="font-heading text-lg text-brand-cream group-hover:text-gold transition-colors">{p.title}</h3>
                    <p className="text-brand-gray text-xs mt-1">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
