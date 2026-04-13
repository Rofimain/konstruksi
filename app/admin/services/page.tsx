'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Edit, Eye, GripVertical, Home, Building2, Palette, Route, Hammer, ClipboardList } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { services as initialServices } from '@/data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, LucideIcon> = {
  Home, Building2, Palette, Route, Hammer, ClipboardList,
}

export default function AdminServicesPage() {
  const [services] = useState(initialServices)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-brand-cream">Manajemen Layanan</h1>
        <p className="text-brand-silver text-sm mt-1">{services.length} layanan terdaftar</p>
      </div>

      <div className="bg-brand-charcoal border border-brand-slate/30 p-4">
        <p className="text-brand-silver text-sm flex items-center gap-2">
          <GripVertical size={14} className="text-gold" />
          Seret untuk mengubah urutan tampilan layanan di website
        </p>
      </div>

      <div className="space-y-3">
        {[...services].sort((a, b) => a.order - b.order).map((service) => {
          const Icon = iconMap[service.icon] ?? Home
          return (
            <div
              key={service.id}
              className="bg-brand-charcoal border border-brand-slate/30 hover:border-gold/20 transition-all p-5 flex items-center gap-4 group"
            >
              <GripVertical size={16} className="text-brand-slate cursor-grab shrink-0" />
              <div className="w-10 h-10 border border-brand-slate/50 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-brand-cream font-medium">{service.title}</div>
                <div className="text-brand-gray text-xs mt-0.5">{service.subtitle}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {service.featured && (
                  <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold border border-gold/20">Unggulan</span>
                )}
                <span className="text-brand-gray text-xs font-mono">#{service.order}</span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className="text-brand-gray hover:text-brand-cream transition-colors"
                >
                  <Eye size={14} />
                </Link>
                <button className="text-brand-gray hover:text-gold transition-colors">
                  <Edit size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
