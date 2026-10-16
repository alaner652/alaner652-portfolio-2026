'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

import { dur, ease, rise, stagger as st, viewport } from '@/lib/motion'

type Props = HTMLMotionProps<'div'> & {
  /** 進場延遲（秒） */
  delay?: number
  /** 直接子元素逐個錯開（秒）；不給就整塊一起 */
  stagger?: number
  /** 小一點的位移（14px），給文字層用；預設 28px 給區塊 */
  small?: boolean
  /** 載入就演，不等捲到（第一屏的東西） */
  load?: boolean
  as?: 'div' | 'section' | 'ul' | 'ol' | 'li' | 'article' | 'header' | 'p' | 'span'
}

/** 區塊進場：opacity 0→1、往上浮，0.7s。全站八成的進場就是它。
    reduced motion 由 layout 的 <MotionConfig reducedMotion="user"> 統一處理（直接是完成狀態）。 */
export function Reveal({ delay = 0, stagger, small, load, as = 'div', children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div
  const y = small ? rise.sm : rise.md
  const parent = stagger !== undefined
  // reduced motion：連淡入都不要，直接是完成狀態（MotionConfig 只會關掉位移，opacity 還是會淡）
  const reduce = useReducedMotion()
  return (
    <Tag
      initial={reduce ? false : 'hidden'}
      {...(load ? { animate: 'show' } : { whileInView: 'show', viewport })}
      variants={
        parent
          ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
          : {
              hidden: { opacity: 0, y },
              show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out, delay } },
            }
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** 放在帶 stagger 的 <Reveal> 底下的每一個子項 */
export function RevealItem({
  small,
  as = 'div',
  children,
  ...rest
}: Omit<Props, 'delay' | 'stagger' | 'load'>) {
  const Tag = motion[as] as typeof motion.div
  const y = small ? rise.sm : rise.md
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const itemStagger = st.item
