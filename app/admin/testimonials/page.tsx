'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2, X, Save, Loader2, Star } from 'lucide-react'
import { ImageUploader } from '@/components/ui/ImageUploader'
import type { TestimonialRow } from '@/lib/supabase'

const empty = (): Partial<TestimonialRow> => ({ name: '', role: '', company: '', content: '', rating: 5, image: null, featured: false })

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<TestimonialRow>>(empty())
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (t: TestimonialRow) => { setForm(t); setShowForm(true); setMsg('') }
  const openNew = () => { setForm(empty()); setShowForm(true); setMsg('') }
  const closeForm = () => { setShowForm(false); setForm(empty()) }

  const handleSave = async () => {
    if (!form.name) return setMsg('Nama wajib diisi')
    setSaving(true); setMsg('')
    const res = await fetch('/api/testimonials', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (res.ok) { await load(); closeForm() }
    else { const d = await res.json(); setMsg(d.error || 'Gagal') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return
    await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-heading text-3xl text-brand-cream">Testimoni</h1><p className="text-brand-silver text-sm mt-1">{items.length} testimoni</p></div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5"><Plus size={16} /> Tambah Testimoni</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4">
          <div className="bg-brand-charcoal border border-brand-slate/30 w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-brand-slate/30">
              <h2 className="font-heading text-xl text-brand-cream">{form.id ? 'Edit Testimoni' : 'Testimoni Baru'}</h2>
              <button onClick={closeForm} className="text-brand-gray hover:text-brand-cream"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {msg && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">{msg}</div>}
              <ImageUploader value={form.image || ''} onChange={url => setForm(f => ({ ...f, image: url }))} folder="testimonials" label="Foto Klien" />
              {[{ k: 'name', l: 'Nama *' }, { k: 'role', l: 'Jabatan' }, { k: 'company', l: 'Perusahaan' }].map(({ k, l }) => (
                <div key={k}>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">{l}</label>
                  <input type="text" value={(form as any)[k] || ''}
                    onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                </div>
              ))}
              <div>
                <label className="block text-brand-gray text-xs mb-2 uppercase tracking-widest">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}
                      className={`transition-colors ${n <= (form.rating || 5) ? 'text-gold' : 'text-brand-slate'}`}>
                      <Star size={24} className={n <= (form.rating || 5) ? 'fill-gold' : ''} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Isi Testimoni</label>
                <textarea rows={4} value={form.content || ''}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="tfeatured" checked={form.featured || false}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-gold w-4 h-4" />
                <label htmlFor="tfeatured" className="text-brand-silver text-sm">Tampilkan di beranda</label>
              </div>
            </div>
            <div className="p-6 border-t border-brand-slate/30 flex justify-end gap-3">
              <button onClick={closeForm} className="btn-outline text-sm py-2.5">Batal</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : <><Save size={14} /> Simpan</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="text-gold animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(t => (
            <div key={t.id} className="bg-brand-charcoal border border-brand-slate/30 p-5 group relative">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= t.rating ? 'text-gold fill-gold' : 'text-brand-slate'} />)}
              </div>
              <p className="text-brand-silver text-sm italic mb-4 line-clamp-3">"{t.content}"</p>
              <div className="flex items-center gap-3">
                {t.image ? <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover" /> :
                  <div className="w-8 h-8 rounded-full bg-brand-slate flex items-center justify-center text-gold text-sm font-bold">{t.name[0]}</div>}
                <div><div className="text-brand-cream text-sm font-medium">{t.name}</div>
                  <div className="text-brand-gray text-xs">{t.role}{t.company && `, ${t.company}`}</div></div>
              </div>
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(t)} className="w-7 h-7 bg-brand-dark flex items-center justify-center text-gold hover:bg-gold hover:text-brand-black transition-colors"><Edit size={11} /></button>
                <button onClick={() => handleDelete(t.id)} className="w-7 h-7 bg-brand-dark flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={11} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length === 0 && !loading && (
        <div className="text-center py-16 text-brand-gray">Belum ada testimoni.</div>
      )}
    </div>
  )
}
