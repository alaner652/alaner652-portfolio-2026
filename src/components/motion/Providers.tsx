'use client'

import { MotionConfig } from 'motion/react'

/** 全站 motion 設定：使用者開了 reduced motion 就全部直接完成狀態。 */
export function MotionProviders({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
