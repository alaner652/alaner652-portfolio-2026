'use client'

import { AnimatePresence, motion } from 'motion/react'

import { dur, ease } from '@/lib/motion'

/** 燈箱裡的那張圖：換圖時舊的淡出、新的從 0.96 放大到 1 並淡入。key 用圖片來源。 */
export function LightboxImage({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className="flex min-h-0 max-w-full flex-1 items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: dur.base, ease: ease.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
