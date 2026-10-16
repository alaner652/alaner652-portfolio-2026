'use client'

import Image from 'next/image'
import { LLink as Link } from '@/i18n/client'
import { useMemo, useState } from 'react'

import { useDict } from '@/i18n/client'
import { cn } from '@/lib/utils'
import { PROJECT_CATEGORIES } from '@/types'
import type { ProjectCategory, WorkItem } from '@/types'

const ALL = '__all__' as const
type Filter = typeof ALL | ProjectCategory

type P = ReturnType<typeof useDict>['projects']
function linkLabel(url: string, L: P['link']) {
  if (url.includes('github')) return L.github
  if (url.includes('youtu')) return L.video
  if (url.includes('roblox')) return L.roblox
  return L.live
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
  d,
}: {
  item: WorkItem
  index: number
  className?: string
  d: P
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
            alt={d.screenAlt(item.title)}
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
          {d.caseLink}
        </Link>
        {ext.map((href) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border-strong text-text hover:border-text border-b pb-0.5"
          >
            {linkLabel(href, d.link)} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

/** /projects：一張目錄。左邊一列一件（空心大編號，滑過填橘），右邊黏著的預覽欄跟著換。
    上方分類 tab 帶數量、搜尋框找專案或技術。 */
export function ProjectIndex({ items: WORK_ITEMS }: { items: WorkItem[] }) {
  const d = useDict().projects
  const CATEGORIES = PROJECT_CATEGORIES.filter((c) => WORK_ITEMS.some((i) => i.category === c))
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
          aria-label={d.category}
          className="-mx-5 flex gap-6 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:gap-7 md:px-0"
        >
          {([ALL, ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                'min-h-11 shrink-0 cursor-pointer border-b-2 px-0.5 text-[15px] md:text-base',
                filter === c
                  ? 'border-accent text-text'
                  : 'text-text-3 hover:text-text border-transparent'
              )}
            >
              {c === ALL ? d.all : (d.categories[c] ?? c)}
              <sup className="ml-0.5 font-mono text-[11px]">{count(c)}</sup>
            </button>
          ))}
        </div>
        <label className="text-text-3 flex items-center gap-2 text-sm">
          {d.search}
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={d.searchPlaceholder}
            className="border-border-strong text-text placeholder:text-text-3 h-9 w-44 border-b bg-transparent text-sm outline-none focus-visible:border-accent md:w-55"
          />
        </label>
      </div>

      <div className="wrap grid gap-8 pt-2 pb-20 md:grid-cols-12 md:gap-8 md:pb-24">
        <ol className="md:col-span-7" onPointerLeave={() => setHover(null)}>
          {items.length === 0 && <li className="text-text-3 py-10 text-sm">{d.empty(q)}</li>}
          {items.map((item, i) => {
            const on = i === activeIndex
            return (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  onPointerEnter={() => setHover(item.slug)}
                  onFocus={() => setHover(item.slug)}
                  className={cn(
                    'group/row border-line grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b py-5 md:grid-cols-[5.5rem_minmax(0,1fr)_5rem_1.5rem] md:gap-x-5 md:py-6',
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
                        'block text-[20px] font-bold md:text-[22px]',
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
                  <span className="text-text-2 text-sm">
                    {d.categories[item.category] ?? item.category}
                  </span>
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
                    d={d}
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
              <Preview item={active} index={activeIndex} d={d} />
            </div>
          </aside>
        )}
      </div>
    </>
  )
}
