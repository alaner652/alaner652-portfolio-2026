'use client'

import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { ProjectCover, STATUS } from '@/components/sections/ProjectCard'
import type { WorkItem } from '@/types'

function linkLabel(url: string) {
  if (url.includes('github')) return 'GitHub'
  if (url.includes('youtu')) return '影片'
  return '打開'
}

/** 專案的彈出視窗：大圖 → 狀態 → 標題 → 全文 → 技術標籤 → 連結。
    用原生 <dialog>：Esc、焦點圈、backdrop 都是瀏覽器內建的，不用自己寫。
    item 為 null 就關閉；點到 backdrop（dialog 本身，而不是裡面的面板）也關。 */
export function ProjectDialog({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (item && !el.open) el.showModal()
    if (!item && el.open) el.close()
  }, [item])

  // 開著的時候鎖住底下的捲動；關掉還原
  useEffect(() => {
    if (!item) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [item])

  const links = item
    ? [
        item.link && { href: item.link, label: linkLabel(item.link) },
        item.demo && { href: item.demo, label: 'Demo' },
      ].filter((l): l is { href: string; label: string } => Boolean(l))
    : []

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-label={item?.title}
      className="bg-bg text-txt border-line rounded-card m-auto w-[calc(100%-2rem)] max-w-2xl border p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-[2px] open:motion-safe:animate-fade-up"
    >
      {item && (
        <div className="max-h-[85dvh] overflow-y-auto">
          <ProjectCover item={item} className="border-line-soft border-b" />
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-1.5">
              <span
                className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`}
                aria-hidden="true"
              />
              <Eyebrow className={STATUS[item.tone].text}>{item.status}</Eyebrow>
              <span className="text-faint ml-3 font-mono text-2xs tracking-[0.06em]">
                {item.category}
              </span>
            </div>
            <h2 className="font-display mt-2 text-h3 font-medium tracking-[-0.015em]">
              {item.title}
            </h2>
            <p className="text-dim mt-3 text-md leading-[1.8]">{item.description}</p>
            {item.metrics && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.metrics.map((m) => (
                  <MetricChip key={m}>{m}</MetricChip>
                ))}
              </div>
            )}
            {links.length > 0 && (
              <div className="border-line-soft mt-6 flex flex-wrap gap-3 border-t pt-5">
                {links.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 font-mono text-xs transition-colors"
                  >
                    {label} <ArrowUpRight size={12} aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="關閉"
        className="bg-bg/80 text-dim hover:text-txt border-line-soft absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border backdrop-blur transition-colors"
      >
        <X size={16} aria-hidden />
      </button>
    </dialog>
  )
}
