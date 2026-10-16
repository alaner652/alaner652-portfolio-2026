'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { LightboxImage } from '@/components/motion/Lightbox'
import { Reveal, RevealItem, itemStagger } from '@/components/motion/Reveal'

import { cn } from '@/lib/utils'
import type { Photo } from '@/types'

type Labels = {
  eyebrow: string
  title: string
  note: string
  list: string
  open: string
  close: string
  prev: string
  next: string
}

/** 五張照 12 欄排，最寬的一格是 5 欄（約 540px），來源圖只有 1086px，再寬在 Retina 上就糊了。
    桌面：直式那張在左邊撐兩列；右邊第一列 正面迎來（5）+ 山路彎道（3）、第二列 護欄壓彎（4）+ 高架橋下（4）。
    手機兩欄：直式撐兩列、旁邊疊兩張，最後一列兩張並排。 */
const GRID: { i: number; cls: string; pos?: string }[] = [
  { i: 3, cls: 'row-span-2 aspect-[2/3] md:col-span-4 md:aspect-auto md:h-full' },
  { i: 4, cls: 'aspect-[3/2] md:col-span-5', pos: 'object-[50%_35%]' },
  { i: 0, cls: 'aspect-[3/2] md:col-span-3 md:aspect-auto md:h-full', pos: 'object-[62%_50%]' },
  { i: 1, cls: 'aspect-[3/2] md:col-span-4' },
  { i: 2, cls: 'aspect-[3/2] md:col-span-4' },
]

const pad = (n: number) => String(n + 1).padStart(2, '0')
const IMG =
  'object-cover transition-transform duration-1000 ease-[var(--ease-out-soft)] group-hover/shot:scale-[1.04]'

export function RidingGallery({ photos, labels }: { photos: Photo[]; labels: Labels }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const count = photos.length

  const show = (i: number) => {
    setOpen(i)
    const el = dialogRef.current
    if (el && !el.open) el.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  )

  // 燈箱開著時鎖住頁面捲動
  useEffect(() => {
    if (open === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const current = open === null ? null : { ...photos[open], n: pad(open) }

  return (
    <section id="offduty" className="pt-14 pb-10 md:pt-28 md:pb-24" aria-label={labels.list}>
      <Reveal className="wrap mb-5 flex items-end justify-between gap-6 md:mb-8">
        <div>
          <div className="text-text-3 font-mono text-[11px] tracking-[0.18em] uppercase md:text-xs">
            {labels.eyebrow}
          </div>
          <h2 className="text-text mt-2 text-[30px] leading-[1.1] font-black md:mt-3 md:text-h2 md:tracking-[-0.03em]">
            {labels.title}
          </h2>
        </div>
        <span className="text-text-2 hidden shrink-0 text-[15px] md:inline">{labels.note}</span>
      </Reveal>

      {/* 錯落的格子，點了放大 */}
      <Reveal
        as="ul"
        stagger={itemStagger}
        viewport={{ once: true, amount: 0.1 }}
        className="wrap grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5"
      >
        {GRID.map(({ i, cls, pos }) => {
          const p = photos[i]
          return (
            <RevealItem as="li" key={p.src} className={cn('flex flex-col', cls)}>
              <button
                type="button"
                onClick={() => show(i)}
                aria-label={`${labels.open}：${p.alt}`}
                className="group/shot focus-visible:outline-accent relative block min-h-0 flex-1 cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 560px, 50vw"
                  quality={90}
                  className={cn(IMG, pos)}
                />
              </button>
            </RevealItem>
          )
        })}
      </Reveal>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          else if (e.key === 'ArrowLeft') step(-1)
        }}
        className="bg-bg-deep/95 text-text fixed inset-0 m-0 h-full max-h-none w-full max-w-none p-0 backdrop:bg-transparent"
      >
        {current && (
          <div className="flex h-full flex-col px-5 py-5 md:px-10 md:py-7">
            <div className="flex items-center justify-between">
              <div className="text-text-3 font-mono text-xs tracking-[0.14em]">
                {current.n} <span className="text-border-strong">/</span> {pad(count - 1)}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="border-border text-text-2 hover:border-border-strong hover:text-text flex size-11 items-center justify-center rounded-full border transition-colors"
              >
                <X size={18} strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-4 md:gap-5">
              <LightboxImage id={current.src}>
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  quality={90}
                  priority
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </LightboxImage>
              <figcaption className="text-text-2 w-full max-w-[60ch] text-center text-[14px] leading-[1.7] md:text-[15px]">
                {current.alt}
              </figcaption>
            </figure>

            <div className="flex justify-between md:pointer-events-none md:absolute md:inset-x-10 md:top-1/2 md:-translate-y-1/2">
              {(
                [
                  [-1, labels.prev, ChevronLeft],
                  [1, labels.next, ChevronRight],
                ] as const
              ).map(([dir, label, Icon]) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => step(dir)}
                  aria-label={label}
                  className="border-border text-text-2 hover:border-border-strong hover:text-text flex size-11 items-center justify-center rounded-full border md:pointer-events-auto transition-colors"
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
