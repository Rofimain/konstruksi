'use client'
// components/sections/HeroSection.tsx

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, Play } from 'lucide-react'

const heroSlides = [
  {
    tagline: 'Membangun Masa Depan',
    headline: 'Konstruksi Premium\nBerstandar Dunia',
    subtext: 'Menghadirkan hunian, gedung komersial, dan infrastruktur terbaik dengan presisi dan integritas sejak 2009.',
    ctaLabel: 'Lihat Portofolio',
    ctaHref: '/portfolio',
    stat: { value: '350+', label: 'Proyek Selesai' },
    accent: 'Residensial & Komersial',
  },
  {
    tagline: 'Arsitektur Tanpa Kompromi',
    headline: 'Desain yang Abadi,\nKualitas yang Terbukti',
    subtext: 'Tim arsitek dan insinyur berpengalaman kami mewujudkan visi Anda menjadi bangunan yang melampaui ekspektasi.',
    ctaLabel: 'Layanan Kami',
    ctaHref: '/services',
    stat: { value: '15+', label: 'Tahun Pengalaman' },
    accent: 'Desain & Teknik',
  },
  {
    tagline: 'Kepercayaan yang Terjaga',
    headline: 'Mitra Terpercaya\nIndustri Konstruksi',
    subtext: 'Dari villa mewah hingga gedung pencakar langit, kami berkomitmen pada kualitas tertinggi di setiap proyek.',
    ctaLabel: 'Konsultasi Gratis',
    ctaHref: '/contact',
    stat: { value: '280+', label: 'Klien Puas' },
    accent: 'Kepercayaan & Kualitas',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()
  const progressRef = useRef<HTMLDivElement>(null)

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 400)
  }

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
    }
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-brand-black">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"
          style={{ backgroundSize: '60px 60px' }} />

        {/* Large decorative circle */}
        <div className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full border border-gold/5" />
        <div className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full border border-gold/8" />

        {/* Gold glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/3 blur-[80px]" />

        {/* Diagonal lines decoration */}
        <svg className="absolute top-0 right-0 opacity-5 w-1/2 h-full" viewBox="0 0 400 800" preserveAspectRatio="none">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={i * 60} y1={0} x2={i * 60 + 200} y2={800} stroke="currentColor" strokeWidth="1" className="text-gold" />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center z-10 pt-28 pb-16">
        <div className="container-xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 xl:col-span-6">
              {/* Accent label */}
              <div
                key={`accent-${currentSlide}`}
                className={`inline-flex items-center gap-3 mb-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <span className="section-label">{slide.accent}</span>
                <div className="h-px w-12 bg-gold" />
                <span className="text-brand-gray text-xs font-mono">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Tagline */}
              <p
                key={`tagline-${currentSlide}`}
                className={`text-sm text-brand-silver tracking-widest uppercase font-mono mb-4 transition-all duration-500 delay-75 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                {slide.tagline}
              </p>

              {/* Headline */}
              <h1
                key={`headline-${currentSlide}`}
                className={`font-heading text-fluid-hero font-bold leading-[1.05] text-brand-cream mb-8 transition-all duration-500 delay-100 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {slide.headline.split('\n').map((line, i) => (
                  <span key={i} className={i === 1 ? 'text-gold-gradient' : ''}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h1>

              {/* Subtext */}
              <p
                key={`sub-${currentSlide}`}
                className={`text-brand-silver text-lg max-w-lg leading-relaxed mb-10 transition-all duration-500 delay-150 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                {slide.subtext}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link href={slide.ctaHref} className="btn-primary">
                  {slide.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-outline">
                  Hubungi Kami
                </Link>
              </div>

              {/* Stat highlight */}
              <div className="mt-12 flex items-center gap-6">
                <div className="border-l-2 border-gold pl-4">
                  <div className="text-3xl font-heading font-bold text-gold">{slide.stat.value}</div>
                  <div className="text-xs text-brand-silver uppercase tracking-widest">{slide.stat.label}</div>
                </div>
                <div className="h-12 w-px bg-brand-slate" />
                <div className="border-l-2 border-brand-slate pl-4">
                  <div className="text-3xl font-heading font-bold text-brand-cream">15+</div>
                  <div className="text-xs text-brand-silver uppercase tracking-widest">Tahun Berdiri</div>
                </div>
              </div>
            </div>

            {/* Right side - Feature cards */}
            <div className="lg:col-span-5 xl:col-span-6 hidden lg:block">
              <div className="relative">
                {/* Large feature card */}
                <div className="card-dark relative overflow-hidden h-[480px] group">
                  {/* Placeholder image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-slate to-brand-charcoal" />

                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-24 h-24 border border-gold/20 rounded-full" />
                  <div className="absolute top-10 right-10 w-12 h-12 border border-gold/30 rounded-full" />

                  {/* Building illustration */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice">
                    <rect x="80" y="100" width="240" height="360" fill="none" stroke="rgba(201,168,76,0.8)" strokeWidth="1.5" />
                    {Array.from({ length: 8 }, (_, row) =>
                      Array.from({ length: 5 }, (_, col) => (
                        <rect key={`${row}-${col}`}
                          x={100 + col * 45}
                          y={120 + row * 40}
                          width="30"
                          height="25"
                          fill="none"
                          stroke="rgba(201,168,76,0.4)"
                          strokeWidth="1" />
                      ))
                    )}
                    <rect x="160" y="370" width="80" height="90" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" />
                  </svg>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="section-label mb-2">Proyek Unggulan</div>
                    <div className="font-heading text-2xl text-brand-cream mb-1">Villa Puncak Elevasi</div>
                    <div className="text-brand-silver text-sm">Puncak, Bogor — 2024</div>

                    {/* Tags */}
                    <div className="flex gap-2 mt-4">
                      {['Kontemporer', 'Mewah', '1.200 m²'].map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 border border-brand-slate/50 text-brand-silver">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-brand-charcoal border border-gold/20 p-5 w-52 shadow-dark">
                  <div className="text-gold text-xs font-mono mb-2 uppercase tracking-widest">Nilai Proyek</div>
                  <div className="font-heading text-2xl text-brand-cream mb-1">Rp 12 M</div>
                  <div className="text-xs text-brand-silver">Diselesaikan tepat waktu</div>
                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-3 h-1 bg-gold rounded-full" />
                    ))}
                  </div>
                </div>

                {/* Floating quality badge */}
                <div className="absolute -top-4 -right-4 bg-gold text-brand-black p-4 text-center shadow-gold">
                  <div className="font-heading text-xl font-bold">ISO</div>
                  <div className="text-[10px] font-mono tracking-widest">9001:2015</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 ${i === currentSlide ? 'w-8 h-1 bg-gold' : 'w-3 h-1 bg-brand-slate hover:bg-brand-silver'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-brand-gray text-[10px] font-mono uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gray to-transparent" />
        <ArrowDown size={14} className="text-brand-gray animate-bounce" />
      </div>
    </section>
  )
}
