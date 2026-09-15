'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BrandIcon } from '@/components/common/SocialIcons'
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

  const floating = scrolled || menuOpen

  return (
    // 在頁首時是透明的一列；捲下去後外層套成一顆浮起來的膠囊（毛玻璃 + 細邊 + 淡影），裡面的連結不變
    <nav aria-label="主要導覽" className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          // 圓角固定 1.75rem（= 收合時 3.5rem 高的一半，看起來就是膠囊），開選單時形狀不變、只往下長
          'mx-auto max-w-270 rounded-[1.75rem] border border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          floating &&
            'bg-bg/80 border-line-soft shadow-[0_12px_32px_-18px_rgba(51,45,36,0.28)] backdrop-blur-[12px]'
        )}
      >
        <div className="flex h-14 items-center justify-between px-5">
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
            {/* GitHub 只放 icon，跟 Hero 的社群列同一套 glyph */}
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="text-dim hover:text-amber -mr-2 ml-1 flex size-11 items-center justify-center transition-colors"
            >
              <BrandIcon name="GitHub" size={20} />
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

        {/* 手機選單常駐在 DOM，用 grid-template-rows 0fr → 1fr 讓外層盒子平滑往下長；收合時 inert 擋掉 focus */}
        <div
          id="nav-menu"
          inert={!menuOpen}
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out min-[681px]:hidden motion-reduce:transition-none',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                'border-line-soft border-t px-5 pt-2 pb-4 transition-opacity duration-200 motion-reduce:transition-none',
                menuOpen ? 'opacity-100 delay-100' : 'opacity-0'
              )}
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
                className="text-dim hover:text-amber border-line-soft mt-2 flex h-11 items-center gap-2 border-t pt-2 font-mono text-sm transition-colors"
              >
                <BrandIcon name="GitHub" size={16} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
