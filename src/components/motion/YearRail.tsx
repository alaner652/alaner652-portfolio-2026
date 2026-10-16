'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { dur, ease } from '@/lib/motion'

/** 關於頁年份列的外框（docs/動畫設計.md 關於 4–5）：
    左邊一條 2px 橘線，長度 = 這個列表捲過的比例（桌面才顯示）。 */
export function YearRail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 40%'] })
  return (
    <ol ref={ref} className="relative">
      <motion.span
        aria-hidden="true"
        className="bg-accent absolute top-0 bottom-0 -left-6 hidden w-0.5 origin-top md:block"
        style={{ scaleY: scrollYProgress }}
      />
      {children}
    </ol>
  )
}

/** 一個空心年份：經過視窗中段（40%–60%）時描邊從灰亮到白、字放大 1.04，離開再回去。
    填橘的「現在」那一年不經過這裡。 */
export function YearSpot({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 15%'] })
  const stroke = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5, 0.65, 1],
    [
      'var(--color-border-strong)',
      'var(--color-border-strong)',
      'var(--color-text)',
      'var(--color-border-strong)',
      'var(--color-border-strong)',
    ]
  )
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [1, 1, 1.04, 1, 1])
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ WebkitTextStrokeColor: stroke, scale, transformOrigin: 'left bottom' }}
      transition={{ duration: dur.base, ease: ease.out }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}
