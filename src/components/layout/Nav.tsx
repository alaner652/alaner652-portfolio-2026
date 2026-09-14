'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NAV_LINKS, SITE_CONFIG } from '@/constants'
import { cn } from '@/lib/utils'

// 桌機連結：底下一條 amber 線，hover 時從左畫出來；目前頁面則常駐
const DESKTOP_LINK =
  'text-dim hover:text-txt aria-[current=page]:text-txt relative flex h-11 items-center px-1 transition-colors after:bg-amber after:absolute after:inset-x-1 after:bottom-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none'

// 手機選單是整列可點，只改字色與左側的 amber 短槓
const MOBILE_LINK =
  'text-dim hover:text-txt aria-[current=page]:text-amber-text aria-[current=page]:border-amber -mx-3 flex h-11 items-center border-l-2 border-transparent px-3 text-base transition-colors'

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // 每個連結都是獨立頁面，所以 active 只看路徑；/blog/xxx 也算在「心得分享」底下
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      aria-label="主要導覽"
      className={cn(
        'sticky top-0 z-50 border-b border-transparent transition-[background,border-color,backdrop-filter,box-shadow] duration-250',
        (scrolled || menuOpen) &&
          'bg-bg/85 border-line-soft shadow-[0_8px_24px_-16px_rgba(51,45,36,0.18)] backdrop-blur-[10px]'
      )}
    >
      <div className="mx-auto flex h-16 max-w-270 items-center justify-between px-6">
        {/* 字標：手寫體，跟 Hero 的「small R」同一套。它只是回首頁，不做 hover */}
        <Link
          href="/"
          aria-label="回到首頁"
          className="font-hand text-txt -ml-1 flex h-11 items-center pr-1 text-[1.75rem] leading-none font-semibold tracking-[0.01em]"
        >
          small&nbsp;<span className="text-amber">R</span>
        </Link>

        {/* 桌機：連結列 + GitHub */}
        <div className="flex items-center gap-5 text-sm max-[680px]:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={DESKTOP_LINK}
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="bg-line mx-2 h-4 w-px" />
          {/* 站上 GitHub 一律用文字 + ↗（Hero、Footer 同款），不放品牌圖示 */}
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-amber -mr-2 flex h-11 items-center gap-0.5 px-2 font-mono text-xs tracking-[0.02em] transition-colors"
          >
            GitHub <ArrowUpRight size={12} aria-hidden />
          </a>
        </div>

        {/* 手機：開合選單，桌機那四個連結原樣搬下來 */}
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
          className="border-line-soft motion-safe:animate-drop border-t px-6 pt-2 pb-4 min-[681px]:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={MOBILE_LINK}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-amber border-line-soft mt-2 flex h-11 items-center gap-0.5 border-t pt-2 font-mono text-sm transition-colors"
          >
            GitHub <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      )}
    </nav>
  )
}
