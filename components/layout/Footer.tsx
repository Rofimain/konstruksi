'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Facebook, Youtube, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data'

const footerLinks = {
  layanan: [
    { label: 'Konstruksi Residensial', href: '/services/konstruksi-residensial' },
    { label: 'Konstruksi Komersial', href: '/services/konstruksi-komersial' },
    { label: 'Desain Interior', href: '/services/desain-interior' },
    { label: 'Infrastruktur', href: '/services/infrastruktur' },
    { label: 'Renovasi & Restorasi', href: '/services/renovasi-restorasi' },
    { label: 'Manajemen Proyek', href: '/services/manajemen-proyek' },
  ],
  perusahaan: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Tim Kami', href: '/about#team' },
    { label: 'Portofolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Karier', href: '/karier' },
    { label: 'Hubungi Kami', href: '/contact' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [s, setS] = useState({
    site_name: siteConfig.siteName,
    phone:     siteConfig.phone,
    email:     siteConfig.email,
    address:   siteConfig.address,
    instagram: siteConfig.social.instagram || '',
    linkedin:  siteConfig.social.linkedin  || '',
    facebook:  siteConfig.social.facebook  || '',
    youtube:   siteConfig.social.youtube   || '',
  })

  useEffect(() => {
    fetch('/api/settings/public')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setS(prev => ({ ...prev, ...data })) })
      .catch(() => {})
  }, [])

  const socials = [
    { icon: Instagram, href: s.instagram, label: 'Instagram' },
    { icon: Linkedin,  href: s.linkedin,  label: 'LinkedIn'  },
    { icon: Facebook,  href: s.facebook,  label: 'Facebook'  },
    { icon: Youtube,   href: s.youtube,   label: 'YouTube'   },
  ].filter(s => s.href)

  return (
    <footer className="bg-brand-black relative overflow-hidden">
      <div className="gold-line" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/3 blur-3xl" />

      <div className="container-xl relative">
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col mb-6 group">
              <span className="font-heading text-3xl font-bold text-brand-cream group-hover:text-gold transition-colors">
                {s.site_name.split(' ')[0]}
              </span>
              <span className="text-xs tracking-[0.3em] text-gold uppercase font-mono -mt-1">
                {s.site_name.split(' ').slice(1).join(' ') || 'Konstruksi'}
              </span>
            </Link>
            <p className="text-brand-silver text-sm leading-relaxed mb-8 max-w-sm">{siteConfig.description}</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 border border-brand-slate flex items-center justify-center text-brand-silver hover:text-gold hover:border-gold/50 transition-all duration-300 hover:bg-gold/5">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="section-label mb-6">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-silver hover:text-gold transition-colors duration-200">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="section-label mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-silver hover:text-gold transition-colors duration-200">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="section-label mb-6">Kontak</h4>
            <ul className="space-y-4">
              {s.phone && (
                <li>
                  <a href={`tel:${s.phone}`} className="flex items-start gap-3 text-sm text-brand-silver hover:text-gold transition-colors">
                    <Phone size={14} className="mt-0.5 text-gold shrink-0" /><span>{s.phone}</span>
                  </a>
                </li>
              )}
              {s.email && (
                <li>
                  <a href={`mailto:${s.email}`} className="flex items-start gap-3 text-sm text-brand-silver hover:text-gold transition-colors">
                    <Mail size={14} className="mt-0.5 text-gold shrink-0" /><span>{s.email}</span>
                  </a>
                </li>
              )}
              {s.address && (
                <li>
                  <div className="flex items-start gap-3 text-sm text-brand-silver">
                    <MapPin size={14} className="mt-0.5 text-gold shrink-0" />
                    <span className="leading-relaxed">{s.address}</span>
                  </div>
                </li>
              )}
            </ul>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-gold font-medium group">
                <span>Mulai Konsultasi</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-slate/30 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-gray text-xs font-mono">
            © {currentYear} {s.site_name}. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-brand-gray text-xs hover:text-gold transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-brand-gray text-xs hover:text-gold transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
