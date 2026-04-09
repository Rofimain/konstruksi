'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Upload, Trash2, Copy, Check, Loader2, Image as ImageIcon, Search, RefreshCw } from 'lucide-react'

interface MediaFile {
  name: string; url: string; size: number; created_at: string
}

export default function AdminMediaPage() {
  const [files,     setFiles]     = useState<MediaFile[]>([])
  const [loading,   setLoading]   = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied,    setCopied]    = useState<string | null>(null)
  const [search,    setSearch]    = useState('')
  const [error,     setError]     = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/media')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setFiles(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Gagal memuat media. Pastikan Supabase Storage sudah dikonfigurasi.')
      setFiles([])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleUpload = async (fileList: FileList) => {
    setUploading(true); setError('')
    let successCount = 0
    for (const file of Array.from(fileList)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'library')
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (res.ok) successCount++
        else {
          const d = await res.json()
          setError(d.error || 'Upload gagal')
        }
      } catch { setError('Upload gagal. Cek koneksi.') }
    }
    if (successCount > 0) await load()
    setUploading(false)
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Hapus file "${file.name.split('/').pop()}"?`)) return
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: file.url }),
      })
      await load()
    } catch { setError('Gagal menghapus file.') }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
  const fmtSize  = (b: number) => {
    if (!b) return '—'
    return b < 1048576 ? `${(b/1024).toFixed(1)}KB` : `${(b/1048576).toFixed(1)}MB`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-brand-cream">Media Library</h1>
          <p className="text-brand-silver text-sm mt-1">{files.length} file tersimpan</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-outline text-sm py-2.5 px-4">
            <RefreshCw size={14} />
          </button>
          <button onClick={() => inputRef.current?.click()} disabled={uploading}
            className="btn-primary text-sm py-2.5 disabled:opacity-50">
            {uploading ? <><Loader2 size={14} className="animate-spin" /> Mengupload...</> : <><Upload size={16} /> Upload Gambar</>}
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple className="hidden"
          onChange={e => { if (e.target.files?.length) handleUpload(e.target.files); e.target.value = '' }} />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 flex items-center gap-2">
          ⚠ {error}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files) }}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-brand-slate/40 hover:border-gold/50 transition-colors p-10 text-center cursor-pointer rounded-sm"
      >
        {uploading ? (
          <><Loader2 size={32} className="text-gold animate-spin mx-auto mb-3" />
          <p className="text-brand-silver text-sm">Mengupload gambar...</p></>
        ) : (
          <><ImageIcon size={32} className="text-brand-gray mx-auto mb-3" />
          <p className="text-brand-silver text-sm font-medium">Drag & drop gambar ke sini, atau klik untuk pilih</p>
          <p className="text-brand-gray text-xs mt-1">JPG, PNG, WebP, GIF, AVIF — maks 10MB per file</p></>
        )}
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama file..."
          className="w-full bg-brand-charcoal border border-brand-slate/30 text-brand-cream text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 size={28} className="text-gold animate-spin" />
          <p className="text-brand-silver text-sm">Memuat media library...</p>
        </div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon size={48} className="text-brand-slate mx-auto mb-4" />
              <p className="text-brand-gray text-sm">
                {files.length === 0 ? 'Belum ada file. Upload gambar pertama kamu!' : 'Tidak ada file yang cocok dengan pencarian.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map(file => (
                <div key={file.name}
                  className="group relative bg-brand-charcoal border border-brand-slate/30 hover:border-gold/30 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-brand-slate overflow-hidden">
                    <img
                      src={file.url}
                      alt={file.name.split('/').pop()}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        const t = e.target as HTMLImageElement
                        t.style.display = 'none'
                        t.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-brand-gray text-xs">Error</div>'
                      }}
                    />
                  </div>
                  <div className="p-2.5">
                    <div className="text-brand-cream text-xs truncate" title={file.name.split('/').pop()}>
                      {file.name.split('/').pop()}
                    </div>
                    <div className="text-brand-gray text-xs mt-0.5">{fmtSize(file.size)}</div>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => copyUrl(file.url)} title="Copy URL"
                      className="w-8 h-8 bg-brand-charcoal/95 border border-brand-slate/50 flex items-center justify-center hover:border-gold/50 transition-colors">
                      {copied === file.url
                        ? <Check size={13} className="text-emerald-400" />
                        : <Copy size={13} className="text-brand-cream" />
                      }
                    </button>
                    <button onClick={() => handleDelete(file)} title="Hapus"
                      className="w-8 h-8 bg-brand-charcoal/95 border border-brand-slate/50 flex items-center justify-center hover:border-red-500/50 hover:text-red-400 transition-colors">
                      <Trash2 size={13} className="text-brand-cream" />
                    </button>
                  </div>

                  {/* Copy success indicator */}
                  {copied === file.url && (
                    <div className="absolute bottom-10 left-0 right-0 text-center">
                      <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">URL Disalin!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
