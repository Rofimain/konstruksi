'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, Star, X, Save, Loader2, Eye as EyeIcon, EyeOff } from 'lucide-react'
import { ImageUploader } from '@/components/ui/ImageUploader'
import type { BlogPostRow } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

const empty = (): Partial<BlogPostRow> => ({
  title: '', slug: '', excerpt: '', content: '', author: '', author_image: null,
  category: '', tags: [], cover_image: null,
  published_at: new Date().toISOString().split('T')[0],
  featured: false, read_time: 5, published: false,
})

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<BlogPostRow>>(empty())
  const [tagsInput, setTagsInput] = useState('')
  const [preview, setPreview] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/blog')
    const data = await res.json()
    setPosts(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const openNew = () => { setForm(empty()); setTagsInput(''); setShowForm(true); setMsg(''); setPreview(false) }
  const openEdit = (p: BlogPostRow) => {
    setForm(p); setTagsInput((p.tags || []).join(', '))
    setShowForm(true); setMsg(''); setPreview(false)
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
    const res = await fetch('/api/blog', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    })
    if (res.ok) { await load(); closeForm() }
    else { const d = await res.json(); setMsg(d.error || 'Gagal menyimpan') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus artikel ini?')) return
    await fetch('/api/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
  }

  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-brand-cream">Blog</h1>
          <p className="text-brand-silver text-sm mt-1">{posts.length} artikel</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5"><Plus size={16} /> Artikel Baru</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4">
          <div className="bg-brand-charcoal border border-brand-slate/30 w-full max-w-5xl">
            <div className="flex items-center justify-between p-6 border-b border-brand-slate/30">
              <h2 className="font-heading text-xl text-brand-cream">{form.id ? 'Edit Artikel' : 'Artikel Baru'}</h2>
              <div className="flex items-center gap-3">
                <button onClick={() => setPreview(!preview)}
                  className="flex items-center gap-2 text-sm text-brand-silver hover:text-gold transition-colors">
                  {preview ? <EyeOff size={14} /> : <EyeIcon size={14} />}
                  {preview ? 'Editor' : 'Preview'}
                </button>
                <button onClick={closeForm} className="text-brand-gray hover:text-brand-cream"><X size={20} /></button>
              </div>
            </div>

            {preview ? (
              <div className="p-8 prose-dark max-h-[70vh] overflow-y-auto">
                <h1 className="font-heading text-3xl text-brand-cream mb-4">{form.title}</h1>
                <p className="text-brand-silver mb-6">{form.excerpt}</p>
                <div className="text-brand-silver leading-relaxed whitespace-pre-wrap">{form.content}</div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {msg && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">{msg}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Judul *</label>
                      <input type="text" value={form.title || ''}
                        onChange={e => { const v = e.target.value; setForm(f => ({ ...f, title: v, slug: slugify(v) })) }}
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Ringkasan</label>
                      <textarea rows={2} value={form.excerpt || ''}
                        onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none" />
                    </div>
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Konten (Markdown didukung)</label>
                      <textarea rows={16} value={form.content || ''}
                        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none font-mono text-xs" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ImageUploader value={form.cover_image || ''} onChange={url => setForm(f => ({ ...f, cover_image: url }))} folder="blog" label="Foto Cover" />
                    <ImageUploader value={form.author_image || ''} onChange={url => setForm(f => ({ ...f, author_image: url }))} folder="team" label="Foto Penulis" />
                    {[
                      { k: 'author', l: 'Nama Penulis' },
                      { k: 'category', l: 'Kategori' },
                      { k: 'slug', l: 'Slug URL' },
                    ].map(({ k, l }) => (
                      <div key={k}>
                        <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">{l}</label>
                        <input type="text" value={(form as any)[k] || ''}
                          onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                          className={`w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold ${k === 'slug' ? 'font-mono' : ''}`} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Tags</label>
                      <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                        placeholder="arsitektur, tips, konstruksi"
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Waktu Baca (menit)</label>
                      <input type="number" value={form.read_time || 5}
                        onChange={e => setForm(f => ({ ...f, read_time: parseInt(e.target.value) }))}
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Tanggal Publikasi</label>
                      <input type="date" value={form.published_at ? String(form.published_at).split('T')[0] : ''}
                        onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))}
                        className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-2">
                      {[
                        { k: 'published', l: 'Publish (tampil di website)' },
                        { k: 'featured', l: 'Artikel Pilihan (featured)' },
                      ].map(({ k, l }) => (
                        <div key={k} className="flex items-center gap-2">
                          <input type="checkbox" id={k} checked={Boolean((form as any)[k])}
                            onChange={e => setForm(f => ({ ...f, [k]: e.target.checked }))} className="accent-gold w-4 h-4" />
                          <label htmlFor={k} className="text-brand-silver text-sm">{l}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 border-t border-brand-slate/30 flex justify-end gap-3">
              <button onClick={closeForm} className="btn-outline text-sm py-2.5">Batal</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 disabled:opacity-50">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : <><Save size={14} /> Simpan</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari artikel..."
          className="w-full bg-brand-charcoal border border-brand-slate/30 text-brand-cream text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold" />
      </div>

      <div className="bg-brand-charcoal border border-brand-slate/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={24} className="text-gold animate-spin" /></div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-brand-slate/30">
              <tr>{['Cover', 'Artikel', 'Kategori', 'Penulis', 'Status', 'Aksi'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-brand-gray text-xs uppercase tracking-widest">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-brand-slate/20">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-brand-slate/10">
                  <td className="px-4 py-3">
                    {p.cover_image
                      ? <img src={p.cover_image} alt={p.title} className="w-12 h-10 object-cover border border-brand-slate/30" />
                      : <div className="w-12 h-10 bg-brand-slate border border-brand-slate/30" />
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.featured && <Star size={12} className="text-gold fill-gold shrink-0" />}
                      <div>
                        <div className="text-brand-cream text-sm font-medium line-clamp-1">{p.title}</div>
                        <div className="text-brand-gray text-xs">{p.read_time} mnt baca</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-brand-silver text-sm">{p.category}</td>
                  <td className="px-4 py-3 text-brand-silver text-sm">{p.author}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-slate text-brand-gray'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${p.slug}`} target="_blank" className="text-brand-gray hover:text-brand-cream"><Eye size={14} /></Link>
                      <button onClick={() => openEdit(p)} className="text-brand-gray hover:text-gold"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-brand-gray hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr><td colSpan={6} className="text-center py-12 text-brand-gray">Belum ada artikel</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
