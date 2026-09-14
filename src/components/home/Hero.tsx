import Image from 'next/image'
import Link from 'next/link'

import { NameTyper } from '@/components/home/NameTyper'
import { NowCard } from '@/components/home/NowCard'
import { SITE_CONFIG } from '@/constants'

const PRIMARY =
  'bg-orange-cta text-bg hover:bg-txt inline-flex min-h-11 items-center rounded-full px-5 transition-colors'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center rounded-full border px-5 transition-colors'

/** 頭像位，跟主標第一行「我是 ○○」排在同一列。SITE_CONFIG.avatar 有填就放圖；
    沒填就用 monogram 佔著同樣的位置，之後換圖不會動到版面。 */
function Portrait() {
  const shell =
    'border-line-soft inline-block size-11 shrink-0 overflow-hidden rounded-full border align-middle md:size-14'
  if (SITE_CONFIG.avatar) {
    return (
      <span className={shell}>
        <Image
          src={SITE_CONFIG.avatar}
          alt="吳宸麒"
          width={56}
          height={56}
          priority
          className="size-full object-cover"
        />
      </span>
    )
  }
  return (
    <span
      className={`${shell} bg-orange-tint text-orange-ink font-display flex items-center justify-center text-xl font-medium`}
      aria-hidden="true"
    >
      R
    </span>
  )
}

export function Hero() {
  return (
    <header className="mx-auto grid w-full max-w-270 items-center gap-12 px-6 pt-14 pb-10 md:grid-cols-[1.15fr_1fr] md:gap-16 md:pt-20 md:pb-14">
      {/* 左：標題（頭像在第一行前面）→ 副標 → 按鈕依序淡入。motion-safe 才動，reduce 時直接顯示。 */}
      <div>
        <h1 className="font-display text-hero motion-safe:animate-fade-up leading-[1.16] font-medium tracking-[-0.02em]">
          {/* 手動斷行：中文沒有詞邊界，靠寬度斷會切在「資／安」之間 */}
          <span className="flex items-center gap-3 md:gap-4">
            <Portrait />
            <span>
              我是
              <NameTyper />
            </span>
          </span>
          喜歡資安的全端工程師。
        </h1>
        <p className="text-dim text-lead motion-safe:animate-fade-up mt-6 max-w-[40ch] leading-[1.65] [animation-delay:80ms]">
          五專資工四年級，在校電算中心做授權範圍內的資安工作，其餘時間自己做產品。
        </p>
        <div className="motion-safe:animate-fade-up mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 text-base [animation-delay:160ms]">
          <Link href="/resume" className={PRIMARY}>
            看我的履歷
          </Link>
          <a href={`mailto:${SITE_CONFIG.email}`} className={SECONDARY}>
            寄信給我
          </a>
        </div>
      </div>

      {/* 右：「現在」卡片。第一屏就給可以核對的事實，而不是只有一句口號。 */}
      <NowCard />
    </header>
  )
}
