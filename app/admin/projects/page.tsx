'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle, X, Save, Loader2 } from 'lucide-react'
import { ImageUploader, MultiImageUploader } from '@/components/ui/ImageUploader'
import type { ProjectRow } from '@/lib/supabase'

type Status = 'completed' | 'ongoing' | 'upcoming'
const statusIcon: Record<Status, React.ReactNode> = {
  completed: <CheckCircle size={14} className="text-emerald-400" />,
  ongoing:   <Clock size={14} className="text-gold" />,
  upcoming:  <AlertCircle size={14} className="text-blue-400" />,
}
const statusLabel: Record<Status, string> = { completed: 'Selesai', ongoing: 'Berjalan', upcoming: 'Akan Datang' }

const empty = (): Partial<ProjectRow> => ({
  title: '', subtitle: '', slug: '', category: '', location: '', area: '',
  duration: '', year: new Date().getFullYear(), status: 'ongoing', client: '',
  description: '', full_description: '', cover_image: null, images: [], tags: [],
  featured: false, value: null, architect: null,
})

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<ProjectRow>>(empty())
  const [tagsInput, setTagsInput] = useState('')
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const openNew = () => {
    setForm(empty()); setTagsInput(''); setShowForm(true); setMsg('')
  }
  const openEdit = (p: ProjectRow) => {
    setForm(p); setTagsInput((p.tags || []).join(', ')); setShowForm(true); setMsg('')
  }
  const closeForm = () => { setShowForm(false); setForm(empty()); setTagsInput('') }

  const handleSave = async () => {
    if (!form.title) return setMsg('Judul wajib diisi')
    setSaving(true); setMsg('')
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title || ''),
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    }
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) { await load(); closeForm() }
    else { const d = await res.json(); setMsg(d.error || 'Gagal menyimpan') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus proyek ini?')) return
    await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
  }

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const F = (key: keyof ProjectRow) => (
    form[key] !== undefined ? String(form[key]) : ''
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-brand-cream">Proyek</h1>
          <p className="text-brand-silver text-sm mt-1">{projects.length} total</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5"><Plus size={16} /> Proyek Baru</button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4">
          <div className="bg-brand-charcoal border border-brand-slate/30 w-full max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b border-brand-slate/30">
              <h2 className="font-heading text-xl text-brand-cream">{form.id ? 'Edit Proyek' : 'Proyek Baru'}</h2>
              <button onClick={closeForm} className="text-brand-gray hover:text-brand-cream"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              {msg && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">{msg}</div>}
              
              {/* Cover Image */}
              <ImageUploader
                value={form.cover_image || ''}
                onChange={url => setForm(f => ({ ...f, cover_image: url }))}
                folder="projects"
                label="Foto Cover Utama"
              />

              {/* Gallery */}
              <MultiImageUploader
                values={form.images || []}
                onChange={urls => setForm(f => ({ ...f, images: urls }))}
                folder="projects"
                label="Galeri Foto Proyek"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { k: 'title', l: 'Judul *', col: 2 },
                  { k: 'subtitle', l: 'Subtitle' },
                  { k: 'category', l: 'Kategori' },
                  { k: 'location', l: 'Lokasi' },
                  { k: 'area', l: 'Luas Area' },
                  { k: 'duration', l: 'Durasi' },
                  { k: 'client', l: 'Klien' },
                  { k: 'value', l: 'Nilai Proyek' },
                  { k: 'architect', l: 'Arsitek' },
                ].map(({ k, l, col }) => (
                  <div key={k} className={col === 2 ? 'md:col-span-2' : ''}>
                    <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">{l}</label>
                    <input type="text" value={F(k as keyof ProjectRow)}
                      onChange={e => {
                        const v = e.target.value
                        if (k === 'title') setForm(f => ({ ...f, title: v, slug: slugify(v) }))
                        else setForm(f => ({ ...f, [k]: v }))
                      }}
                      className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                  </div>
                ))}

                <div>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Slug URL</label>
                  <input type="text" value={form.slug || ''}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold font-mono" />
                </div>

                <div>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Tahun</label>
                  <input type="number" value={form.year || new Date().getFullYear()}
                    onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                </div>

                <div>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Status</label>
                  <select value={form.status || 'ongoing'}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold">
                    <option value="ongoing">Sedang Berjalan</option>
                    <option value="completed">Selesai</option>
                    <option value="upcoming">Akan Datang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Tags (pisahkan koma)</label>
                  <input type="text" value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    placeholder="Kontemporer, Mewah, Modern"
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input type="checkbox" id="featured" checked={form.featured || false}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-gold w-4 h-4" />
                  <label htmlFor="featured" className="text-brand-silver text-sm">Tampilkan di Beranda (Featured)</label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Deskripsi Singkat</label>
                  <textarea rows={2} value={form.description || ''}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Deskripsi Lengkap</label>
                  <textarea rows={5} value={form.full_description || ''}
                    onChange={e => setForm(f => ({ ...f, full_description: e.target.value }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none" />
                </div>
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

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari proyek..."
          className="w-full bg-brand-charcoal border border-brand-slate/30 text-brand-cream text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold" />
      </div>

      {/* Table */}
      <div className="bg-brand-charcoal border border-brand-slate/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="text-gold animate-spin" /></div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-brand-slate/30">
              <tr>{['Cover', 'Proyek', 'Kategori', 'Tahun', 'Status', 'Aksi'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-brand-gray text-xs uppercase tracking-widest">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-brand-slate/20">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-brand-slate/10 transition-colors">
                  <td className="px-4 py-3">
                    {p.cover_image
                      ? <img src={p.cover_image} alt={p.title} className="w-12 h-10 object-cover border border-brand-slate/30" />
                      : <div className="w-12 h-10 bg-brand-slate border border-brand-slate/30 flex items-center justify-center text-brand-gray text-xs">No img</div>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-brand-cream text-sm font-medium">{p.title}</div>
                    <div className="text-brand-gray text-xs">{p.location}</div>
                  </td>
                  <td className="px-4 py-3 text-brand-silver text-sm">{p.category}</td>
                  <td className="px-4 py-3 text-brand-silver text-sm font-mono">{p.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon[p.status as Status]}
                      <span className="text-xs text-brand-silver">{statusLabel[p.status as Status]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/portfolio/${p.slug}`} target="_blank" className="text-brand-gray hover:text-brand-cream transition-colors"><Eye size={14} /></Link>
                      <button onClick={() => openEdit(p)} className="text-brand-gray hover:text-gold transition-colors"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-brand-gray hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr><td colSpan={6} className="text-center py-12 text-brand-gray">Belum ada proyek</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
