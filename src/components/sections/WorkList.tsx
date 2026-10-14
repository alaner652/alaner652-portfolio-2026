'use client'

import { useState } from 'react'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { ProjectRow } from '@/components/sections/ProjectCard'
import { ProjectDialog } from '@/components/sections/ProjectDialog'
import { WORK_ITEMS } from '@/constants'
import { PROJECT_CATEGORIES } from '@/types'
import type { ProjectCategory, WorkItem } from '@/types'

const ALL = '全部' as const
type Filter = typeof ALL | ProjectCategory

/** 只列真的有專案的分類，不然點進去是空的 */
const CATEGORIES = PROJECT_CATEGORIES.filter((c) => WORK_ITEMS.some((i) => i.category === c))

/** /projects：一張目錄。看全部時，有真實畫面的精選排第一件、放大當主視覺；其餘照 WORK_ITEMS 的順序。
    切到某個分類就只剩那個分類，第一件不特別放大。 */
export function WorkList() {
  const [filter, setFilter] = useState<Filter>(ALL)
  // 點開的那一個；整頁只有一個 dialog，換 item 就換內容
  const [selected, setSelected] = useState<WorkItem | null>(null)

  // 主視覺要是真的產品畫面，GitHub 卡不算
  const lead = WORK_ITEMS.find((i) => i.featured && i.preview && !i.card) ?? WORK_ITEMS[0]
  const items =
    filter === ALL
      ? [lead, ...WORK_ITEMS.filter((i) => i !== lead)]
      : WORK_ITEMS.filter((i) => i.category === filter)

  const chipBase =
    'rounded-chip min-h-9 shrink-0 px-3 font-mono text-xs tracking-[0.02em] transition-colors cursor-pointer'

  return (
    <>
      <Section id="all" className="border-t-0" wrapClassName="pt-0 md:pt-0">
        <RevealWrapper className="mb-5">
          {/* 預設全部展開：篩選是捷徑，不是看內容前要先過的一道關。手機橫向捲，不折行 */}
          <div
            className="-mx-6 flex [scrollbar-width:none] items-center gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0"
            role="group"
            aria-label="依分類篩選專案"
          >
            <span className="font-hand text-faint mr-2 shrink-0 text-[1.3rem] leading-none">
              照分類 —
            </span>
            {([ALL, ...CATEGORIES] as Filter[]).map((option) => {
              const active = filter === option
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option)}
                  className={`${chipBase} ${
                    active ? 'bg-txt text-bg' : 'border-line text-dim hover:text-txt border'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </RevealWrapper>

        {/* key={filter}：切換分類時整塊重繪，讓 RevealWrapper 重新淡入，而不是硬切 */}
        <RevealWrapper key={filter}>
          <ol className="divide-line-soft border-line-soft divide-y border-y">
            {items.map((item, i) => (
              <ProjectRow
                key={item.title}
                item={item}
                index={i}
                lead={filter === ALL && i === 0}
                onOpen={setSelected}
              />
            ))}
          </ol>
        </RevealWrapper>
      </Section>

      <ProjectDialog item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
