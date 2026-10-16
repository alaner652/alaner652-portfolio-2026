import type { CSSProperties } from 'react'

interface RiseProps {
  /** 要上浮的文字；想讓某幾個字變橘，用 accent 給下標範圍 [起, 迄) */
  text: string
  accent?: [number, number]
  /** 第一個字的延遲（ms），之後每字 +45ms；接續的行自己把前一行的字數乘上去 */
  base?: number
  className?: string
}

/** 逐字上浮的一行：每個字一個 span（樣式在 globals.css 的 .rise-ch）。
    純 CSS，伺服器就渲染完整文字；reduce motion 直接全在。讀屏唸外層的 aria-label，不逐字唸。 */
export function Rise({ text, accent, base = 0, className }: RiseProps) {
  return (
    <span className={className ? `rise-ln ${className}` : 'rise-ln'} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className={accent && i >= accent[0] && i < accent[1] ? 'rise-ch text-accent' : 'rise-ch'}
          style={{ '--i': i, '--base': `${base}ms` } as CSSProperties}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
