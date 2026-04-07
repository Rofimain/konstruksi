'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { router.push('/admin'); router.refresh() }
      else setError('Email atau password salah.')
    } catch { setError('Terjadi kesalahan. Coba lagi.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-heading text-4xl font-bold text-gold mb-1">Rofimain</div>
          <div className="text-xs tracking-[0.3em] text-brand-gray font-mono uppercase">CMS Dashboard</div>
        </div>
        <div className="bg-brand-charcoal border border-brand-slate/30 p-8">
          <h1 className="font-heading text-2xl text-brand-cream mb-6">Masuk ke Dashboard</h1>
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 mb-5">
              <AlertCircle size={14} className="shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-brand-gray text-xs mb-2 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
                <input type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@konstruksi.com"
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm pl-9 pr-4 py-3 focus:outline-none focus:border-gold" />
              </div>
            </div>
            <div>
              <label className="block text-brand-gray text-xs mb-2 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
                <input type={show ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-brand-slate/50 text-brand-cream text-sm pl-9 pr-10 py-3 focus:outline-none focus:border-gold" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-cream">
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary justify-center py-3 mt-2 disabled:opacity-50">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>
        <p className="text-center text-brand-gray text-xs mt-6">Lupa password? Hubungi administrator sistem.</p>
      </div>
    </div>
  )
}
