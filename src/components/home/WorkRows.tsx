'use client'

import Image from 'next/image'
import { useState, type PointerEvent } from 'react'

import { LLink as Link } from '@/i18n/client'
import { cn } from '@/lib/utils'
import type { WorkItem } from '@/types'

interface WorkRowsProps {
  items: WorkItem[]
  /** 列表編號從幾號開始（精選那件佔了 01） */
  start: number
  /** 「還有 N 個」那列；不給就不顯示（接案頁只列三件） */
  rest?: number
  moreLabel?: string
}

/** 首頁作品清單：一列一件、細線分隔。滑過某列：標題變橘並右移 16px、其他列退到 35%、
    那件的截圖跟著游標浮出並微傾 ±3°（純 transform / opacity）。最後一列「還有 N 個」帶去 /projects。 */
export function WorkRows({ items, start, rest, moreLabel }: WorkRowsProps) {
  const [hover, setHover] = useState(-1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const any = hover >= 0
  const current = any ? items[hover] : null

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const row =
    'grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-line py-5 transition-opacity duration-250 md:grid-cols-[80px_minmax(0,1fr)_40px] md:items-center md:gap-x-6 md:py-7'

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(-1)}>
      {items.map((item, i) => {
        const on = hover === i
        return (
          <Link
            key={item.title}
            href={`/projects/${item.slug}`}
            onPointerEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(-1)}
            className={cn(row, any && !on && 'opacity-35')}
          >
            <span
              className={cn(
                'font-mono text-[13px] transition-colors md:text-base',
                on ? 'text-accent' : 'text-text-3'
              )}
            >
              {String(start + i).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'flex flex-wrap items-baseline gap-x-5 gap-y-1 transition-transform duration-350 ease-[var(--ease-out-soft)] motion-reduce:transition-none',
                on && 'md:translate-x-4'
              )}
            >
              <span
                className={cn(
                  'text-[24px] font-black tracking-[-0.02em] transition-colors md:text-[40px]',
                  on ? 'text-accent' : 'text-text'
                )}
              >
                {item.title}
              </span>
              {item.result && (
                <span className="text-text-2 hidden text-base md:inline">{item.result}</span>
              )}
            </span>
            <span
              className={cn(
                'text-accent text-[22px] transition-[opacity,transform] duration-300 md:text-[28px]',
                on ? 'opacity-100' : '-translate-x-3 opacity-0'
              )}
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        )
      })}
      {rest !== undefined ? (
        <Link
          href="/projects"
          onPointerEnter={() => setHover(-1)}
          className={cn(row, 'border-b', any && 'opacity-35')}
        >
          <span className="text-accent font-mono text-[13px] md:text-base">+{rest}</span>
          <span className="text-text-2 text-lg md:text-xl">{moreLabel}</span>
          <span />
        </Link>
      ) : (
        <div className="border-line border-t" />
      )}

      {/* 跟著游標的截圖：桌面才有（手機沒有 hover） */}
      {current?.preview && (
        <div
          aria-hidden="true"
          className="border-border-strong bg-raised pointer-events-none absolute top-0 left-0 hidden w-80 overflow-hidden rounded-md border transition-[transform,opacity] duration-200 ease-[var(--ease-out-soft)] motion-reduce:transition-none md:block"
          style={{
            transform: `translate(${pos.x + 32}px, ${pos.y - 110}px) rotate(${hover % 2 ? 3 : -3}deg)`,
          }}
        >
          <Image
            src={current.preview}
            alt=""
            width={640}
            height={320}
            className="aspect-2/1 w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  )
}
