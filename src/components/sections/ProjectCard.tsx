import Image from 'next/image'

import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import type { WorkItem, WorkStatus } from '@/types'

/** 顏色在這裡是狀態的編碼，不是裝飾：綠＝還在跑，藍＝開源，停掉的就不給顏色。
    首頁精選列和彈出視窗也用這一份。 */
export const STATUS: Record<WorkStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-green-ink', text: 'text-green-ink' },
  open: { dot: 'bg-blue-ink', text: 'text-blue-ink' },
  idle: { dot: 'bg-faint', text: 'text-faint' },
}

/** 縮圖。由 `npm run shots` 抓下來存在 public/shots/，放在卡片頂端當主視覺。
    沒圖的項目改放一塊 mono 佔位（專案名），不留空白圖框、也不讓卡片高度崩掉。
    GitHub 的 OG 卡是 1200×630，用同比例方框裁切，object-top 保住預覽裡的標題那行。
    首頁精選列也用這個，外框樣式由呼叫端決定（卡片是 border-b、列表是整圈圓角）。 */
export function ProjectCover({ item, className = '' }: { item: WorkItem; className?: string }) {
  const frame = `bg-panel-hi relative aspect-1200/630 ${className}`

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

/** 卡片內容：狀態列 → 標題 → 一句概要 → 技術標籤。
    說明只留概要（line-clamp），全文、連結、大圖都在點開後的 ProjectDialog。
    flex-col + 技術標籤 mt-auto，讓同一列卡片的標籤底線對齊，不受說明長短影響。 */
function CardBody({ item }: { item: WorkItem }) {
  return (
    <div className="flex flex-1 flex-col p-5 text-left">
      <div className="mb-2 flex items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`} aria-hidden="true" />
        <Eyebrow className={STATUS[item.tone].text}>{item.status}</Eyebrow>
        <span className="text-faint group-hover/card:text-amber ml-auto font-mono text-2xs tracking-[0.04em] transition-colors">
          點開看
        </span>
      </div>
      <h3 className="font-display mb-2 text-lg font-medium tracking-[-0.01em]">{item.title}</h3>
      <p className="text-dim line-clamp-2 text-base leading-[1.7]">{item.description}</p>
      {item.metrics && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {item.metrics.map((m) => (
            <MetricChip key={m}>{m}</MetricChip>
          ))}
        </div>
      )}
    </div>
  )
}

/** 一張卡片：整張是按鈕，點了由呼叫端打開 ProjectDialog。
    hover 只換邊框顏色，跟站上其他 hover 一致。 */
export function ProjectCard({
  item,
  onOpen,
}: {
  item: WorkItem
  onOpen: (item: WorkItem) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group/card bg-panel border-line-soft rounded-card hover:border-amber flex h-full w-full cursor-pointer flex-col overflow-hidden border transition-colors"
    >
      <ProjectCover item={item} className="border-line-soft w-full border-b" />
      <CardBody item={item} />
    </button>
  )
}
