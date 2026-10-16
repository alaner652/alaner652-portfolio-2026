'use client'

import { motion, useScroll } from 'motion/react'

/** 文章頁最上緣 3px 橘線，長度 = 整頁捲動進度。 */
export function Progress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      className="bg-accent fixed top-0 left-0 z-60 h-[3px] w-full origin-left print:hidden"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
