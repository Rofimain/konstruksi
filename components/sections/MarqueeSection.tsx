// components/sections/MarqueeSection.tsx
const items = [
  'Konstruksi Residensial',
  'Gedung Komersial',
  'Desain Interior',
  'Infrastruktur',
  'Green Building',
  'Renovasi & Restorasi',
  'Manajemen Proyek',
  'BIM Technology',
  'ISO 9001:2015',
  'LEED Certified',
]

export function MarqueeSection() {
  const doubled = [...items, ...items]

  return (
    <div className="relative py-5 bg-gold overflow-hidden">
      <div className="flex gap-0">
        <div className="flex gap-0 animate-marquee-ltr whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-brand-black font-mono text-xs uppercase tracking-widest font-bold">
              <span className="text-brand-black/40">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
