import Link from 'next/link'

import { SITE_CONFIG } from '@/constants'

const PRIMARY =
  'bg-txt text-bg hover:bg-amber inline-flex min-h-11 items-center rounded-full px-5 transition-colors duration-180'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center rounded-full border px-5 transition-colors duration-180'
const TERTIARY =
  'text-dim hover:text-amber inline-flex min-h-11 items-center underline-offset-[6px] transition-colors duration-180 hover:underline'

export function Hero() {
  return (
    <header id="top" className="pt-14 pb-14 md:pt-26 md:pb-21">
      <div className="mx-auto max-w-270 px-6">
        <p className="text-faint mb-5.5 font-mono text-xs tracking-[0.14em]">
          small R / alaner652
        </p>

        {/* em 而非 ch：ch 是 Space Grotesk 的「0」寬，但這行是中文，會由楷體渲染。
            中文字寬約 1em，所以 12em ≈ 每行 12 個字。 */}
        <h1 className="font-display max-w-[12em] text-hero leading-[1.16] font-medium tracking-[-0.02em]">
          在學校電算中心做資安，其餘時間寫自己想用的東西。
        </h1>

        <p className="text-dim mt-6 max-w-[46ch] text-lead leading-[1.65]">
          五專資工四年級。目前在找實習。
        </p>

        <div className="mt-9.5 flex flex-wrap items-center gap-x-5 gap-y-3 text-base">
          <Link href="/resume" className={PRIMARY}>
            看我的履歷
          </Link>
          <a href={`mailto:${SITE_CONFIG.email}`} className={SECONDARY}>
            寄信給我
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className={TERTIARY}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </header>
  )
}
