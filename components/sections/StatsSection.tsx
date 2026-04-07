'use client'
import { useEffect, useRef, useState } from 'react'
import { stats } from '@/data'

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasStarted = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true
        const duration = 2000, start = performance.now()
        const animate = (now: number) => {
          const elapsed = now - start, progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(animate); else setCount(target)
        }
        requestAnimationFrame(animate); observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el); return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsSection() {
  return (
    <section className="py-20 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '40px 40px' }} />
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="container-xl relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-brand-slate/30">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-8 py-8 group hover:bg-brand-slate/20 transition-colors duration-300">
              <div className="stat-number mb-2">
                <CountUp target={parseInt(stat.value)} suffix={stat.suffix} />
              </div>
              <div className="text-brand-cream font-medium mb-1">{stat.label}</div>
              <div className="text-brand-gray text-xs">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="gold-line absolute bottom-0 left-0 right-0" />
    </section>
  )
}
