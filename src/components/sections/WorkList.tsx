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

/** 分類沿用「會的東西」的配色邏輯：資安紫、Web 藍、AI 綠、工具金。
    只用在上方的篩選 chip；卡片內不再重複標分類。 */
const CATEGORY_TONE: Record<ProjectCategory, Tone> = {
  資安: 'plum',
  Web: 'blue',
  AI: 'green',
  工具: 'gold',
  遊戲: 'orange',
}

/** 卡片底部的連結標籤：GitHub 連結叫 GitHub，其餘（如 YouTube demo）交給呼叫端命名。 */
function linkLabel(url: string) {
  return url.includes('github') ? 'GitHub' : '連結'
}

const ALL = '全部' as const
type Filter = typeof ALL | ProjectCategory

/** 縮圖。由 `npm run shots` 抓下來存在 public/shots/，放在卡片頂端當主視覺。
    沒圖的項目改放一塊 mono 佔位（專案名 + 狀態），不留空白圖框、也不讓卡片高度崩掉。
    GitHub 的 OG 卡是 1200×630，用同比例方框裁切，object-top 保住預覽裡的標題那行。 */
function CardCover({ item }: { item: WorkItem }) {
  const frame = 'border-line-soft bg-panel-hi relative aspect-1200/630 border-b'

  if (!item.preview) {
    return (
      <div className={`${frame} flex items-center justify-center`}>
        <span className="text-faint px-6 text-center font-mono text-xs tracking-[0.06em]">
          {item.title}
        </span>
      </div>
    )
  }

  return (
    <div className={frame}>
      <Image
        src={item.preview}
        alt={`${item.title} 的頁面預覽`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-top"
      />
    </div>
  )
}

/** 卡片內容：狀態列 → 標題 → 說明 → 技術標籤。
    flex-col + 技術標籤 mt-auto，讓同一列卡片的標籤底線對齊，不受說明長短影響。 */
function CardBody({ item }: { item: WorkItem }) {
  return (
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`} aria-hidden="true" />
        <Eyebrow className={STATUS[item.tone].text}>{item.status}</Eyebrow>
        {/* 整張可點的卡片才在右上放 ↗；有 demo 的卡片改在底部列連結，這裡就不放 */}
        {item.link && !item.demo && (
          <span className="text-faint group-hover:text-amber ml-auto text-sm transition-colors">
            ↗
          </span>
        )}
      </div>
      <h3 className="font-display mb-2 text-lg font-medium tracking-[-0.01em]">{item.title}</h3>
      <p className="text-dim text-base leading-[1.7]">{item.description}</p>
      {(item.metrics || item.demo) && (
        <div className="mt-auto space-y-3 pt-5">
          {item.metrics && (
            <div className="flex flex-wrap gap-2">
              {item.metrics.map((m) => (
                <MetricChip key={m}>{m}</MetricChip>
              ))}
            </div>
          )}
          {/* 有 demo 才出這排：卡片本身不是連結，改在這裡明確給 GitHub / Demo 兩個入口 */}
          {item.demo && (
            <div className="flex flex-wrap gap-4 font-mono text-xs">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim hover:text-amber transition-colors"
                >
                  {linkLabel(item.link)} ↗
                </a>
              )}
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim hover:text-amber transition-colors"
              >
                Demo ↗
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** 一張卡片。有連結時整張可點；hover 邊框轉琥珀，跟站上其他 hover 一致。 */
function ProjectCard({ item }: { item: WorkItem }) {
  const shell =
    'group bg-panel border-line-soft rounded-card flex h-full flex-col overflow-hidden border transition-colors'
  // 可點的卡片 hover 只換邊框顏色，不做浮起/陰影
  const hoverFx = 'hover:border-amber'

  const inner = (
    <>
      <CardCover item={item} />
      <CardBody item={item} />
    </>
  )

  // demo 卡片有兩個連結，不能整張包成 <a>（會巢狀），改用 div，連結放在卡片底部
  if (item.link && !item.demo) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shell} ${hoverFx}`}
      >
        {inner}
      </a>
    )
  }

  return <div className={`${shell} ${item.demo ? hoverFx : ''}`}>{inner}</div>
}

export function WorkList() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const items = filter === ALL ? WORK_ITEMS : WORK_ITEMS.filter((i) => i.category === filter)

  const chipBase =
    'rounded-chip min-h-9 px-3 font-mono text-xs tracking-[0.02em] transition-colors cursor-pointer'

  return (
    <>
      <RevealWrapper className="mb-6">
        {/* 預設全部展開：篩選是捷徑，不是看內容前要先過的一道關 */}
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

      {/* grid 預設 align-items:stretch，所以同一列的卡片自動等高；配合 CardBody 的
          mt-auto，讓每張卡的技術標籤底線對齊。
          key={filter}：切換分類時整塊重繪，讓 RevealWrapper 重新淡入，而不是硬切。 */}
      <div key={filter} className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {items.map((item) => (
          <RevealWrapper key={item.title} className="h-full">
            <ProjectCard item={item} />
          </RevealWrapper>
        ))}
      </div>
    </>
  )
}
