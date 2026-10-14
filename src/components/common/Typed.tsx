import type { CSSProperties } from 'react'

interface TypedProps {
  text: string
  /** 第一個字幾毫秒後出現 */
  base?: number
  /** 字與字之間隔幾毫秒 */
  step?: number
  className?: string
}

/** 「打字」：每個字一個 span，用 CSS 變數排延遲，字一個接一個跳出來（不是淡入）。
    純 CSS，伺服器就渲染完整文字，沒有閃爍、沒有 hydration 差異；reduce motion 直接全部顯示。
    樣式在 globals.css 的 .tch。 */
export function Typed({ text, base = 0, step = 80, className }: TypedProps) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className={className ? `tch ${className}` : 'tch'}
          style={{ '--i': i, '--base': `${base}ms`, '--step': `${step}ms` } as CSSProperties}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  )
}
