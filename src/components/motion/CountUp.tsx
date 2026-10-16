'use client'

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect } from 'react'

import { ease } from '@/lib/motion'

/** 作品頁右上的空心作品數：載入後從 00 跑到真實數字，1.4s。 */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const n = useMotionValue(0)
  const text = useTransform(n, (v) => String(Math.round(v)).padStart(2, '0'))
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) {
      n.set(to)
      return
    }
    const c = animate(n, to, { duration: 1.4, ease: ease.out, delay: 0.3 })
    return () => c.stop()
  }, [n, to, reduce])
  return (
    <motion.div className={className} aria-hidden="true">
      {text}
    </motion.div>
  )
}
