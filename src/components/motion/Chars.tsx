'use client'

import { motion, useReducedMotion } from 'motion/react'

import { charTokens, dur, ease, stagger } from '@/lib/motion'

interface Props {
  text: string
  /** 要變橘的那一段（子字串） */
  accent?: string
  /** 第一個字的延遲（秒） */
  delay?: number
  className?: string
}

/** 首頁 H1 專用：一行字逐字從底下 105% 升到定位，每字隔 45ms，0.8s。
    外層 overflow hidden 遮住還沒上來的字；讀屏讀外層 h1 的 aria-label，不逐字唸。
    換行規則：句尾標點黏在前一個字上（charTokens 處理）；accent 那段（「產品」）整段綁成一個單位，
    不會被拆到兩行；單字後面的空格放在 inline-block 外面，英文才斷得開、也不會被吃掉。 */
export function Chars({ text, accent, delay = 0, className }: Props) {
  const tokens = charTokens(text)
  const reduce = useReducedMotion()
  const start = accent ? text.indexOf(accent) : -1
  const end = start >= 0 ? start + accent!.length : -1

  // 每個 token 在整行裡的起點，再把落在 accent 範圍內的 token 併成同一個單位
  const units: { from: number; text: string; index: number }[] = []
  let from = 0
  tokens.forEach((tok, i) => {
    const inAccent = start >= 0 && from < end && from + tok.trimEnd().length > start
    const prev = units[units.length - 1]
    const prevInAccent =
      prev && start >= 0 && prev.from < end && prev.from + prev.text.length > start
    if (inAccent && prevInAccent && !/\s$/.test(prev.text)) prev.text += tok
    else units.push({ from, text: tok, index: i })
    from += tok.length
  })

  return (
    <span
      className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className ?? ''}`}
      aria-hidden="true"
    >
      {units.map((u) => {
        const word = u.text.trimEnd()
        const space = u.text.length > word.length
        return (
          <span key={u.from}>
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{
                duration: dur.hero,
                ease: ease.out,
                delay: delay + u.index * stagger.char,
              }}
            >
              {[...word].map((ch, k) =>
                u.from + k >= start && u.from + k < end ? (
                  <span key={k} className="text-accent">
                    {ch}
                  </span>
                ) : (
                  ch
                )
              )}
            </motion.span>
            {space && ' '}
          </span>
        )
      })}
    </span>
  )
}
