'use client'
import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

interface Settings {
  phone?: string
  email?: string
  address?: string
  whatsapp?: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [settings, setSettings] = useState<Settings>({
    phone: '+62 21 5555 7890',
    email: 'info@rofimain.com',
    address: 'Menara Sudirman, Lt. 12 Suite A, Jl. Jenderal Sudirman Kav. 60, Jakarta Selatan 12190',
  })

  useEffect(() => {
    fetch('/api/settings/public')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSettings(data) })
      .catch(() => {})
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="pt-40 pb-20 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '60px 60px' }} />
        <div className="container-xl relative">
          <div className="section-label mb-6">Hubungi Kami</div>
          <h1 className="font-heading text-fluid-4xl font-bold text-brand-cream mb-6">
            Mari <span className="text-gold-gradient">Bicara</span> tentang<br />Proyek Anda
          </h1>
          <p className="text-brand-silver text-lg max-w-xl">
            Kami siap mendengarkan visi Anda dan memberikan solusi konstruksi terbaik. Konsultasi awal kami 100% gratis.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-dark pb-28">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                <h2 className="font-heading text-xl text-brand-cream mb-6">Informasi Kontak</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: 'Telepon', value: settings.phone || '', href: `tel:${settings.phone}` },
                    { icon: Mail, label: 'Email', value: settings.email || '', href: `mailto:${settings.email}` },
                    { icon: MapPin, label: 'Alamat', value: settings.address || '' },
                    { icon: Clock, label: 'Jam Kerja', value: 'Senin – Jumat: 08.00 – 17.00\nSabtu: 08.00 – 13.00' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <div className="text-brand-gray text-xs mb-1">{label}</div>
                        {href ? (
                          <a href={href} className="text-brand-cream text-sm hover:text-gold transition-colors">{value}</a>
                        ) : (
                          <div className="text-brand-cream text-sm whitespace-pre-line">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/20 p-6">
                <h3 className="font-heading text-lg text-gold mb-3">Konsultasi Gratis</h3>
                <p className="text-brand-silver text-sm leading-relaxed">
                  Hubungi kami sekarang dan dapatkan konsultasi proyek konstruksi secara gratis bersama tim ahli kami.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Estimasi Biaya', 'Desain Awal', 'Analisis Lahan'].map(item => (
                    <span key={item} className="text-xs px-3 py-1 border border-gold/30 text-gold">{item}</span>
                  ))}
                </div>
              </div>

              {settings.whatsapp && (
                <a href={`https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 transition-colors p-4 text-white w-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-medium">Chat WhatsApp</span>
                </a>
              )}
            </div>

            <div className="lg:col-span-3">
              <div className="bg-brand-charcoal border border-brand-slate/30 p-8">
                <h2 className="font-heading text-2xl text-brand-cream mb-8">Kirim Pesan</h2>
                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                    <h3 className="font-heading text-2xl text-brand-cream mb-2">Pesan Terkirim!</h3>
                    <p className="text-brand-silver">Tim kami akan menghubungi Anda dalam 1×24 jam kerja.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 btn-outline">Kirim Pesan Lain</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Nama Lengkap</label>
                        <input type="text" required placeholder="Budi Santoso"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-brand-gray" />
                      </div>
                      <div>
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Email</label>
                        <input type="email" required placeholder="budi@email.com"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-brand-gray" />
                      </div>
                      <div>
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Nomor HP</label>
                        <input type="tel" placeholder="+62 812 3456 7890"
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-brand-gray" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Layanan yang Diminati</label>
                        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold">
                          <option value="">Pilih Layanan</option>
                          {['Konstruksi Residensial','Konstruksi Komersial','Desain Interior','Infrastruktur','Renovasi & Restorasi','Manajemen Proyek'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Deskripsi Proyek</label>
                        <textarea required rows={5} placeholder="Ceritakan kebutuhan proyek Anda..."
                          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold placeholder:text-brand-gray resize-none" />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Kirim Pesan <Send size={16} />
                    </button>
                    <p className="text-brand-gray text-xs text-center">Data Anda aman. Kami tidak akan membagikan informasi pribadi Anda.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
