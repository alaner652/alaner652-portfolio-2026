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
        scrolled && 'bg-[rgba(251,251,249,0.82)] backdrop-blur-[10px] border-line-soft'
      )}
    >
      <div className="mx-auto flex h-[62px] max-w-[1080px] items-center justify-between px-6">
        <a
          href={pathname === '/' ? '#top' : '/'}
          className="font-display text-[1.05rem] font-semibold tracking-[-0.01em]"
        >
          {SITE_CONFIG.handle}
        </a>

        <div className="flex items-center gap-[24px] text-[0.9rem]">
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
            className="text-dim hover:text-txt transition-colors duration-[180ms]"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
