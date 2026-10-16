'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

/** 首頁 Hero 的文字跟著捲動往下漂並淡出（y = scroll × 0.3，700px 內淡到 0）。桌面才做。 */
export function HeroDrift({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { scrollY } = useScroll()
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  const y = useTransform(scrollY, [0, 700], [0, 210])
  const opacity = useTransform(scrollY, [0, 700], [1, 0])
  return (
    <motion.div className={className} style={desktop ? { y, opacity } : undefined}>
      {children}
    </motion.div>
  )
}
