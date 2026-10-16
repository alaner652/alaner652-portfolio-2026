'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CopyButton } from '@/components/common/CopyButton'
import { Clock } from '@/components/layout/Clock'
import { SITE_CONFIG } from '@/constants'

const SOCIALS: [string, string | undefined][] = [
  ['GitHub', SITE_CONFIG.github],
  ['Instagram', SITE_CONFIG.instagram],
  ['Threads', SITE_CONFIG.threads],
]

/** 信箱：@ 是橘的，hover 時底線從左畫出來（.em）。手機允許在 @ 前斷行。 */
function Email({ className }: { className: string }) {
  const [user, domain] = SITE_CONFIG.email.split('@')
  return (
    <a href={`mailto:${SITE_CONFIG.email}`} className={`em text-text font-black ${className}`}>
      {user}
      <wbr />
      <span className="text-accent">@</span>
      {domain}
    </a>
  )
}

function Socials({ className = '' }: { className?: string }) {
  return (
    <span className={`flex gap-6 ${className}`}>
      {SOCIALS.map(([label, href]) =>
        href ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            {label} ↗
          </a>
        ) : null
      )}
    </span>
  )
}

/** Footer 只做一件事：讓人寫信。信箱永遠是最大的字，不放表單、不重複主導覽。
    三種變體照路徑：首頁／接案是整頁的收尾（大型），文章頁接在「下一篇」底下，其他內頁精簡；履歷沒有 Footer。 */
export function Footer() {
  const pathname = usePathname()
  if (pathname === '/resume') return null

  if (pathname === '/' || pathname === '/hire') {
    const hire = pathname === '/hire'
    return (
      <footer className="border-line border-t print:hidden">
        <div className="wrap pt-18 pb-7 md:pt-30 md:pb-10">
          <p className="font-hand text-accent text-[26px] md:text-[36px]">
            {hire ? '說說你想做什麼 ↓' : '有東西想一起做？'}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-3">
            <Email className="text-[30px] leading-[1.15] tracking-[-0.02em] md:text-[clamp(44px,5.5vw,80px)] md:tracking-[-0.04em]" />
            <CopyButton text={SITE_CONFIG.email} label="複製 Email" className="w-full md:w-auto" />
          </div>
          {hire && (
            <p className="text-text-2 mt-4 text-base">
              做什麼、給誰用、大概什麼時候要。不用寫規格書，一兩天內回你。
            </p>
          )}
          <div className="border-line text-text-2 mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5 font-mono text-xs md:mt-24">
            <span>
              {SITE_CONFIG.copyright}
              {!hire && (
                <>
                  {' · '}
                  <Clock prefix="" />
                </>
              )}
            </span>
            <Socials />
          </div>
        </div>
      </footer>
    )
  }

  if (pathname.startsWith('/blog/')) {
    return (
      <footer className="print:hidden">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-8 pb-7 md:pt-10 md:pb-8">
          <div>
            <div className="text-text-3 font-mono text-xs tracking-[0.14em]">想聊這篇？</div>
            <Email className="mt-2 block text-[26px] md:text-[40px] md:tracking-[-0.02em]" />
          </div>
          <Link
            href="/blog"
            className="text-text hover:text-accent font-mono text-[13px] transition-colors"
          >
            ← 回到心得分享
          </Link>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-line border-t print:hidden">
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-9 pb-7 md:pt-12 md:pb-8">
        <div>
          <div className="text-text-3 font-mono text-xs tracking-[0.14em]">有東西想一起做？</div>
          <Email className="mt-2 block text-[28px] md:text-[44px] md:tracking-[-0.02em]" />
        </div>
        <div className="text-text-3 flex flex-wrap gap-6 font-mono text-xs">
          <Socials />
          <span>{SITE_CONFIG.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
