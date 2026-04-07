'use client'
// components/ui/ImageUploader.tsx
import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder?: string
  label?: string
}

export function ImageUploader({ value, onChange, folder = 'misc', label = 'Gambar' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onChange(data.url)
    } catch (e: any) {
      setError(e.message || 'Upload gagal')
    } finally { setUploading(false) }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  const handleRemove = async () => {
    if (!value) return
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value }),
      })
    } catch {}
    onChange('')
  }

  return (
    <div>
      <label className="block text-brand-gray text-xs mb-2 uppercase tracking-widest">{label}</label>
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className="w-full h-48 object-cover border border-brand-slate/30" />
          <button onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-brand-slate/50 hover:border-gold/50 transition-colors h-48 flex flex-col items-center justify-center cursor-pointer bg-brand-dark group"
        >
          {uploading ? (
            <><Loader2 size={24} className="text-gold animate-spin mb-2" /><p className="text-brand-silver text-sm">Mengupload...</p></>
          ) : (
            <><ImageIcon size={24} className="text-brand-gray group-hover:text-gold mb-2 transition-colors" />
            <p className="text-brand-silver text-sm">Klik atau drag gambar ke sini</p>
            <p className="text-brand-gray text-xs mt-1">JPG, PNG, WebP — maks 10MB</p></>
          )}
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
    </div>
  )
}

// Multi image uploader
interface MultiImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  folder?: string
  label?: string
  max?: number
}

export function MultiImageUploader({ values, onChange, folder = 'misc', label = 'Galeri Foto', max = 10 }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (files: FileList) => {
    setUploading(true)
    const newUrls: string[] = []
    for (const file of Array.from(files)) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', folder)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (res.ok) newUrls.push(data.url)
      } catch {}
    }
    onChange([...values, ...newUrls].slice(0, max))
    setUploading(false)
  }

  const removeImage = async (url: string) => {
    try { await fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) }) } catch {}
    onChange(values.filter(v => v !== url))
  }

  return (
    <div>
      <label className="block text-brand-gray text-xs mb-2 uppercase tracking-widest">{label}</label>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {values.map((url, i) => (
          <div key={i} className="relative group aspect-square">
            <img src={url} alt={`Foto ${i+1}`} className="w-full h-full object-cover border border-brand-slate/30" />
            <button onClick={() => removeImage(url)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <X size={10} />
            </button>
          </div>
        ))}
        {values.length < max && (
          <button onClick={() => inputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-brand-slate/50 hover:border-gold/50 flex items-center justify-center text-brand-gray hover:text-gold transition-colors">
            {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => { if (e.target.files?.length) handleUpload(e.target.files) }} />
    </div>
  )
}
