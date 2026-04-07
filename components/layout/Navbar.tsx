'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { siteConfig } from '@/data'

const navLinks = [
  { label: 'Tentang Kami', href: '/about' },
  {
    label: 'Layanan', href: '/services',
    children: [
      { label: 'Konstruksi Residensial', href: '/services/konstruksi-residensial' },
      { label: 'Konstruksi Komersial',   href: '/services/konstruksi-komersial' },
      { label: 'Desain Interior',        href: '/services/desain-interior' },
      { label: 'Infrastruktur',          href: '/services/infrastruktur' },
      { label: 'Renovasi & Restorasi',   href: '/services/renovasi-restorasi' },
      { label: 'Manajemen Proyek',       href: '/services/manajemen-proyek' },
    ],
  },
  { label: 'Portofolio', href: '/portfolio' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Kontak',     href: '/contact' },
]

export function Navbar() {
  const [isScrolled,      setIsScrolled]      = useState(false)
  const [isMobileOpen,    setIsMobileOpen]    = useState(false)
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null)
  const [phone,           setPhone]           = useState(siteConfig.phone)
  const [siteName,        setSiteName]        = useState(siteConfig.siteName)
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/settings/public')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.phone)     setPhone(data.phone)
        if (data?.site_name) setSiteName(data.site_name)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setIsMobileOpen(false); setActiveDropdown(null) }, [pathname])
  useEffect(() => { document.body.style.overflow = isMobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [isMobileOpen])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const nameParts = siteName.split(' ')
  const nameMain = nameParts[0]
  const nameSub  = nameParts.slice(1).join(' ') || 'Konstruksi'

  return (
    <>
      <header className={cn('fixed top-0 left-0 right-0 z-nav transition-all duration-500',
        isScrolled ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-slate/50 py-4' : 'bg-transparent py-6')}>
        <div className="container-xl flex items-center justify-between">
          <Link href="/" className="flex flex-col group">
            <span className="font-heading text-2xl font-bold tracking-tight text-brand-cream group-hover:text-gold transition-colors">{nameMain}</span>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-mono -mt-1">{nameSub}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <div key={link.label} className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={link.href}
                  className={cn('flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300',
                    isActive(link.href) ? 'text-gold' : 'text-brand-silver hover:text-brand-cream')}>
                  {link.label}
                  {link.children && <ChevronDown size={14} className={cn('transition-transform duration-200', activeDropdown === link.label && 'rotate-180')} />}
                </Link>
                {link.children && (
                  <div className={cn('absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300',
                    activeDropdown === link.label ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
                    <div className="bg-brand-charcoal border border-brand-slate/50 shadow-dark w-64 py-2">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}
                          className="block px-5 py-3 text-sm text-brand-silver hover:text-brand-cream hover:bg-brand-slate/50 hover:pl-7 transition-all duration-200">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-brand-silver hover:text-gold transition-colors">
              <Phone size={14} />
              <span className="font-mono text-xs">{phone}</span>
            </a>
            <Link href="/contact" className="btn-primary text-xs py-3 px-6">Konsultasi Gratis</Link>
          </div>

          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden p-2 text-brand-cream hover:text-gold transition-colors" aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={cn('fixed inset-0 z-modal bg-brand-dark transition-all duration-500 lg:hidden',
        isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
        <div className="flex flex-col h-full pt-24 pb-10 px-8 overflow-y-auto">
          <div className="mb-10">
            <div className="font-heading text-3xl font-bold text-gold">{nameMain}</div>
            <div className="text-xs tracking-[0.3em] text-brand-silver uppercase font-mono">{nameSub}</div>
          </div>
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, i) => (
              <div key={link.label}>
                <Link href={link.href}
                  className={cn('block py-4 text-2xl font-heading font-medium border-b border-brand-slate/30 transition-all duration-200',
                    isActive(link.href) ? 'text-gold' : 'text-brand-cream hover:text-gold hover:translate-x-2')}
                  style={{ transitionDelay: `${i * 50}ms` }}>
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 py-2 space-y-2">
                    {link.children.map(child => (
                      <Link key={child.href} href={child.href}
                        className="block py-2 text-sm text-brand-silver hover:text-gold transition-colors">
                        — {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-10 space-y-4">
            <a href={`tel:${phone}`} className="flex items-center gap-3 text-brand-silver">
              <Phone size={16} className="text-gold" />
              <span className="font-mono text-sm">{phone}</span>
            </a>
            <Link href="/contact" className="btn-primary w-full justify-center">Konsultasi Gratis</Link>
          </div>
        </div>
      </div>
    </>
  )
}
