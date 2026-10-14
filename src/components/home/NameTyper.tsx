'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

/** 三個名字。small R 是品牌，排第一個：SSR、reduce motion 和沒人碰它的時候都停在它。 */
const NAMES = ['small R', '吳宸麒', 'alaner652'] as const

const DELETE_MS = 45 // 刪一個字
const TYPE_CJK_MS = 140 // 打一個中文字
const TYPE_LATIN_MS = 70 // 打一個拉丁字元

function isCjk(ch: string) {
  return (ch.codePointAt(0) ?? 0) > 0x2e80
}

/** Hero 字標。平常就是靜態的「small R」，滑鼠移上去或點一下才把它刪掉、打出下一個名字，
    打完就停，不會自己一直換——第一屏不該有循環動畫。
    SSR 直接輸出完整的第一個名字，所以不會閃、也沒有 hydration 差異；
    reduce motion 時直接換字、不打字。
    Latin 名字用手寫字標（跟導覽列同一套，small R 的 R 用 amber）；手寫體沒有中文字，
    中文名改用標題字體並縮一級。外層 Hero 固定了高度，換字體不會讓下面的內容跳。 */
export function NameTyper() {
  const [text, setText] = useState<string>(NAMES[0])
  const [typing, setTyping] = useState(false)
  const index = useRef(0)
  const busy = useRef(false)
  const reduce = useRef(false)
  const timer = useRef(0)
  const lastAt = useRef(0)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => window.clearTimeout(timer.current)
  }, [])

  function next() {
    // 觸控一下會同時送 pointerenter 和 click；reduce motion 時沒有 busy 擋，靠時間差擋第二次
    const now = Date.now()
    if (busy.current || now - lastAt.current < 400) return
    lastAt.current = now
    // Array.from 才會把中文字當一個單位，不會切到 surrogate pair
    const from = Array.from(NAMES[index.current])
    index.current = (index.current + 1) % NAMES.length
    const to = Array.from(NAMES[index.current])

    if (reduce.current) {
      setText(to.join(''))
      return
    }

    busy.current = true
    setTyping(true)
    let len = from.length

    const schedule = (fn: () => void, ms: number) => {
      timer.current = window.setTimeout(fn, ms)
    }
    const type = () => {
      len += 1
      setText(to.slice(0, len).join(''))
      if (len < to.length) {
        schedule(type, isCjk(to[len]) ? TYPE_CJK_MS : TYPE_LATIN_MS)
      } else {
        busy.current = false
        setTyping(false)
      }
    }
    const erase = () => {
      len -= 1
      setText(from.slice(0, len).join(''))
      schedule(len > 0 ? erase : type, len > 0 ? DELETE_MS : TYPE_CJK_MS)
    }
    schedule(erase, DELETE_MS)
  }

  const cjk = text !== '' && isCjk(text[0])
  // 跟導覽列字標一樣，small R 打完整時 R 才換 amber；打到一半還是同一個顏色
  const accent = text === NAMES[0]

  return (
    <>
      {/* 螢幕閱讀器只念品牌名，不跟著動畫一個字一個字念 */}
      <span className="sr-only">{NAMES[0]}</span>
      <span
        aria-hidden="true"
        onPointerEnter={next}
        onClick={next}
        className={`cursor-default select-none ${
          cjk ? 'font-display text-[0.72em] font-medium tracking-[0.02em]' : ''
        }`}
      >
        {accent
          ? // 開頁時一個字一個字跳出來（CSS 排延遲，見 globals.css 的 .tch）；R 用 amber
            Array.from(NAMES[0]).map((ch, i) => (
              <span
                key={i}
                className={ch === 'R' ? 'tch text-amber' : 'tch'}
                style={{ '--i': i, '--base': '100ms', '--step': '60ms' } as CSSProperties}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))
          : text}
        {typing && (
          <span
            className="bg-amber ml-[0.06em] inline-block h-[0.8em] w-[0.05em] min-w-[3px] translate-y-[0.06em] rounded-xs"
            aria-hidden="true"
          />
        )}
      </span>
    </>
  )
}
