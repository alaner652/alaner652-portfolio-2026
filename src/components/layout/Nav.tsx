'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE_CONFIG } from '@/constants'
import { cn } from '@/lib/utils'

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b border-transparent transition-[background,border-color,backdrop-filter] duration-[250ms]',
        scrolled && 'bg-[rgba(12,14,19,0.82)] backdrop-blur-[10px] border-line-soft'
      )}
    >
      <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-[62px]">
        <a
          href={pathname === '/' ? '#top' : '/'}
          className="font-mono font-bold text-[0.95rem] tracking-[0.02em] flex items-center gap-[0.6em]"
        >
          <PulseDot />
          {SITE_CONFIG.handle}
        </a>

        <div className="flex gap-[26px] items-center font-mono text-[0.78rem] tracking-[0.04em]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn('text-dim transition-colors duration-[180ms] hover:text-txt', link.hideSm && 'max-[680px]:hidden')}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-txt border border-line px-[12px] py-[6px] rounded-[6px] transition-[border-color,color] duration-[180ms] hover:border-amber hover:text-amber"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}

function PulseDot() {
  return (
    <span
      className="w-[8px] h-[8px] rounded-full bg-live inline-block"
      aria-hidden="true"
      style={{ animation: 'pulse 2.4s ease-out infinite' }}
    />
  )
}
