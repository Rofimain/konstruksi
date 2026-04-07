'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2, X, Save, Loader2, GripVertical } from 'lucide-react'
import { ImageUploader } from '@/components/ui/ImageUploader'
import type { TeamRow } from '@/lib/supabase'

const empty = (): Partial<TeamRow> => ({ name: '', role: '', bio: '', image: null, order: 0, linkedin: null, instagram: null })

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<TeamRow>>(empty())
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/team')
    const data = await res.json()
    setTeam(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openEdit = (m: TeamRow) => { setForm(m); setShowForm(true); setMsg('') }
  const openNew = () => { setForm({ ...empty(), order: team.length }); setShowForm(true); setMsg('') }
  const closeForm = () => { setShowForm(false); setForm(empty()) }

  const handleSave = async () => {
    if (!form.name) return setMsg('Nama wajib diisi')
    setSaving(true); setMsg('')
    const res = await fetch('/api/team', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (res.ok) { await load(); closeForm() }
    else { const d = await res.json(); setMsg(d.error || 'Gagal') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus anggota tim ini?')) return
    await fetch('/api/team', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-heading text-3xl text-brand-cream">Tim</h1><p className="text-brand-silver text-sm mt-1">{team.length} anggota</p></div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5"><Plus size={16} /> Tambah Anggota</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8 px-4">
          <div className="bg-brand-charcoal border border-brand-slate/30 w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-brand-slate/30">
              <h2 className="font-heading text-xl text-brand-cream">{form.id ? 'Edit Anggota' : 'Anggota Baru'}</h2>
              <button onClick={closeForm} className="text-brand-gray hover:text-brand-cream"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              {msg && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2">{msg}</div>}
              <ImageUploader value={form.image || ''} onChange={url => setForm(f => ({ ...f, image: url }))} folder="team" label="Foto Profil" />
              {[
                { k: 'name', l: 'Nama Lengkap *' }, { k: 'role', l: 'Jabatan' },
                { k: 'linkedin', l: 'LinkedIn URL' }, { k: 'instagram', l: 'Instagram URL' },
              ].map(({ k, l }) => (
                <div key={k}>
                  <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">{l}</label>
                  <input type="text" value={(form as any)[k] || ''}
                    onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                    className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
                </div>
              ))}
              <div>
                <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Bio</label>
                <textarea rows={3} value={form.bio || ''}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold resize-none" />
              </div>
              <div>
                <label className="block text-brand-gray text-xs mb-1 uppercase tracking-widest">Urutan Tampil</label>
                <input type="number" value={form.order || 0}
                  onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) }))}
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm px-3 py-2 focus:outline-none focus:border-gold" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map(m => (
            <div key={m.id} className="bg-brand-charcoal border border-brand-slate/30 hover:border-gold/20 transition-all group">
              <div className="h-48 bg-brand-slate relative overflow-hidden">
                {m.image
                  ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="font-heading text-5xl text-gold/30">{m.name[0]}</span></div>
                }
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(m)} className="w-8 h-8 bg-brand-charcoal/90 flex items-center justify-center text-gold hover:bg-gold hover:text-brand-black transition-colors">
                    <Edit size={12} />
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="w-8 h-8 bg-brand-charcoal/90 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="section-label text-[10px] mb-1">{m.role}</div>
                <div className="text-brand-cream font-heading">{m.name}</div>
                <div className="text-brand-silver text-xs mt-2 line-clamp-2">{m.bio}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {team.length === 0 && !loading && (
        <div className="text-center py-16 text-brand-gray">Belum ada anggota tim. Klik "Tambah Anggota" untuk memulai.</div>
      )}
    </div>
  )
}
