'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { WORK_ITEMS } from '@/constants'
import { TONE_CHIP } from '@/lib/tone'
import { PROJECT_CATEGORIES } from '@/types'
import type { ProjectCategory, Tone, WorkItem, WorkStatus } from '@/types'

/** 顏色在這裡是狀態的編碼，不是裝飾：綠＝還在跑，藍＝開源，停掉的就不給顏色。 */
const STATUS: Record<WorkStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-green-ink', text: 'text-green-ink' },
  open: { dot: 'bg-blue-ink', text: 'text-blue-ink' },
  idle: { dot: 'bg-faint', text: 'text-faint' },
}

/** 分類沿用「會的東西」的配色邏輯：資安紫、Web 藍、AI 綠、工具金。 */
const CATEGORY_TONE: Record<ProjectCategory, Tone> = {
  資安: 'plum',
  Web: 'blue',
  AI: 'green',
  工具: 'gold',
}

const ALL = '全部' as const
type Filter = typeof ALL | ProjectCategory

/** 外部連結標題共用；有 link 才變成連結，沒有就只是文字 */
function ItemTitle({ title, link }: { title: string; link?: string }) {
  if (!link) return <>{title}</>
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber transition-colors"
    >
      {title} ↗
    </a>
  )
}

/** 縮圖。由 `npm run shots` 抓下來存在 public/shots/，沒圖的項目就整塊不出現。
    桌機靠右 300px：GitHub 的 OG 卡是 1200×630，再窄下去卡片裡的字就糊掉了。 */
function ItemPreview({ title, link, preview }: Pick<WorkItem, 'title' | 'link' | 'preview'>) {
  if (!preview) return null

  const img = (
    <Image
      src={preview}
      alt={`${title} 的頁面預覽`}
      width={600}
      height={315}
      sizes="(min-width: 768px) 300px, 100vw"
      className="block w-full object-cover object-top"
    />
  )

  // 框線只畫在外層，圖片本身不再畫一次，避免兩條線差 1px 疊在一起
  const frame = 'border-line-soft rounded-card block overflow-hidden border'

  return (
    <div className="mt-5 md:mt-0">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className={`${frame} hover:border-amber transition-colors`}
        >
          {img}
        </a>
      ) : (
        <div className={frame}>{img}</div>
      )}
    </div>
  )
}

export function WorkList() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const items = filter === ALL ? WORK_ITEMS : WORK_ITEMS.filter((i) => i.category === filter)

  const chipBase =
    'rounded-chip min-h-9 px-3 font-mono text-xs tracking-[0.02em] transition-colors cursor-pointer'

  return (
    <>
      <RevealWrapper className="mb-2">
        {/* 只有八則，篩選是給「我只想看資安」的人用的捷徑，預設一定是全部展開 */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="依分類篩選專案">
          {([ALL, ...PROJECT_CATEGORIES] as Filter[]).map((option) => {
            const active = filter === option
            const activeClass =
              option === ALL ? 'bg-panel-hi text-txt' : TONE_CHIP[CATEGORY_TONE[option]]
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option)}
                className={`${chipBase} ${
                  active ? activeClass : 'border-line text-dim hover:text-txt border'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </RevealWrapper>

      {/* divide-y 而非每則各自 border-t：篩選列下方少一條線，區塊起頭才不會擠 */}
      <div className="divide-line-soft divide-y">
        {items.map((item) => (
          <RevealWrapper key={item.title}>
            {/* 有圖就切兩欄，沒圖的項目文字自己佔滿整行——不要留一塊空欄 */}
            <article
              className={`py-8 md:grid md:items-start md:gap-10 ${
                item.preview ? 'md:grid-cols-[1fr_300px]' : ''
              }`}
            >
              <div className="min-w-0">
                {/* 分類和狀態放標題上方。跟標題並排時，中文標題和這行小字對不到
                    同一條基線，怎麼調都歪；拆成兩行就沒有這個問題。 */}
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <MetricChip tone={CATEGORY_TONE[item.category]}>{item.category}</MetricChip>
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`}
                      aria-hidden="true"
                    />
                    <Eyebrow className={STATUS[item.tone].text}>{item.status}</Eyebrow>
                  </span>
                </div>
                <h3 className="font-display mb-2 text-lg font-medium tracking-[-0.01em]">
                  <ItemTitle title={item.title} link={item.link} />
                </h3>
                <p className="text-dim max-w-[64ch] text-base leading-[1.7]">{item.description}</p>
                {item.metrics && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.metrics.map((m) => (
                      <MetricChip key={m}>{m}</MetricChip>
                    ))}
                  </div>
                )}
              </div>
              <ItemPreview title={item.title} link={item.link} preview={item.preview} />
            </article>
          </RevealWrapper>
        ))}
      </div>
    </>
  )
}
