'use client'

import { usePathname } from 'next/navigation'

import { CopyButton } from '@/components/common/CopyButton'
import { Clock } from '@/components/layout/Clock'
import { Reveal } from '@/components/motion/Reveal'
import { SITE_CONFIG } from '@/constants'
import { LLink as Link, useDict } from '@/i18n/client'
import { splitLocale } from '@/i18n/config'

const SOCIALS: [string, string | undefined][] = [
  ['GitHub', SITE_CONFIG.github],
  ['Instagram', SITE_CONFIG.instagram],
  ['Threads', SITE_CONFIG.threads],
]

/** 主要聯絡方式：Discord。最大的字，箭頭是橘的，hover 底線從左畫出來（.em）。 */
function Discord({ className }: { className: string }) {
  return (
    <a
      href={SITE_CONFIG.discord}
      target="_blank"
      rel="noopener noreferrer"
      className={`em text-text inline-block font-black ${className}`}
    >
      Discord<span className="text-accent"> ↗</span>
    </a>
  )
}

/** 第二順位：信箱。小一號，前面一句「或寄信」，後面複製鈕。手機允許在 @ 前斷行。 */
function Email({ compact = false }: { compact?: boolean }) {
  const d = useDict().footer
  const [user, domain] = SITE_CONFIG.email.split('@')
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-text-3 font-mono text-xs">{d.orEmail}</span>
      <a
        href={`mailto:${SITE_CONFIG.email}`}
        className={`em text-text-body hover:text-text font-bold ${compact ? 'text-base md:text-lg' : 'text-lg md:text-2xl'}`}
      >
        {user}
        <wbr />
        <span className="text-accent">@</span>
        {domain}
      </a>
      {!compact && (
        <CopyButton
          text={SITE_CONFIG.email}
          label={d.copy}
          doneLabel={d.copied}
          liveText={d.copiedLive}
          className="min-h-9 px-4 text-sm"
        />
      )}
    </div>
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

/** Footer 只做一件事：讓人找得到我。Discord 永遠是最大的字（他不太看信），信箱是第二順位。
    三種變體照路徑：首頁／接案是整頁的收尾（大型），文章頁接在「下一篇」底下，其他內頁精簡；履歷沒有 Footer。 */
export function Footer() {
  const { path: pathname } = splitLocale(usePathname())
  const d = useDict().footer
  if (pathname === '/resume') return null

  if (pathname === '/' || pathname === '/hire') {
    const hire = pathname === '/hire'
    return (
      <footer className="border-line stripes border-t print:hidden">
        <div className="wrap pt-18 pb-7 md:pt-30 md:pb-10">
          <Reveal>
            <p className="font-hand text-accent text-[26px] md:text-[36px]">
              {hire ? d.askHire : d.ask}
            </p>
            <Discord className="mt-2 text-[44px] leading-[1.1] tracking-[-0.03em] md:mt-3 md:text-[clamp(56px,6.5vw,96px)] md:tracking-[-0.04em]" />
            <div className="mt-5 md:mt-7">
              <Email />
            </div>
            {hire && <p className="text-text-2 mt-4 text-base">{d.hireNote}</p>}
          </Reveal>
          <div className="border-line text-text-2 mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5 font-mono text-xs md:mt-24">
            <span>
              {SITE_CONFIG.copyright}
              {!hire && (
                <>
                  {' ·'}
                  <Clock prefix="" label={d.clockLabel} />
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
            <div className="text-text-3 font-mono text-xs tracking-[0.14em]">{d.talk}</div>
            <Discord className="mt-2 text-[30px] md:text-[44px] md:tracking-[-0.02em]" />
            <div className="mt-3">
              <Email compact />
            </div>
          </div>
          <Link
            href="/blog"
            className="text-text hover:text-accent font-mono text-[13px] transition-colors"
          >
            {d.backToBlog}
          </Link>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-line border-t print:hidden">
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-9 pb-7 md:pt-12 md:pb-8">
        <div>
          <div className="text-text-3 font-mono text-xs tracking-[0.14em]">{d.ask}</div>
          <Discord className="mt-2 text-[32px] md:text-[48px] md:tracking-[-0.02em]" />
          <div className="mt-3">
            <Email compact />
          </div>
        </div>
        <div className="text-text-3 flex flex-wrap gap-6 font-mono text-xs">
          <Socials />
          <span>{SITE_CONFIG.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
