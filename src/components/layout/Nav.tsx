'use client'

import { Languages, Menu, X } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NAV_LINKS } from '@/constants'
import { LLink as Link, useDict } from '@/i18n/client'
import { LOCALES, localePath, splitLocale, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

const LABEL: Record<string, 'about' | 'projects' | 'blog' | 'resume' | 'hire'> = {
  '/about': 'about',
  '/projects': 'projects',
  '/blog': 'blog',
  '/resume': 'resume',
  '/hire': 'hire',
}
const NO = (i: number) => String(i + 1).padStart(2, '0')

// 桌機連結：mono 編號 + 文字；目前頁面整個變橘（編號也是），hover 底下畫一條短線
const DESKTOP_LINK =
  'group/nl text-text-2 hover:text-text aria-[current=page]:text-accent relative flex h-11 items-center gap-1 px-1 transition-colors after:bg-accent after:absolute after:inset-x-1 after:bottom-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-250 after:ease-out hover:after:scale-x-100 motion-reduce:after:transition-none'
const INDEX = 'text-text-3 group-aria-[current=page]/nl:text-accent font-mono text-[10px]'

// 手機選單是整列可點：編號 + 文字，目前頁橘色 + 左側橘短槓
const MOBILE_LINK =
  'group/ml text-text-2 hover:text-text aria-[current=page]:text-accent aria-[current=page]:border-accent -mx-3 flex h-11 items-center gap-3 border-l-2 border-transparent px-3 text-base transition-colors'

/** 語言切換：一個 icon，點了換到另一個語系的同一頁。目標語系寫在 aria-label / title 裡。 */
function LocaleSwitch({
  locale,
  path,
  className,
  onNavigate,
}: {
  locale: Locale
  path: string
  className?: string
  onNavigate?: () => void
}) {
  const d = useDict().nav
  const other: Locale = locale === 'zh' ? 'en' : 'zh'
  return (
    <NextLink
      href={localePath(other, path)}
      hrefLang={other === 'zh' ? 'zh-Hant' : 'en'}
      aria-label={d.switchLabel}
      title={d.switchLabel}
      onClick={onNavigate}
      className={cn(
        'text-text-2 hover:text-text flex size-11 items-center justify-center transition-colors',
        className
      )}
    >
      <Languages size={18} strokeWidth={1.75} aria-hidden="true" />
    </NextLink>
  )
}

export function Nav() {
  const fullPath = usePathname()
  const { locale, path: pathname } = splitLocale(fullPath)
  const d = useDict().nav
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
    <nav aria-label="主要導覽" className="sticky top-0 z-50 px-3 pt-3 sm:px-6 print:hidden">
      <div
        className={cn(
          // 圓角固定 1.75rem（= 收合時 3.5rem 高的一半，看起來就是膠囊），開選單時形狀不變、只往下長
          'mx-auto max-w-270 rounded-[1.75rem] border border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          floating &&
            'bg-bg/80 border-border shadow-[0_12px_32px_-18px_rgba(0,0,0,0.6)] backdrop-blur-[12px]'
        )}
      >
        <div className="flex h-14 items-center justify-between px-5">
          {/* 字標：手寫體。它只是回首頁，不做 hover。 */}
          <Link
            href="/"
            aria-label={d.home}
            className="font-hand text-text -ml-1 flex h-11 items-center pr-1 text-[1.75rem] leading-none font-semibold tracking-[0.01em]"
          >
            small&nbsp;<span className="text-accent">R</span>
          </Link>

          {/* 桌機：編號連結列 → 語言切換 icon */}
          <div className="flex items-center gap-4 text-sm max-[720px]:hidden">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={DESKTOP_LINK}
              >
                <span className={INDEX} aria-hidden="true">
                  {NO(i)}
                </span>
                {d[LABEL[link.href]] ?? link.label}
              </Link>
            ))}
            <LocaleSwitch locale={locale} path={pathname} className="-mr-2 ml-1" />
          </div>

          {/* 手機：開合選單 */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? d.closeMenu : d.openMenu}
            className="text-text-2 hover:text-text -mr-2 hidden h-11 w-11 items-center justify-center transition-colors max-[720px]:flex"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 手機選單常駐在 DOM，用 grid-template-rows 0fr → 1fr 讓外層盒子平滑往下長；收合時 inert 擋掉 focus */}
        <div
          id="nav-menu"
          inert={!menuOpen}
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-out min-[721px]:hidden motion-reduce:transition-none',
            menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                'border-line border-t px-5 pt-2 pb-4 transition-opacity duration-200 motion-reduce:transition-none',
                menuOpen ? 'opacity-100 delay-100' : 'opacity-0'
              )}
            >
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={MOBILE_LINK}
                >
                  <span
                    className="text-text-3 group-aria-[current=page]/ml:text-accent font-mono text-[11px]"
                    aria-hidden="true"
                  >
                    {NO(i)}
                  </span>
                  {d[LABEL[link.href]] ?? link.label}
                </Link>
              ))}
              <div className="border-line mt-2 flex items-center justify-end border-t pt-2">
                <LocaleSwitch
                  locale={locale}
                  path={pathname}
                  onNavigate={() => setMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
