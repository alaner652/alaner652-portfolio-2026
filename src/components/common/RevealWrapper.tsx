'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
}

export function RevealWrapper({ children, className }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      requestAnimationFrame(() => setVisible(true))
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      // `reveal` 讓 layout 裡的 <noscript> 樣式能在 JS 失效時強制顯示內容
      className={cn(
        'reveal transition-[opacity,transform] duration-600 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4.5',
        className
      )}
    >
      {children}
    </div>
  )
}
