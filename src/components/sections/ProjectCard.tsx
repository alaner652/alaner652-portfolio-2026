import Image from 'next/image'

import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { cn } from '@/lib/utils'
import type { WorkItem, WorkStatus } from '@/types'

/** 狀態只用明暗和一個橘色表達：還在跑的是橘點，開源的是墨點，停掉的是淡點。 */
export const STATUS: Record<WorkStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-amber', text: 'text-amber-text' },
  open: { dot: 'bg-txt', text: 'text-dim' },
  idle: { dot: 'bg-faint', text: 'text-faint' },
}

/** 封面，固定 2:1：GitHub 卡本來就是 2:1，截圖（16:9）切掉底下一點點。只在有圖時出現；沒有就什麼都不畫。 */
export function ProjectCover({
  item,
  className = '',
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority = false,
}: {
  item: WorkItem
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!item.preview) return null
  return (
    <div className={cn('bg-panel-hi relative aspect-2/1 overflow-hidden', className)}>
      <Image
        src={item.preview}
        alt={`${item.title} 的畫面`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  )
}

/** 狀態點 + 狀態字 + 分類字。 */
export function StatusLine({ item, className }: { item: WorkItem; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`} aria-hidden="true" />
      <Eyebrow className={STATUS[item.tone].text}>{item.status}</Eyebrow>
      <span className="text-faint ml-2 font-mono text-2xs tracking-[0.06em]">{item.category}</span>
    </div>
  )
}

/** /projects 的一列：空心兩位數編號（整列滑過去填橘）→ 分類 → 大標題 → 一句結果 → 技術標籤，
    有畫面的右邊放一張圓角細框的封面。整列可點，打開 ProjectDialog。
    lead = 清單第一件、有真實畫面的那件：標題和封面放大。 */
export function ProjectRow({
  item,
  index,
  onOpen,
  lead = false,
}: {
  item: WorkItem
  index: number
  onOpen: (item: WorkItem) => void
  lead?: boolean
}) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <li className="group/card relative">
      <article
        className={cn(
          'grid gap-x-6 gap-y-5 py-8 md:grid-cols-12 md:items-center',
          lead ? 'md:py-12' : 'md:py-9'
        )}
      >
        <div
          className="ghost font-display text-[2.25rem] leading-none font-bold tracking-[-0.04em] tabular-nums md:col-span-1 md:text-[3rem]"
          aria-hidden="true"
        >
          {num}
        </div>
        {/* lead 的封面佔 5 欄、從第 8 欄開始，文字就只能到第 7 欄；撞到會被 grid 擠到下一行 */}
        <div className={cn('min-w-0', lead ? 'md:col-span-6' : 'md:col-span-7')}>
          {/* 列上只留分類；狀態（運作中／已停用）不重要到要每列都講，點開 dialog 才有 */}
          <span className="text-faint font-mono text-2xs tracking-[0.06em]">{item.category}</span>
          <h3
            className={cn(
              'font-display mt-3 leading-[1.15] font-medium tracking-[-0.02em]',
              lead ? 'text-[clamp(1.75rem,3.2vw,2.75rem)]' : 'text-[clamp(1.5rem,2.4vw,2rem)]'
            )}
          >
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="group-hover/card:text-amber cursor-pointer text-left transition-colors after:absolute after:inset-0 after:content-['']"
            >
              {item.title}
            </button>
          </h3>
          {/* 主視覺那件的一句結果改手寫體（草稿 v3 的 lead3），像在相片旁邊寫一行註記；其餘維持內文 */}
          <p
            className={cn(
              'text-dim mt-3',
              lead ? 'font-hand text-[1.4rem] leading-[1.3]' : 'max-w-[48ch] text-md leading-[1.6]'
            )}
          >
            {item.result ?? item.description}
          </p>
          {item.metrics && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.metrics.map((m) => (
                <MetricChip key={m}>{m}</MetricChip>
              ))}
            </div>
          )}
        </div>
        {item.preview && (
          <ProjectCover
            item={item}
            className={cn(
              'border-line-soft rounded-card border',
              lead ? 'md:col-span-5 md:col-start-8' : 'md:col-span-4 md:col-start-9'
            )}
            sizes={lead ? '(min-width: 768px) 440px, 100vw' : '(min-width: 768px) 320px, 100vw'}
            priority={lead}
          />
        )}
      </article>
    </li>
  )
}
