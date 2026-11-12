import type { ReactNode } from 'react'

/** 案例裡的一個取捨：選了什麼、沒選什麼、為什麼。每篇案例都用這個寫決策，讀者掃過去就看得出判斷的軌跡。
    不是卡片：上一條細線分開（第一個不畫），「選了／沒選」是左欄小標籤，理由是正文、跟右欄對齊。
    字級跟著外層的正文走（em），放在文章或作品詳情頁都一樣比例。

    MDX 用法：
    <Decision chose="SQLite，一個檔案" over="另外架 PostgreSQL">
      沒有人專職維護伺服器……
    </Decision>

    標籤預設中文；英文版的 MDX 寫 lang="en"。只收字串屬性：next-mdx-remote 預設擋掉 MDX 裡的 JS 運算式
    （{...} 會被拿掉），所以不要設計成要傳陣列或物件的 prop。 */
const LABELS = { zh: ['選了', '沒選'], en: ['Chose', 'Over'] } as const
export function Decision({
  chose,
  over,
  lang = 'zh',
  children,
}: {
  chose: string
  over?: string
  lang?: 'zh' | 'en'
  children: ReactNode
}) {
  const labels = LABELS[lang] ?? LABELS.zh
  return (
    <div className="decision border-line my-[1.6em] grid gap-x-5 border-t pt-[1.2em] first:mt-0 first:border-t-0 first:pt-0 sm:grid-cols-[4.2em_minmax(0,1fr)]">
      <div className="text-accent font-mono text-[0.75em] leading-[2.4]">{labels[0]}</div>
      <div className="text-text text-[1.08em] leading-[1.6] font-black">{chose}</div>
      {over && (
        <>
          <div className="text-text-3 mt-1 font-mono text-[0.75em] leading-[2.2] sm:mt-0.5">
            {labels[1]}
          </div>
          <div className="text-text-2 text-[0.92em] leading-[1.9]">{over}</div>
        </>
      )}
      <div className="decision-body mt-[0.6em] sm:col-start-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  )
}
