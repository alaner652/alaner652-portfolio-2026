'use client'

import { useState } from 'react'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { ProjectDialog } from '@/components/sections/ProjectDialog'
import { WORK_ITEMS } from '@/constants'
import { TONE_CHIP } from '@/lib/tone'
import { PROJECT_CATEGORIES } from '@/types'
import type { ProjectCategory, Tone, WorkItem } from '@/types'

/** 分類沿用「會的東西」的配色邏輯：資安紫、Web 藍、AI 綠、工具金。
    只用在上方的篩選 chip；卡片內不再重複標分類。 */
const CATEGORY_TONE: Record<ProjectCategory, Tone> = {
  資安: 'plum',
  Web: 'blue',
  AI: 'green',
  工具: 'gold',
  遊戲: 'orange',
}

const ALL = '全部' as const
type Filter = typeof ALL | ProjectCategory

export function WorkList() {
  const [filter, setFilter] = useState<Filter>(ALL)
  // 點開的那一個；整頁只有一個 dialog，換 item 就換內容
  const [selected, setSelected] = useState<WorkItem | null>(null)
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
            <ProjectCard item={item} onOpen={setSelected} />
          </RevealWrapper>
        ))}
      </div>

      <ProjectDialog item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
