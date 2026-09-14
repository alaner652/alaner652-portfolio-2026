'use client'

import { useEffect, useState } from 'react'

/** 三個名字輪流打出來。順序照「最正式 → 最常用」。 */
const NAMES = ['吳宸麒', 'small R', 'alaner652'] as const

const HOLD_MS = 2200 // 打完停多久
const DELETE_MS = 55 // 刪一個字
const TYPE_CJK_MS = 150 // 打一個中文字
const TYPE_LATIN_MS = 85 // 打一個拉丁字元

function isCjk(ch: string) {
  return (ch.codePointAt(0) ?? 0) > 0x2e80
}

/** Hero 主標裡會替換的名字，打字機效果。
    SSR 直接輸出完整的第一個名字，所以不會閃、也沒有 hydration 差異；
    使用者開了 reduce motion 就停在第一個名字不動，游標也不顯示。 */
export function NameTyper() {
  const [text, setText] = useState<string>(NAMES[0])
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // 游標下一幀才出現：effect 裡同步 setState 會被 lint 擋，也沒必要搶那一幀
    const raf = requestAnimationFrame(() => setAnimate(true))

    let timer = 0
    let index = 0
    // Array.from 才會把中文字當一個單位，不會切到 surrogate pair
    let chars = Array.from(NAMES[0])
    let len = chars.length
    // 第一個名字 SSR 就已經打完了，所以從「刪掉它」開始
    let deleting = true

    const schedule = (fn: () => void, ms: number) => {
      timer = window.setTimeout(fn, ms)
    }

    const tick = () => {
      if (deleting) {
        len -= 1
        setText(chars.slice(0, len).join(''))
        if (len === 0) {
          deleting = false
          index = (index + 1) % NAMES.length
          chars = Array.from(NAMES[index])
          schedule(tick, TYPE_CJK_MS)
        } else {
          schedule(tick, DELETE_MS)
        }
        return
      }

      len += 1
      setText(chars.slice(0, len).join(''))
      if (len === chars.length) {
        deleting = true
        schedule(tick, HOLD_MS)
      } else {
        schedule(tick, isCjk(chars[len]) ? TYPE_CJK_MS : TYPE_LATIN_MS)
      }
    }

    schedule(tick, HOLD_MS)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* 螢幕閱讀器只念完整的第一個名字，不跟著動畫一個字一個字念 */}
      <span className="sr-only">{NAMES[0]}</span>
      <span aria-hidden="true" className="text-amber">
        {text}
        {animate && (
          <span
            className="bg-amber animate-blink ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] rounded-xs"
            aria-hidden="true"
          />
        )}
      </span>
    </>
  )
}
