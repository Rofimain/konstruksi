'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FolderOpen, Wrench, FileText, Settings, LogOut, Menu, X, Users, MessageSquare, Image, Eye, ChevronRight } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Proyek', href: '/admin/projects', icon: FolderOpen },
  { label: 'Layanan', href: '/admin/services', icon: Wrench },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Tim', href: '/admin/team', icon: Users },
  { label: 'Testimoni', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Media', href: '/admin/media', icon: Image },
  { label: 'Pengaturan', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  const active = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <div className="min-h-screen bg-brand-black flex font-body">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-brand-charcoal border-r border-brand-slate/30 z-50 flex flex-col transition-all duration-300 ${open ? 'w-60' : 'w-16'}`}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-brand-slate/30 shrink-0">
          {open && <Link href="/" target="_blank" className="flex flex-col"><span className="font-heading text-lg font-bold text-gold leading-none">Rofimain</span><span className="text-[8px] tracking-[0.3em] text-brand-gray font-mono">CMS</span></Link>}
          <button onClick={() => setOpen(!open)} className="text-brand-silver hover:text-gold transition-colors ml-auto p-1">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} title={!open ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${active(href) ? 'bg-gold/10 text-gold border-l-2 border-gold pl-2.5' : 'text-brand-silver hover:bg-brand-slate/30 hover:text-brand-cream'} ${!open ? 'justify-center px-2' : ''}`}>
              <Icon size={18} className="shrink-0" />
              {open && <><span className="flex-1">{label}</span>{active(href) && <ChevronRight size={14} />}</>}
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-brand-slate/30 space-y-0.5 shrink-0">
          <Link href="/" target="_blank" title={!open ? 'Lihat Website' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm text-brand-silver hover:text-brand-cream hover:bg-brand-slate/30 rounded-lg transition-all ${!open ? 'justify-center px-2' : ''}`}>
            <Eye size={18} className="shrink-0" />
            {open && <span>Lihat Website</span>}
          </Link>
          <button onClick={handleLogout} title={!open ? 'Keluar' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-brand-silver hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ${!open ? 'justify-center px-2' : ''}`}>
            <LogOut size={18} className="shrink-0" />
            {open && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${open ? 'ml-60' : 'ml-16'}`}>
        <header className="h-16 bg-brand-charcoal border-b border-brand-slate/30 flex items-center px-6 sticky top-0 z-40 shrink-0">
          <div className="text-sm text-brand-silver">
            <span className="text-brand-gray">Admin</span>
            {pathname !== '/admin' && (<>
              <span className="mx-2 text-brand-slate">/</span>
              <span className="text-brand-cream capitalize">{navItems.find(n => n.href !== '/admin' && pathname.startsWith(n.href))?.label}</span>
            </>)}
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
