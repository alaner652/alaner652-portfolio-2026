'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { WORK_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/types'
import type { ProjectCategory, WorkItem } from '@/types'

const ALL = '全部' as const
type Filter = typeof ALL | ProjectCategory

const CATEGORIES = PROJECT_CATEGORIES.filter((c) => WORK_ITEMS.some((i) => i.category === c))

function linkLabel(url: string) {
  if (url.includes('github')) return 'GitHub'
  if (url.includes('youtu')) return '影片'
  if (url.includes('roblox')) return 'Roblox'
  return '線上版'
}

function matches(item: WorkItem, q: string) {
  if (!q) return true
  const hay = [item.title, item.category, item.result, item.description, ...(item.metrics ?? [])]
    .join(' ')
    .toLowerCase()
  return hay.includes(q.toLowerCase())
}

/** 右欄的預覽：滑過哪一列就換成那件。手機版塞在第一列底下。 */
function Preview({
  item,
  index,
  className,
  title = true,
}: {
  item: WorkItem
  index: number
  className?: string
  /** 手機版接在列底下時標題已經在列上，不再印一次 */
  title?: boolean
}) {
  const ext = [item.link, item.demo].filter((l): l is string => Boolean(l))
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {item.preview && (
        <div className="border-border bg-raised overflow-hidden rounded border">
          <Image
            src={item.preview}
            alt={`${item.title} 的畫面`}
            width={1200}
            height={600}
            sizes="(min-width: 768px) 520px, 100vw"
            className="aspect-2/1 w-full object-cover object-top"
          />
        </div>
      )}
      <div className={cn('flex items-baseline gap-3.5', !title && 'hidden')}>
        <span className="text-accent font-mono text-[28px] md:text-[40px]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-text text-[26px] font-black tracking-[-0.02em] md:text-[34px]">
          {item.title}
        </span>
      </div>
      <p className="text-text-2 text-[15px] leading-[1.8] md:text-base">{item.description}</p>
      {item.metrics && (
        <p className="text-text-3 border-line border-t pt-3.5 text-sm">{item.metrics.join('、')}</p>
      )}
      <div className="flex flex-wrap gap-6 text-[15px]">
        <Link href={`/projects/${item.slug}`} className="border-accent text-accent border-b pb-0.5">
          看完整介紹 →
        </Link>
        {ext.map((href) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border-strong text-text hover:border-text border-b pb-0.5 transition-colors"
          >
            {linkLabel(href)} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

/** /projects：一張目錄。左邊一列一件（空心大編號，滑過填橘），右邊黏著的預覽欄跟著換。
    上方分類 tab 帶數量、搜尋框找專案或技術。 */
export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const [q, setQ] = useState('')
  const [hover, setHover] = useState<string | null>(null)

  const items = useMemo(
    () => WORK_ITEMS.filter((i) => (filter === ALL || i.category === filter) && matches(i, q)),
    [filter, q]
  )
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.slug === hover)
  )
  const active = items[activeIndex]
  const count = (c: Filter) =>
    c === ALL ? WORK_ITEMS.length : WORK_ITEMS.filter((i) => i.category === c).length

  return (
    <>
      <div className="wrap border-line mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b md:mt-10">
        <div
          role="group"
          aria-label="分類"
          className="-mx-5 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:gap-7 md:px-0"
        >
          {([ALL, ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                'min-h-11 shrink-0 cursor-pointer border-b-2 px-0.5 text-[15px] transition-colors md:text-base',
                filter === c
                  ? 'border-accent text-text'
                  : 'text-text-3 hover:text-text border-transparent'
              )}
            >
              {c}
              <sup className="ml-0.5 font-mono text-[11px]">{count(c)}</sup>
            </button>
          ))}
        </div>
        <label className="text-text-3 flex items-center gap-2 text-sm">
          搜尋
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="專案或技術"
            className="border-border-strong text-text placeholder:text-text-3 h-9 w-44 border-b bg-transparent text-sm outline-none focus-visible:border-accent md:w-55"
          />
        </label>
      </div>

      <div className="wrap grid gap-8 pt-2 pb-20 md:grid-cols-12 md:gap-8 md:pb-24">
        <ol className="md:col-span-7" onPointerLeave={() => setHover(null)}>
          {items.length === 0 && (
            <li className="text-text-3 py-10 text-sm">沒有符合「{q}」的專案。</li>
          )}
          {items.map((item, i) => {
            const on = i === activeIndex
            return (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  onPointerEnter={() => setHover(item.slug)}
                  onFocus={() => setHover(item.slug)}
                  className={cn(
                    'group/row border-line grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b py-5 transition-colors md:grid-cols-[5.5rem_minmax(0,1fr)_5rem_1.5rem] md:gap-x-5 md:py-6',
                    on && 'is-active'
                  )}
                >
                  <span
                    className={cn(
                      'ghost text-[2rem] leading-none font-black tracking-[-0.04em] tabular-nums md:text-[3rem]',
                      on && 'ghost-on'
                    )}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[20px] font-bold transition-colors md:text-[22px]',
                        on ? 'text-accent' : 'text-text'
                      )}
                    >
                      {item.title}
                    </span>
                    {item.metrics && (
                      <span className="text-text-3 mt-0.5 block text-[13px]">
                        {item.metrics.join(' / ')}
                      </span>
                    )}
                  </span>
                  <span className="text-text-2 text-sm">{item.category}</span>
                  <span
                    className={cn('hidden md:block', on ? 'text-accent' : 'text-text-3')}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
                {/* 手機：預覽接在目前這一列底下 */}
                {on && active && (
                  <Preview
                    item={active}
                    index={i}
                    title={false}
                    className="border-line border-b py-5 md:hidden"
                  />
                )}
              </li>
            )
          })}
        </ol>
        {active && (
          <aside className="hidden md:col-span-5 md:block">
            <div className="sticky top-24">
              <Preview item={active} index={activeIndex} />
            </div>
          </aside>
        )}
      </div>
    </>
  )
}
