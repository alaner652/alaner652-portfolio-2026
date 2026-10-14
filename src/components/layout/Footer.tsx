import { ArrowUpRight } from 'lucide-react'

import { CopyEmail } from '@/components/common/CopyEmail'
import { SITE_CONFIG } from '@/constants'

/** 有填才顯示；順序照重要性，GitHub 最前。 */
const SOCIALS: [string, string | undefined][] = [
  ['GitHub', SITE_CONFIG.github],
  ['Instagram', SITE_CONFIG.instagram],
  ['Threads', SITE_CONFIG.threads],
  ['LinkedIn', SITE_CONFIG.linkedin],
]

const LINK =
  'text-ink-dim hover:text-ink-txt inline-flex min-h-10 items-center gap-1 text-sm transition-colors'

/** 全站的收尾。翻成深底，字標放大——網站用什麼記號開場，就用什麼記號結束。
    左邊是字標 + 一句話 + 信箱，右邊社群連結。站內連結導覽列就有，這裡不再列一次；
    最底下只剩版權。 */
export function Footer() {
  return (
    <footer className="bg-ink text-ink-txt print:hidden">
      <div className="mx-auto max-w-270 px-6 pt-16 pb-10 md:pt-24 md:pb-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <p className="font-hand text-[clamp(3rem,6vw,5rem)] leading-none font-semibold tracking-[0.01em]">
              small&nbsp;<span className="text-amber">R</span>
            </p>
            <p className="font-hand text-ink-dim mt-6 text-[1.5rem] leading-none">
              有東西想一起做？寫信給我 ↓
            </p>
            <CopyEmail email={SITE_CONFIG.email} className="mt-4" />
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <div className="text-ink-faint text-2xs mb-3 font-mono tracking-[0.12em] uppercase">
              社群
            </div>
            <ul className="flex flex-col">
              {SOCIALS.map(([label, href]) =>
                href ? (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {label}
                      <ArrowUpRight size={12} className="text-ink-faint" aria-hidden />
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>

        <div className="border-ink-line text-ink-faint text-2xs mt-14 border-t pt-6 font-mono tracking-[0.04em] md:mt-20">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
