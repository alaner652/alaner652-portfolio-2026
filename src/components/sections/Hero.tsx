import Link from 'next/link'

import { OFFERS, SITE_CONFIG } from '@/constants'
import { TONE_INK } from '@/lib/tone'

const PRIMARY =
  'bg-orange-ink text-bg hover:bg-txt inline-flex min-h-11 items-center rounded-full px-5 transition-colors'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center rounded-full border px-5 transition-colors'
const TERTIARY =
  'text-dim hover:text-amber inline-flex min-h-11 items-center underline-offset-[6px] transition-colors hover:underline'

export function Hero() {
  return (
    <header id="top" className="py-14 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-270 px-6">
        {/* 名字放最前面，第一眼要先知道這是誰 */}
        <p className="text-dim mb-5 font-mono text-sm tracking-[0.06em]">
          吳宸麒 Wu Chen-Chi <span className="text-faint">· alaner652</span>
        </p>

        {/* em 而非 ch：ch 是 Space Grotesk 的「0」寬，但這行是中文，會由楷體渲染。
            中文字寬約 1em，所以 12em ≈ 每行 12 個字。 */}
        <h1 className="font-display max-w-[12em] text-hero leading-[1.16] font-medium tracking-[-0.02em]">
          全端工程師，用攻擊者的視角把產品做到上線。
        </h1>

        <p className="text-dim mt-6 max-w-[52ch] text-lead leading-[1.65]">
          五專資工四年級。在學校電算中心做授權範圍內的資安工作，其餘時間自己做產品。目前在找實習。
        </p>

        {/* 三條能力主張，版型沿用「會的東西」的 120px 標籤欄 */}
        <dl className="mt-11 grid max-w-[64ch] gap-5">
          {OFFERS.map((offer) => (
            <div
              key={offer.label}
              className="grid gap-1 md:grid-cols-[120px_1fr] md:items-baseline md:gap-6"
            >
              <dt className={`font-mono text-xs tracking-[0.04em] ${TONE_INK[offer.tone]}`}>
                {offer.label}
              </dt>
              <dd className="text-dim text-base leading-[1.65]">{offer.description}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-3 text-base">
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
