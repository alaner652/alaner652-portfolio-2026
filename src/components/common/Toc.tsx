'use client'

import { useEffect, useState } from 'react'

export interface TocHeading {
  id: string
  text: string
}

/** 文章左欄的目錄：列出 h2，捲到哪一節就亮哪一節。黏在視窗上緣底下，只在寬螢幕出現。 */
export function Toc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id)

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (els.length === 0 || !('IntersectionObserver' in window)) return

    // 視窗上面 20% 當成「讀到這裡」的線：最後一個越過那條線的標題就是目前的節
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="目錄" className="sticky top-22">
      <div className="font-hand text-dim mb-4 text-[1.5rem] leading-none">目錄 —</div>
      <ol className="border-line-soft flex flex-col gap-0.5 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? 'location' : undefined}
              className="text-faint hover:text-txt aria-[current]:text-amber-text aria-[current]:border-amber -ml-px block border-l-2 border-transparent py-1.5 pl-3.5 text-xs leading-[1.4] transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
