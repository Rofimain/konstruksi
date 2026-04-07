// components/sections/WhyUsSection.tsx
import { Shield, Award, Clock, Users, Zap, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Garansi Konstruksi 10 Tahun',
    description: 'Kami begitu yakin dengan kualitas pekerjaan kami sehingga memberikan garansi struktural selama 10 tahun penuh.',
  },
  {
    icon: Award,
    title: 'Sertifikasi ISO 9001:2015',
    description: 'Sistem manajemen mutu kami tersertifikasi ISO, memastikan standar kualitas konsisten di setiap proyek.',
  },
  {
    icon: Clock,
    title: 'Tepat Waktu & Anggaran',
    description: 'Rekam jejak 96% proyek selesai sesuai jadwal dan anggaran yang disepakati, tanpa biaya tersembunyi.',
  },
  {
    icon: Users,
    title: 'Tim 120+ Profesional',
    description: 'Arsitek, insinyur, desainer, dan project manager berpengalaman yang bekerja secara sinergis.',
  },
  {
    icon: Zap,
    title: 'Teknologi BIM & Smart Build',
    description: 'Menggunakan Building Information Modeling (BIM) untuk perencanaan presisi dan efisiensi konstruksi.',
  },
  {
    icon: HeartHandshake,
    title: 'Layanan Purna Jual',
    description: 'Dukungan dan pemeliharaan berkelanjutan setelah serah terima untuk memastikan bangunan Anda selalu prima.',
  },
]

const certifications = [
  { label: 'ISO 9001:2015', desc: 'Manajemen Mutu' },
  { label: 'OHSAS 18001', desc: 'Keselamatan Kerja' },
  { label: 'ISO 14001', desc: 'Manajemen Lingkungan' },
  { label: 'LEED AP', desc: 'Green Building' },
]

export function WhyUsSection() {
  return (
    <section className="relative py-28 bg-brand-dark overflow-hidden">
      {/* Angled divider top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-brand-black clip-diagonal" />

      {/* Decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 border border-gold/10 rotate-45" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-44 h-44 border border-gold/5 rotate-45" />

      <div className="container-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Content */}
          <div>
            <div className="section-label mb-4">Mengapa ROFIMAIN</div>
            <h2 className="font-heading text-fluid-3xl font-bold text-brand-cream mb-6 leading-tight">
              Lebih dari Sekadar<br />
              <span className="text-gold-gradient">Kontraktor Biasa</span>
            </h2>
            <p className="text-brand-silver text-lg leading-relaxed mb-10">
              Kami adalah mitra pembangunan jangka panjang Anda. Setiap keputusan yang kami buat mengutamakan kepentingan klien, kualitas terbaik, dan keberlanjutan lingkungan.
            </p>

            {/* Reasons */}
            <div className="space-y-6">
              {reasons.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 border border-brand-slate/50 flex items-center justify-center text-gold group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-cream mb-1 group-hover:text-gold transition-colors duration-300">
                      {title}
                    </h4>
                    <p className="text-brand-silver text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual + Certifications */}
          <div className="relative">
            {/* Main visual block */}
            <div className="relative h-[520px] bg-brand-charcoal border border-brand-slate/40 overflow-hidden">
              {/* Abstract construction illustration */}
              <div className="absolute inset-0 p-8">
                <svg viewBox="0 0 400 480" className="w-full h-full opacity-20 text-gold" fill="none">
                  {/* Blueprint grid */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 48} x2="400" y2={i * 48} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  ))}
                  {/* Building outline */}
                  <rect x="60" y="120" width="280" height="340" stroke="currentColor" strokeWidth="2" />
                  <rect x="100" y="150" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="175" y="150" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="250" y="150" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="100" y="230" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="175" y="230" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="250" y="230" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="100" y="310" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="175" y="310" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="250" y="310" width="60" height="60" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="155" y="390" width="90" height="70" stroke="currentColor" strokeWidth="2" />
                  {/* Roof */}
                  <polyline points="40,120 200,40 360,120" stroke="currentColor" strokeWidth="2" />
                  {/* Dimension lines */}
                  <line x1="40" y1="480" x2="360" y2="480" stroke="currentColor" strokeWidth="1" />
                  <line x1="40" y1="470" x2="40" y2="490" stroke="currentColor" strokeWidth="1" />
                  <line x1="360" y1="470" x2="360" y2="490" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="gold-line mb-6" />
                <div className="font-heading text-2xl text-brand-cream mb-2">Blueprint Kualitas</div>
                <div className="text-brand-silver text-sm max-w-xs">
                  Setiap proyek dimulai dengan perencanaan detail menggunakan teknologi BIM terkini.
                </div>
              </div>

              {/* Top right badge */}
              <div className="absolute top-6 right-6 border border-gold/40 bg-brand-charcoal px-4 py-2">
                <div className="text-xs font-mono text-gold">BIM Level 2</div>
                <div className="text-[10px] text-brand-silver">Digital Construction</div>
              </div>
            </div>

            {/* Certifications row */}
            <div className="mt-6 grid grid-cols-4 gap-3">
              {certifications.map((cert) => (
                <div key={cert.label} className="bg-brand-charcoal border border-brand-slate/40 p-3 text-center hover:border-gold/30 transition-colors duration-300">
                  <div className="text-gold text-sm font-mono font-bold mb-1">{cert.label}</div>
                  <div className="text-brand-gray text-[10px] leading-tight">{cert.desc}</div>
                </div>
              ))}
            </div>

            {/* Floating experience tag */}
            <div className="absolute -left-8 top-1/3 bg-gold text-brand-black px-5 py-4 shadow-gold">
              <div className="font-heading text-3xl font-bold">15</div>
              <div className="text-[10px] font-mono uppercase tracking-widest">Tahun</div>
              <div className="text-[10px] font-mono uppercase tracking-widest">Pengalaman</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
