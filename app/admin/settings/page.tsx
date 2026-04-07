'use client'
import { useState, useEffect } from 'react'
import { Save, CheckCircle, Loader2 } from 'lucide-react'

const fieldGroups = [
  {
    title: 'Informasi Perusahaan',
    fields: [
      { key: 'site_name', label: 'Nama Website', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Deskripsi SEO', type: 'textarea' },
      { key: 'phone', label: 'Nomor Telepon', type: 'text' },
      { key: 'whatsapp', label: 'Nomor WhatsApp', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'address', label: 'Alamat Lengkap', type: 'textarea' },
      { key: 'city', label: 'Kota', type: 'text' },
    ]
  },
  {
    title: 'Media Sosial',
    fields: [
      { key: 'instagram', label: 'Instagram URL', type: 'url' },
      { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
      { key: 'facebook', label: 'Facebook URL', type: 'url' },
      { key: 'youtube', label: 'YouTube URL', type: 'url' },
    ]
  }
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => { setSettings(d); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true); setSaved(false)
    await fetch('/api/settings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 size={24} className="text-gold animate-spin" /></div>

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div><h1 className="font-heading text-3xl text-brand-cream">Pengaturan</h1>
          <p className="text-brand-silver text-sm mt-1">Konfigurasi informasi website</p></div>
        <button onClick={handleSave} disabled={saving}
          className={`btn-primary text-sm py-2.5 disabled:opacity-50 ${saved ? 'bg-emerald-500 hover:bg-emerald-500' : ''}`}>
          {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</>
            : saved ? <><CheckCircle size={14} /> Tersimpan!</>
            : <><Save size={14} /> Simpan Perubahan</>}
        </button>
      </div>

      {fieldGroups.map(group => (
        <div key={group.title} className="bg-brand-charcoal border border-brand-slate/30 p-6 space-y-4">
          <h2 className="font-heading text-lg text-brand-cream border-b border-brand-slate/30 pb-3">{group.title}</h2>
          {group.fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">{label}</label>
              {type === 'textarea' ? (
                <textarea rows={3} value={settings[key] || ''}
                  onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-2.5 focus:outline-none focus:border-gold resize-none" />
              ) : (
                <input type={type} value={settings[key] || ''}
                  onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-4 py-2.5 focus:outline-none focus:border-gold" />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="bg-gold/5 border border-gold/20 p-5">
        <h3 className="text-gold font-medium mb-2 text-sm">Catatan</h3>
        <ul className="text-brand-silver text-xs space-y-1">
          <li>• Perubahan settings langsung berlaku setelah disimpan</li>
          <li>• WhatsApp: format +628xxxxxxxxxx (tanpa spasi)</li>
          <li>• URL sosmed: sertakan https://</li>
        </ul>
      </div>
    </div>
  )
}
