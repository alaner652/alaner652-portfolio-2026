import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { SocialIcons } from '@/components/common/SocialIcons'
import { NameTyper } from '@/components/home/NameTyper'
import { SITE_CONFIG } from '@/constants'

const PRIMARY =
  'bg-orange-cta text-bg hover:bg-txt inline-flex min-h-11 items-center rounded-full px-5 transition-colors'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center rounded-full border px-5 transition-colors'

export function Hero() {
  return (
    // 滿版：扣掉 4.25rem 的 sticky Nav（pt-3 + h-14） 後撐滿第一屏，文字垂直置中，往下捲才看到 Bento
    <header className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] w-full max-w-270 flex-col justify-center px-6 py-14">
      {/* 標題 → 副標 → 按鈕＋社群依序淡入。motion-safe 才動，reduce 時直接顯示。
          在讀／在做在 /about，第一屏只留一句話、兩個按鈕跟社群連結。 */}
      <div>
        <h1 className="font-display text-hero motion-safe:animate-fade-up leading-[1.16] font-medium tracking-[-0.02em]">
          {/* 手動斷行：中文沒有詞邊界，靠寬度斷會切在「資／安」之間 */}
          我是
          <NameTyper />
          <br />
          喜歡資安的全端工程師。
        </h1>
        <p className="text-dim text-lead motion-safe:animate-fade-up mt-6 leading-[1.65] [animation-delay:80ms]">
          五專資工四年級，在校電算中心做授權範圍內的資安工作，其餘時間自己做產品。
        </p>
        <div className="motion-safe:animate-fade-up mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 text-base [animation-delay:160ms]">
          <Link href="/resume" className={PRIMARY}>
            看我的履歷
          </Link>
          <a href={`mailto:${SITE_CONFIG.email}`} className={SECONDARY}>
            寄信給我
          </a>
          {/* 社群跟按鈕同一排，中間一條細線隔開；手機換行時線藏起來 */}
          <span className="bg-line hidden h-6 w-px sm:block" aria-hidden="true" />
          <SocialIcons className="-ml-1 gap-1" />
        </div>
      </div>

      {/* 往下捲提示：第一屏正下方置中，只有一顆 amber 圓框箭頭，一直輕輕點頭；點了跳到下一段 */}
      <a
        href="#offers"
        aria-label="往下捲到「我能做什麼」"
        title="往下看"
        className="border-amber text-amber hover:bg-amber hover:text-bg motion-safe:animate-fade-up absolute bottom-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] transition-colors [animation-delay:600ms]"
      >
        <ChevronDown size={24} strokeWidth={2} className="motion-safe:animate-nudge" aria-hidden />
      </a>
    </header>
  )
}
