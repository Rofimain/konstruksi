import { FolderOpen, Wrench, FileText, Users, MessageSquare, TrendingUp, Eye, Clock, CheckCircle } from 'lucide-react'
import { requireAuth } from '@/lib/auth'
import { getProjects, getBlogPosts, getTeam, getTestimonials } from '@/lib/db'
import Link from 'next/link'

export default async function AdminDashboard() {
  await requireAuth()

  const [projects, posts, team, testimonials] = await Promise.all([
    getProjects().catch(() => []),
    getBlogPosts().catch(() => []),
    getTeam().catch(() => []),
    getTestimonials().catch(() => []),
  ])

  const stats = [
    { label: 'Total Proyek', value: projects.length, icon: FolderOpen, color: 'text-blue-400', href: '/admin/projects' },
    { label: 'Artikel Blog', value: posts.length, icon: FileText, color: 'text-emerald-400', href: '/admin/blog' },
    { label: 'Anggota Tim', value: team.length, icon: Users, color: 'text-gold', href: '/admin/team' },
    { label: 'Testimoni', value: testimonials.length, icon: MessageSquare, color: 'text-purple-400', href: '/admin/testimonials' },
  ]

  const statusIcon = (s: string) => {
    if (s === 'completed') return <CheckCircle size={14} className="text-emerald-400" />
    if (s === 'ongoing') return <Clock size={14} className="text-gold" />
    return <TrendingUp size={14} className="text-blue-400" />
  }
  const statusLabel = (s: string) => s === 'completed' ? 'Selesai' : s === 'ongoing' ? 'Berjalan' : 'Akan Datang'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-brand-cream">Dashboard</h1>
        <p className="text-brand-silver text-sm mt-1">Selamat datang di panel administrasi ARKON Konstruksi</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all p-5 group">
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className={color} />
              <Eye size={14} className="text-brand-gray opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-heading text-3xl text-brand-cream">{value}</div>
            <div className="text-brand-gray text-xs mt-1">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-brand-charcoal border border-brand-slate/30 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg text-brand-cream">Proyek Terbaru</h2>
            <Link href="/admin/projects" className="text-gold text-xs hover:underline">Lihat semua</Link>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-8 text-brand-gray text-sm">
              Belum ada proyek. <Link href="/admin/projects" className="text-gold hover:underline">Tambah proyek</Link>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-brand-slate/20">
              {projects.slice(0, 6).map(p => (
                <div key={p.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {p.cover_image
                      ? <img src={p.cover_image} alt={p.title} className="w-10 h-8 object-cover border border-brand-slate/30 shrink-0" />
                      : <div className="w-10 h-8 bg-brand-slate shrink-0" />
                    }
                    <div>
                      <div className="text-brand-cream text-sm font-medium">{p.title}</div>
                      <div className="text-brand-gray text-xs">{p.location} · {p.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {statusIcon(p.status)}
                    <span className="text-xs text-brand-silver">{statusLabel(p.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-brand-charcoal border border-brand-slate/30 p-5">
            <h2 className="font-heading text-lg text-brand-cream mb-4">Aksi Cepat</h2>
            <div className="space-y-2">
              {[
                { label: '+ Proyek Baru', href: '/admin/projects' },
                { label: '+ Artikel Blog', href: '/admin/blog' },
                { label: '+ Anggota Tim', href: '/admin/team' },
                { label: '+ Testimoni', href: '/admin/testimonials' },
                { label: 'Upload Media', href: '/admin/media' },
                { label: 'Pengaturan Situs', href: '/admin/settings' },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="block px-4 py-2.5 bg-brand-dark border border-brand-slate/30 hover:border-gold/30 text-brand-silver hover:text-gold text-sm transition-all">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-brand-charcoal border border-brand-slate/30 p-5">
            <h2 className="font-heading text-lg text-brand-cream mb-3">Status Proyek</h2>
            {[
              { label: 'Selesai', count: projects.filter(p => p.status === 'completed').length, color: 'bg-emerald-500' },
              { label: 'Berjalan', count: projects.filter(p => p.status === 'ongoing').length, color: 'bg-gold' },
              { label: 'Akan Datang', count: projects.filter(p => p.status === 'upcoming').length, color: 'bg-blue-500' },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-brand-silver text-sm">{label}</span>
                </div>
                <span className="text-brand-cream font-mono text-sm">{count}</span>
              </div>
            ))}
          </div>

          <div className="bg-brand-charcoal border border-brand-slate/30 p-5">
            <h2 className="font-heading text-lg text-brand-cream mb-3">Artikel Terbaru</h2>
            {posts.slice(0, 3).map(p => (
              <div key={p.id} className="py-2 border-b border-brand-slate/20 last:border-0">
                <div className="text-brand-cream text-xs font-medium line-clamp-1">{p.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs ${p.published ? 'text-emerald-400' : 'text-brand-gray'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
            {posts.length === 0 && <div className="text-brand-gray text-xs">Belum ada artikel</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
