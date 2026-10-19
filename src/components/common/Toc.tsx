'use client'

import { ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { useDict } from '@/i18n/client'
import { cn } from '@/lib/utils'

export interface TocHeading {
  id: string
  text: string
}

/** 「讀到這裡」的線：視窗上方 30% */
const READ_LINE = 0.3

/** 目錄和閱讀進度合在一起算：進度看的是文章本體（#post-body），不是整頁，頁尾不會把進度拉低。
    回傳 0–1 的進度、目前在第幾節。 */
function useReading(headings: TocHeading[]) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const body = document.getElementById('post-body')
    const els = headings.map((h) => document.getElementById(h.id))
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * READ_LINE
      if (body) {
        const r = body.getBoundingClientRect()
        setProgress(Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height - line))))
      }
      let current = -1
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line + 1) current = i
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [headings])

  return { progress, active }
}

const NO = (i: number) => String(i + 1).padStart(2, '0')

/** 一節：編號 + 標題。讀過的變淡、正在讀的橘色、還沒讀的灰（不打勾，2026-10-18 他不喜歡）。 */
function Item({
  h,
  i,
  active,
  onPick,
}: {
  h: TocHeading
  i: number
  active: number
  onPick?: () => void
}) {
  const state = i === active ? 'now' : i < active ? 'done' : 'todo'
  return (
    <li>
      <a
        href={`#${h.id}`}
        onClick={onPick}
        aria-current={state === 'now' ? 'location' : undefined}
        className={cn(
          'group/toc grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2 rounded-lg py-2 pr-2 leading-[1.5] transition-colors',
          state === 'now' && 'text-text font-bold',
          state === 'done' && 'text-text-3',
          state === 'todo' && 'text-text-2 hover:text-text'
        )}
      >
        <span
          className={cn(
            'pt-px font-mono text-[11px] tabular-nums',
            state === 'now' ? 'text-accent' : 'text-text-3'
          )}
        >
          {NO(i)}
        </span>
        <span>{h.text}</span>
      </a>
    </li>
  )
}

/** 進度那一行：百分比 + 還剩幾分鐘 */
function Status({ progress, minutes }: { progress: number; minutes: number }) {
  const d = useDict().blog
  const left = Math.ceil(minutes * (1 - progress))
  return (
    <span className="text-text-3 font-mono text-[11px] tabular-nums">
      {progress >= 0.99 ? d.tocDone : `${Math.round(progress * 100)}% · ${d.tocLeft(left)}`}
    </span>
  )
}

/** 桌機：右欄黏著的目錄。左邊一條軌道跟著讀的進度長，底下是百分比和剩下的時間。 */
export function Toc({ headings, minutes }: { headings: TocHeading[]; minutes: number }) {
  const d = useDict().blog
  const { progress, active } = useReading(headings)
  if (headings.length === 0) return null
  return (
    <nav aria-label={d.tocLabel}>
      <div className="text-text-3 mb-3 font-mono text-[11px] tracking-[0.14em]">{d.toc}</div>
      <div className="relative pl-4">
        <span aria-hidden="true" className="bg-line absolute inset-y-0 left-0 w-0.5 rounded-full" />
        <motion.span
          aria-hidden="true"
          className="bg-accent absolute top-0 left-0 w-0.5 rounded-full"
          style={{ height: `${progress * 100}%` }}
        />
        <ol className="text-[13px]">
          {headings.map((h, i) => (
            <Item key={h.id} h={h} i={i} active={active} />
          ))}
        </ol>
      </div>
      <div className="border-line mt-4 border-t pt-3">
        <Status progress={progress} minutes={minutes} />
      </div>
    </nav>
  )
}

/** 手機：底部一顆浮起來的膠囊（進度圈 + 目前這一節），開始讀之後才出現；
    點開從底下拉出整份目錄，選一節就收起來跳過去。取代原本放在文章最上面、捲下去就找不到的折疊目錄。 */
export function TocMobile({ headings, minutes }: { headings: TocHeading[]; minutes: number }) {
  const d = useDict().blog
  const { progress, active } = useReading(headings)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (headings.length === 0) return null
  const show = progress > 0 && progress < 1
  const current = headings[active]?.text ?? headings[0].text
  const R = 9
  const C = 2 * Math.PI * R

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="bg-bg/70 fixed inset-0 z-40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] xl:hidden print:hidden">
        <AnimatePresence>
          {open && (
            <motion.nav
              key="sheet"
              id="toc-sheet"
              aria-label={d.tocLabel}
              className="bg-surface border-border pointer-events-auto mb-2 max-h-[60svh] overflow-y-auto rounded-2xl border p-4 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-text-3 font-mono text-[11px] tracking-[0.14em]">{d.toc}</span>
                <Status progress={progress} minutes={minutes} />
              </div>
              <ol className="text-[15px]">
                {headings.map((h, i) => (
                  <Item key={h.id} h={h} i={i} active={active} onPick={() => setOpen(false)} />
                ))}
              </ol>
            </motion.nav>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(show || open) && (
            <motion.button
              key="pill"
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="toc-sheet"
              aria-label={`${d.tocLabel}：${current}`}
              className="bg-bg/85 border-border pointer-events-auto flex h-12 w-full items-center gap-3 rounded-full border px-3.5 text-left shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)] backdrop-blur-[12px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                aria-hidden="true"
                className="shrink-0 -rotate-90"
              >
                <circle
                  cx="11"
                  cy="11"
                  r={R}
                  fill="none"
                  stroke="var(--color-line)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="11"
                  cy="11"
                  r={R}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                />
              </svg>
              <span className="text-text min-w-0 flex-1 truncate text-sm">{current}</span>
              <span className="text-text-3 shrink-0 font-mono text-[11px] tabular-nums">
                {Math.round(progress * 100)}%
              </span>
              <ChevronUp
                size={16}
                aria-hidden="true"
                className={cn('text-text-2 shrink-0 transition-transform', open && 'rotate-180')}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
