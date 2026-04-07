'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Upload, Trash2, Copy, Check, Loader2, Image as ImageIcon, Search } from 'lucide-react'

interface MediaFile {
  name: string; url: string; size: number; created_at: string
}

export default function AdminMediaPage() {
  const [files, setFiles]       = useState<MediaFile[]>([])
  const [loading, setLoading]   = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied]     = useState<string | null>(null)
  const [search, setSearch]     = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch via API to avoid exposing Supabase URL in client
      const res = await fetch('/api/media')
      if (res.ok) {
        const data = await res.json()
        setFiles(Array.isArray(data) ? data : [])
      }
    } catch { setFiles([]) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleUpload = async (fileList: FileList) => {
    setUploading(true)
    for (const file of Array.from(fileList)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'library')
      try { await fetch('/api/upload', { method: 'POST', body: fd }) } catch {}
    }
    await load()
    setUploading(false)
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm('Hapus file ini?')) return
    await fetch('/api/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: file.url }),
    })
    await load()
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
  const fmtSize  = (b: number) => b < 1048576 ? `${(b / 1024).toFixed(1)}KB` : `${(b / 1048576).toFixed(1)}MB`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-brand-cream">Media Library</h1>
          <p className="text-brand-silver text-sm mt-1">{files.length} file</p>
        </div>
        <button onClick={() => inputRef.current?.click()} disabled={uploading}
          className="btn-primary text-sm py-2.5 disabled:opacity-50">
          {uploading ? <><Loader2 size={14} className="animate-spin" /> Mengupload...</> : <><Upload size={16} /> Upload Gambar</>}
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => { if (e.target.files?.length) handleUpload(e.target.files) }} />
      </div>

      <div
        onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files) }}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-brand-slate/40 hover:border-gold/40 transition-colors p-8 text-center cursor-pointer"
      >
        <ImageIcon size={32} className="text-brand-gray mx-auto mb-2" />
        <p className="text-brand-silver text-sm">Drag & drop gambar ke sini, atau klik untuk pilih file</p>
        <p className="text-brand-gray text-xs mt-1">JPG, PNG, WebP, GIF, AVIF — maks 10MB</p>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari file..."
          className="w-full bg-brand-charcoal border border-brand-slate/30 text-brand-cream text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={24} className="text-gold animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(file => (
            <div key={file.name} className="group relative bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all overflow-hidden">
              <div className="aspect-square overflow-hidden bg-brand-slate">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div className="p-2">
                <div className="text-brand-cream text-xs truncate">{file.name.split('/').pop()}</div>
                <div className="text-brand-gray text-xs">{fmtSize(file.size)}</div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => copyUrl(file.url)}
                  className="w-7 h-7 bg-brand-charcoal/90 flex items-center justify-center text-brand-cream hover:text-gold transition-colors">
                  {copied === file.url ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
                <button onClick={() => handleDelete(file)}
                  className="w-7 h-7 bg-brand-charcoal/90 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-brand-gray">
              {files.length === 0 ? 'Belum ada file. Upload gambar pertama kamu!' : 'Tidak ada file yang cocok.'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
