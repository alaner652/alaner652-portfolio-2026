'use client'

import { useEffect, useState } from 'react'

import { useDict } from '@/i18n/client'

export interface TocHeading {
  id: string
  text: string
}

/** 文章的目錄：列出 h2，捲到哪一節就亮哪一節。桌面黏在左欄；手機收在 <details> 裡。 */
export function Toc({ headings, compact = false }: { headings: TocHeading[]; compact?: boolean }) {
  const d = useDict().blog
  const [active, setActive] = useState(headings[0]?.id)

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (els.length === 0 || !('IntersectionObserver' in window)) return
    // 視窗上面 15% 當成「讀到這裡」的線
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const list = (
    <ol className="border-line flex flex-col border-l pl-4">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? 'location' : undefined}
            className="text-text-3 hover:text-text aria-[current]:text-accent block py-1.5 text-[13px] leading-[1.45] aria-[current]:font-bold transition-colors"
          >
            {active === h.id && <span aria-hidden="true">● </span>}
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  )

  if (compact) {
    return (
      <details className="border-line group/toc border-b">
        <summary className="text-accent flex min-h-11 cursor-pointer list-none items-center justify-between font-mono text-[13px] [&::-webkit-details-marker]:hidden">
          {d.toc}
          <span className="group-open/toc:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <nav aria-label={d.tocLabel} className="pb-4">
          {list}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label={d.tocLabel} className="sticky top-24">
      {list}
    </nav>
  )
}
