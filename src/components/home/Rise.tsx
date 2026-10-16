import type { CSSProperties } from 'react'

interface RiseProps {
  /** 要上浮的一行 */
  text: string
  /** 要變橘的那一段文字（子字串） */
  accent?: string
  /** 第一個字的延遲（ms），之後每個字 +45ms；接續的行自己把前一行的字數乘上去 */
  base?: number
  className?: string
}

/** 把一行切成「上浮單位」：中日韓逐字，拉丁文字逐詞（空白跟著前一個詞），這樣英文不會從單字中間斷行。 */
function tokens(text: string): string[] {
  return text.match(/[A-Za-z0-9'’.,!?;:-]+\s*|\s+|./gu) ?? []
}

/** 逐字（或逐詞）上浮的一行：每個單位一個 span（樣式在 globals.css 的 .rise-ch）。
    純 CSS，伺服器就渲染完整文字；reduce motion 直接全在。讀屏唸外層的 aria-label，不逐字唸。 */
export function Rise({ text, accent, base = 0, className }: RiseProps) {
  const parts = tokens(text)
  const start = accent ? text.indexOf(accent) : -1
  const end = start >= 0 ? start + accent!.length : -1
  let offset = 0
  return (
    <span className={className ? `rise-ln ${className}` : 'rise-ln'} aria-hidden="true">
      {parts.map((part, i) => {
        const from = offset
        offset += part.length
        const hot = start >= 0 && from < end && from + part.trim().length > start
        return (
          <span
            key={i}
            className={hot ? 'rise-ch text-accent' : 'rise-ch'}
            style={{ '--i': i, '--base': `${base}ms` } as CSSProperties}
          >
            {part.replace(/ /g, ' ')}
          </span>
        )
      })}
    </span>
  )
}
