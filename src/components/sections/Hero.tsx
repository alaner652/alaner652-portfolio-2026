import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { SITE_CONFIG } from '@/constants'

const PRIMARY =
  'bg-orange-cta text-bg hover:bg-txt inline-flex min-h-11 items-center rounded-full px-5 transition-colors'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center rounded-full border px-5 transition-colors'

export function Hero() {
  return (
    // 滿版第一屏。nav 是 sticky h-16，所以扣掉 4rem；用 svh 才不會被手機的網址列吃掉一截
    <header id="top" className="flex min-h-[calc(100svh-4rem)] flex-col">
      <div className="mx-auto flex w-full max-w-270 flex-1 flex-col items-center justify-center px-6 py-14 text-center">
        {/* em 而非 ch：ch 是 Space Grotesk 的「0」寬，但這行是中文，會由楷體渲染。
            中文字寬約 1em，所以 9em ≈ 每行 9 個字。 */}
        <h1 className="font-display text-hero max-w-[9em] leading-[1.16] font-medium tracking-[-0.02em]">
          我是<span className="text-amber">small R</span>，喜歡資安的全端工程師。
        </h1>

        {/* 標題底下補上正式的身分和現在在做的事 */}
        <p className="text-dim text-lead mt-6 max-w-[46ch] leading-[1.65]">
          全端工程師 · 五專資工四年級。在學校電算中心做授權範圍內的資安工作，其餘時間自己做產品。
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-base">
          <Link href="/resume" className={PRIMARY}>
            看我的履歷
          </Link>
          <a href={`mailto:${SITE_CONFIG.email}`} className={SECONDARY}>
            寄信給我
          </a>
        </div>
      </div>

      {/* 下滑引導釘在第一屏底部 */}
      <a
        href="#about"
        aria-label="往下看關於我"
        className="text-faint hover:text-amber text-2xs mx-auto mb-10 flex w-fit flex-col items-center gap-2 font-mono tracking-[0.06em] transition-colors"
      >
        往下看
        <ChevronDown size={16} className="animate-bounce motion-reduce:animate-none" />
      </a>
    </header>
  )
}
