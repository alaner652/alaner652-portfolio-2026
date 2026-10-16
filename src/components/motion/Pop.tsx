'use client'

import { motion } from 'motion/react'

import { tr } from '@/lib/motion'

/** 放在 <RevealItem> 底下：父層變成 show 之後 0.15s，從 0 彈到 1（spring）。首頁三個動詞的橘色句點。 */
export function Pop({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', transformOrigin: 'left bottom' }}
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1, transition: { ...tr.pop, delay: 0.15 } },
      }}
    >
      {children}
    </motion.span>
  )
}
