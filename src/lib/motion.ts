/** 全站動畫 token（docs/動畫設計.md 第 2 節）。元件只從這裡拿數字，不自己寫。 */
import type { Transition } from 'motion/react'

export const ease = {
  out: [0.2, 0.7, 0.1, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const dur = {
  fast: 0.18,
  base: 0.32,
  slow: 0.7,
  hero: 0.8,
}

export const stagger = {
  char: 0.045,
  item: 0.08,
}

export const rise = { sm: 14, md: 28 }

/** whileInView 共用：只演一次，露出兩成就算進來 */
export const viewport = { once: true, amount: 0.2 } as const

export const tr = {
  fast: { duration: dur.fast, ease: ease.out } satisfies Transition,
  base: { duration: dur.base, ease: ease.out } satisfies Transition,
  slow: { duration: dur.slow, ease: ease.out } satisfies Transition,
  /** 句點、小按鈕那種「彈一下」 */
  pop: { type: 'spring', stiffness: 400, damping: 18 } satisfies Transition,
}

/** 首頁 H1 逐字用：切成「上浮單位」，中日韓逐字、拉丁逐詞（空白跟著前一個詞），英文不會從單字中間斷。
    放這裡（不是 Chars.tsx）是因為 server component 也要算下一行的延遲。 */
export function charTokens(text: string): string[] {
  return text.match(/[A-Za-z0-9'’.,!?;:-]+\s*|\s+|./gu) ?? []
}

/** 一行逐字出完的時間（秒）：給下一行當 delay */
export function charsEnd(text: string, delay = 0) {
  return delay + charTokens(text).length * stagger.char
}
