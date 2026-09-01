'use client'

import { House, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NAV_LINKS, SITE_CONFIG } from '@/constants'
import { cn } from '@/lib/utils'

/** '/#work' → 'work'；非錨點連結回傳 null */
function sectionId(href: string) {
  const i = href.indexOf('#')
  return i === -1 ? null : href.slice(i + 1)
}

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // usePathname() 不含 hash，所以錨點連結的 active 狀態只能靠 scroll-spy
  useEffect(() => {
    // 非首頁沒有這些區塊；isActive() 已經用 pathname 擋掉，不必再清 state
    if (pathname !== '/') return
    const ids = NAV_LINKS.map((l) => sectionId(l.href)).filter((id): id is string => id !== null)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // 只有捲到導覽列正下方那一帶的區塊才算 active
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function isActive(href: string) {
    const id = sectionId(href)
    return id ? pathname === '/' && activeId === id : pathname === href
  }

  const linkClass = 'text-dim transition-colors hover:text-txt aria-[current=page]:text-amber-text'

  return (
    <nav
      aria-label="主要導覽"
      className={cn(
        'sticky top-0 z-50 border-b border-transparent transition-[background,border-color,backdrop-filter] duration-250',
        (scrolled || menuOpen) && 'bg-bg/82 border-line-soft backdrop-blur-[10px]'
      )}
    >
      <div className="mx-auto flex h-16 max-w-270 items-center justify-between px-6">
        {pathname === '/' ? (
          <a
            href="#top"
            aria-label="回到頁首"
            className="text-txt hover:text-amber -ml-2 flex h-11 w-11 items-center justify-center transition-colors"
          >
            <House size={20} />
          </a>
        ) : (
          <Link
            href="/"
            aria-label="回到首頁"
            className="text-txt hover:text-amber -ml-2 flex h-11 w-11 items-center justify-center transition-colors"
          >
            <House size={20} />
          </Link>
        )}

        {/* 桌機：完整連結列 */}
        <div className="flex items-center gap-6 text-sm max-[680px]:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(linkClass, 'flex h-11 items-center')}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, 'flex h-11 items-center')}
          >
            GitHub ↗
          </a>
        </div>

        {/* 手機：開合選單，五個目的地都留著 */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? '關閉選單' : '開啟選單'}
          className="text-dim hover:text-txt -mr-2 hidden h-11 w-11 items-center justify-center transition-colors max-[680px]:flex"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="nav-menu"
          className="border-line-soft border-t px-6 pt-2 pb-4 min-[681px]:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(linkClass, 'flex h-11 items-center text-base')}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={cn(linkClass, 'flex h-11 items-center text-base')}
          >
            GitHub ↗
          </a>
        </div>
      )}
    </nav>
  )
}
