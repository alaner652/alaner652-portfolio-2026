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
        {/* 名字放最前面，第一眼要先知道這是誰 */}
        <p className="text-dim mb-5 font-mono text-sm tracking-[0.06em]">
          吳宸麒 Wu Chen-Chi <span className="text-faint">· alaner652</span>
        </p>

        {/* em 而非 ch：ch 是 Space Grotesk 的「0」寬，但這行是中文，會由楷體渲染。
            中文字寬約 1em，所以 9em ≈ 每行 9 個字（這句 12 字，剛好斷成兩行）。 */}
        <h1 className="font-display max-w-[9em] text-hero leading-[1.16] font-medium tracking-[-0.02em]">
          找得到漏洞，也做得出東西。
        </h1>

        {/* 職稱從標題移到這裡——標題要短，置中才站得住 */}
        <p className="text-dim mt-6 max-w-[46ch] text-lead leading-[1.65]">
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

      {/* 釘在第一屏底部，不是接在按鈕後面 */}
      <a
        href="#about"
        aria-label="往下看關於我"
        className="text-faint hover:text-amber mx-auto mb-10 flex w-fit flex-col items-center gap-2 font-mono text-2xs tracking-[0.06em] transition-colors"
      >
        往下看
        <ChevronDown size={16} className="animate-bounce motion-reduce:animate-none" />
      </a>
    </header>
  )
}
