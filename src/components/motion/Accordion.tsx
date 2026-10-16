'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { dur, ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Item {
  q: string
  a: string
}

const NO = (i: number) => String(i + 1).padStart(2, '0')

/** 接案頁「先講清楚」的手風琴（docs/動畫設計.md 接案 7）：
    一列一題，按一下高度展開 0.35s、答案淡入、「+」轉 45°；同時只開一題。
    欄位跟上面「接什麼」對齊（80px 編號欄）。 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="border-line border-b">
      {items.map(({ q, a }, i) => {
        const on = open === i
        const panel = `faq-panel-${i}`
        return (
          <div key={q} className="border-line border-t">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={panel}
                onClick={() => setOpen(on ? null : i)}
                className="group/q grid min-h-16 w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 py-4 text-left md:min-h-24 md:grid-cols-[80px_minmax(0,1fr)_40px] md:gap-x-6 md:py-6"
              >
                <span className="text-text-3 font-mono text-[13px] md:text-base" aria-hidden="true">
                  {NO(i)}
                </span>
                <span
                  className={cn(
                    'group-hover/q:text-accent text-[19px] leading-[1.3] font-black tracking-[-0.02em] transition-colors md:text-[clamp(24px,2.2vw,30px)]',
                    on ? 'text-accent' : 'text-text'
                  )}
                >
                  {q}
                </span>
                <motion.span
                  className={cn(
                    'justify-self-end text-2xl leading-none transition-colors',
                    on ? 'text-accent' : 'text-text-3'
                  )}
                  animate={{ rotate: on ? 45 : 0 }}
                  transition={{ duration: dur.base, ease: ease.out }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={panel}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.35, ease: ease.out },
                    opacity: { duration: dur.base },
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-text-body max-w-[46em] pb-6 text-[15px] leading-[1.8] md:ml-[104px] md:pb-9 md:text-[17px] md:leading-[1.85]">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
