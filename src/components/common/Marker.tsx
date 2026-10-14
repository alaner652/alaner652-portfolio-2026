import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

interface MarkerProps {
  children: React.ReactNode
  /** load：開頁時畫出來（delay 可以排在字標之後）；view：捲到才畫；不給就直接畫好 */
  draw?: 'load' | 'view'
  /** 毫秒，只有 draw="load" 用得到 */
  delay?: number
  className?: string
}

/** 麥克筆底線：一條手畫的橘線墊在字底下，取代舊的 .mark 漸層色塊。
    路徑 pathLength=1，所以 CSS 用 stroke-dashoffset 就能把它「畫出來」；樣式在 globals.css 的 .marker。 */
export function Marker({ children, draw, delay = 0, className }: MarkerProps) {
  return (
    <span
      className={cn(
        'marker',
        draw === 'load' && 'draw-load',
        draw === 'view' && 'draw-view',
        className
      )}
      style={delay ? ({ '--draw-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
      <svg
        className="marker-line"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength={1} d="M2 7 Q 30 3 50 6 T 98 5" />
      </svg>
    </span>
  )
}
