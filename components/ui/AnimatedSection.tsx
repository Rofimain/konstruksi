'use client'
// components/ui/AnimatedSection.tsx

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in'
  delay?: number
  threshold?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`
          el.classList.add('animated')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('animated')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold, once])

  return (
    <div
      ref={ref}
      className={cn('motion-safe:opacity-0', className)}
      style={{
        animation: 'none',
      }}
    >
      <style>{`
        .animated {
          animation: fadeUpStagger 0.7s var(--transition-smooth) forwards !important;
          opacity: 1 !important;
        }
        @keyframes fadeUpStagger {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {children}
    </div>
  )
}

// Stagger children
export function StaggerGroup({
  children,
  className,
  staggerDelay = 100,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll(':scope > *')
          children.forEach((child, i) => {
            setTimeout(() => {
              ;(child as HTMLElement).style.opacity = '1'
              ;(child as HTMLElement).style.transform = 'translateY(0)'
            }, i * staggerDelay)
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
