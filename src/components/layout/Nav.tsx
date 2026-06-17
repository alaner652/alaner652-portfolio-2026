'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
      <div className="mx-auto flex h-[62px] max-w-[1080px] items-center justify-between px-6">
        <a
          href={pathname === '/' ? '#top' : '/'}
          className="flex items-center gap-[0.6em] font-mono text-[0.95rem] font-bold tracking-[0.02em]"
        >
          <PulseDot />
          {SITE_CONFIG.handle}
        </a>

        <div className="flex items-center gap-[26px] font-mono text-[0.78rem] tracking-[0.04em]">
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
            className="text-txt border-line hover:border-amber hover:text-amber rounded-[6px] border px-[12px] py-[6px] transition-[border-color,color] duration-[180ms]"
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
      className="bg-live inline-block h-[8px] w-[8px] rounded-full"
      aria-hidden="true"
      style={{ animation: 'pulse 2.4s ease-out infinite' }}
    />
  )
}
