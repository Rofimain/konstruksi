import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Award, Shield, Users, Zap } from 'lucide-react'
import { team, stats, siteConfig } from '@/data'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Mengenal lebih dekat Rofimain Konstruksi — visi, misi, nilai, dan tim profesional kami.',
}

const values = [
  { icon: Shield, title: 'Integritas', desc: 'Kejujuran dan transparansi adalah fondasi setiap hubungan dengan klien kami.' },
  { icon: Award, title: 'Kualitas', desc: 'Standar kualitas tertinggi tanpa kompromi di setiap tahap pembangunan.' },
  { icon: Zap, title: 'Inovasi', desc: 'Selalu mengadopsi teknologi dan metode konstruksi terkini.' },
  { icon: Users, title: 'Kolaborasi', desc: 'Bekerja sebagai satu tim dengan klien, konsultan, dan mitra.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/4 blur-[100px]" />
        <div className="container-xl relative">
          <div className="section-label mb-6">Tentang Kami</div>
          <h1 className="font-heading text-fluid-4xl font-bold text-brand-cream max-w-3xl mb-8">
            Membangun dengan <span className="text-gold-gradient">Presisi</span>,<br />Tumbuh dengan <span className="text-gold-gradient">Integritas</span>
          </h1>
          <p className="text-brand-silver text-lg max-w-2xl leading-relaxed">
            Sejak 2009, Rofimain Konstruksi telah menjadi mitra terpercaya dalam mewujudkan berbagai proyek konstruksi premium di Indonesia — dari hunian pribadi hingga gedung komersial bertaraf internasional.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-brand-dark">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4">Kisah Kami</div>
              <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream mb-6">
                15 Tahun Membangun<br />Indonesia
              </h2>
              <div className="space-y-4 text-brand-silver leading-relaxed">
                <p>Didirikan oleh Ir. Andika Prasetyo pada tahun 2009, Rofimain Konstruksi lahir dari visi sederhana namun kuat: membuktikan bahwa konstruksi berkualitas tinggi dan harga yang fair bukanlah sesuatu yang mustahil di Indonesia.</p>
                <p>Berawal dari proyek-proyek residensial kecil di Bogor, kami berkembang secara konsisten berkat reputasi yang dibangun dari kepuasan klien demi klien. Kini, ROFIMAIN telah menjangkau proyek-proyek berskala besar di seluruh Indonesia.</p>
                <p>Kami percaya bahwa setiap bangunan adalah warisan. Warisan bagi penghuninya, bagi komunitasnya, dan bagi generasi yang akan datang. Filosofi ini mendorong kami untuk selalu memberikan yang terbaik.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-brand-charcoal border border-brand-slate/30 p-6 hover:border-gold/30 transition-colors">
                  <div className="font-heading text-4xl font-bold text-gold mb-2">{s.value}{s.suffix}</div>
                  <div className="text-brand-cream font-medium text-sm mb-1">{s.label}</div>
                  <div className="text-brand-gray text-xs">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-black">
        <div className="container-xl">
          <div className="section-label mb-4 text-center">Nilai-Nilai Kami</div>
          <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream text-center mb-16">Prinsip yang Memandu Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-8 border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 group">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/5 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-xl text-brand-cream mb-3">{title}</h3>
                <p className="text-brand-silver text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-brand-dark">
        <div className="container-xl">
          <div className="section-label mb-4">Tim Kepemimpinan</div>
          <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream mb-16">Orang-Orang di Balik ROFIMAIN</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="h-64 bg-brand-charcoal border border-brand-slate/30 group-hover:border-gold/30 transition-all duration-300 relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-charcoal flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-slate border-2 border-gold/20 flex items-center justify-center">
                      <span className="font-heading text-3xl font-bold text-gold">{member.name.split(' ')[1]?.[0] || member.name[0]}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-black to-transparent">
                    <div className="section-label text-[10px]">{member.role}</div>
                  </div>
                </div>
                <h3 className="font-heading text-lg text-brand-cream group-hover:text-gold transition-colors">{member.name}</h3>
                <p className="text-brand-silver text-xs leading-relaxed mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-brand-charcoal">
        <div className="container-xl">
          <div className="section-label mb-4 text-center">Sertifikasi & Penghargaan</div>
          <h2 className="font-heading text-fluid-xl font-bold text-brand-cream text-center mb-12">Diakui Secara Nasional & Internasional</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001', 'LEED AP', 'Greenship Professional', 'LPJK Grade-7'].map((cert) => (
              <div key={cert} className="px-6 py-3 border border-gold/30 text-gold text-sm font-mono hover:bg-gold/5 transition-colors">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-dark">
        <div className="container-xl text-center">
          <h2 className="font-heading text-fluid-2xl font-bold text-brand-cream mb-4">
            Bergabunglah dengan 280+ Klien Puas Kami
          </h2>
          <p className="text-brand-silver mb-8">Jadikan proyek Anda bagian dari portofolio kebanggaan kami.</p>
          <Link href="/contact" className="btn-primary">
            Mulai Konsultasi <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
