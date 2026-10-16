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
    外層 overflow hidden 遮住還沒上來的字；讀屏讀外層 h1 的 aria-label，不逐字唸。 */
export function Chars({ text, accent, delay = 0, className }: Props) {
  const parts = charTokens(text)
  const reduce = useReducedMotion()
  const start = accent ? text.indexOf(accent) : -1
  const end = start >= 0 ? start + accent!.length : -1
  // 每個單位在整行裡的起點（先算好，render 裡不改變數）
  const offsets = parts.reduce<number[]>((acc, p, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + parts[i - 1].length)
    return acc
  }, [])
  return (
    <span
      className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className ?? ''}`}
      aria-hidden="true"
    >
      {parts.map((part, i) => {
        const from = offsets[i]
        const hot = start >= 0 && from < end && from + part.trim().length > start
        return (
          <motion.span
            key={i}
            className={hot ? 'text-accent inline-block' : 'inline-block'}
            initial={reduce ? false : { y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: dur.hero, ease: ease.out, delay: delay + i * stagger.char }}
          >
            {part.replace(/ /g, '')}
          </motion.span>
        )
      })}
    </span>
  )
}
