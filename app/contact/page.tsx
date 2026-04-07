'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/data'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

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
          <p className="text-brand-silver text-lg max-w-xl">Kami siap mendengarkan visi Anda dan memberikan solusi konstruksi terbaik. Konsultasi awal kami 100% gratis.</p>
        </div>
      </section>

      <section className="py-16 bg-brand-dark pb-28">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                <h2 className="font-heading text-xl text-brand-cream mb-6">Informasi Kontak</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: 'Telepon', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                    { icon: MapPin, label: 'Alamat', value: siteConfig.address },
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
                <p className="text-brand-silver text-sm leading-relaxed">Hubungi kami sekarang dan dapatkan konsultasi proyek konstruksi secara gratis bersama tim ahli kami.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Estimasi Biaya', 'Desain Awal', 'Analisis Lahan'].map(item => (
                    <span key={item} className="text-xs px-3 py-1 border border-gold/30 text-gold">{item}</span>
                  ))}
                </div>
              </div>

              <div className="bg-brand-charcoal border border-brand-slate/30 p-6">
                <h3 className="font-heading text-lg text-brand-cream mb-4">Lokasi Kami</h3>
                <div className="h-40 bg-brand-slate relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={32} className="text-gold mx-auto mb-2" />
                      <div className="text-brand-silver text-xs">DIPO Tower, Jakarta Selatan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
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
                      {[
                        { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso' },
                        { key: 'email', label: 'Email', type: 'email', placeholder: 'budi@email.com' },
                        { key: 'phone', label: 'Nomor HP', type: 'tel', placeholder: '+62 812 3456 7890' },
                      ].map(({ key, label, type, placeholder }) => (
                        <div key={key} className={key === 'name' ? 'md:col-span-2' : ''}>
                          <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">{label}</label>
                          <input type={type} required placeholder={placeholder}
                            value={form[key as keyof typeof form]}
                            onChange={e => setForm({ ...form, [key]: e.target.value })}
                            className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-brand-gray" />
                        </div>
                      ))}
                      <div className="md:col-span-2">
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Layanan yang Diminati</label>
                        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors">
                          <option value="">Pilih Layanan</option>
                          {['Konstruksi Residensial', 'Konstruksi Komersial', 'Desain Interior', 'Infrastruktur', 'Renovasi & Restorasi', 'Manajemen Proyek'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-brand-silver text-xs mb-2 uppercase tracking-widest">Deskripsi Proyek</label>
                        <textarea required rows={5} placeholder="Ceritakan kebutuhan proyek Anda..."
                          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-brand-gray resize-none" />
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
