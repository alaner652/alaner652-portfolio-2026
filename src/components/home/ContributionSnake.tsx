'use client'

import { useEffect, useRef } from 'react'

import type { ContributionDay } from '@/lib/github'

const ROWS = 7
const GAP = 3
const MIN_CELL = 9
const SNAKE = 5
const STEP_MS = 55
const REST_MS = 1800
const ALPHA = [0, 0.25, 0.5, 0.75, 1]

/** GitHub 貢獻圖 + 一條貪食蛇。蛇沿著直欄上下蛇行把有顏色的格子吃掉，吃完停一下再長回來。
    畫在 canvas 上：格子照容器寬度撐開；寬度不夠就只畫最右邊塞得下的幾週。
    reduce motion 時只畫格子，蛇不出來。純裝飾，aria-hidden，數字在旁邊的文字。 */
export function ContributionSnake({ days, pad }: { days: ContributionDay[]; pad: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(canvas)
    const color = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback
    const amber = color('--color-amber', '#E06122')
    const empty = color('--color-panel-hi', '#F6F1E8')
    const ink = color('--color-txt', '#332D24')

    // levels[col][row]：-1 是這一年還沒到／不存在的格子
    const totalCols = Math.ceil((pad + days.length) / ROWS)
    const levels = Array.from({ length: totalCols }, () => Array<number>(ROWS).fill(-1))
    days.forEach((d, i) => {
      const k = pad + i
      levels[Math.floor(k / ROWS)][k % ROWS] = d.level
    })

    let cols = totalCols
    let offset = 0
    let cell = MIN_CELL
    let path: [number, number][] = []
    let eaten: boolean[][] = []
    let head = 0
    let lastStep = 0
    let restSince = 0
    let raf = 0

    const reset = () => {
      eaten = Array.from({ length: cols }, () => Array<boolean>(ROWS).fill(false))
      head = -1
      restSince = 0
    }

    const layout = () => {
      const width = canvas.parentElement?.clientWidth ?? 0
      if (!width) return
      cols = Math.min(totalCols, Math.floor((width + GAP) / (MIN_CELL + GAP)))
      offset = totalCols - cols
      cell = (width - (cols - 1) * GAP) / cols
      const height = ROWS * cell + (ROWS - 1) * GAP
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // 蛇行：偶數欄往下走，奇數欄往上走
      path = []
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < ROWS; r++) path.push([c, c % 2 ? ROWS - 1 - r : r])
      }
      reset()
    }

    const square = (c: number, r: number, inset = 0) => {
      const x = c * (cell + GAP) + inset
      const y = r * (cell + GAP) + inset
      const s = cell - inset * 2
      ctx.beginPath()
      ctx.roundRect(x, y, s, s, Math.min(2, s / 4))
      ctx.fill()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < ROWS; r++) {
          const lv = levels[offset + c][r]
          if (lv < 0) continue
          const gone = eaten[c]?.[r] || lv === 0
          ctx.globalAlpha = gone ? 1 : ALPHA[lv]
          ctx.fillStyle = gone ? empty : amber
          square(c, r)
        }
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = ink
      for (let s = SNAKE - 1; s >= 0; s--) {
        const p = path[head - s]
        if (p) square(p[0], p[1], s === 0 ? -0.5 : 0.5)
      }
    }

    const tick = (t: number) => {
      if (restSince) {
        if (t - restSince > REST_MS) reset()
      } else if (t - lastStep > STEP_MS) {
        lastStep = t
        head++
        const p = path[head]
        if (p) eaten[p[0]][p[1]] = true
        else if (head - SNAKE >= path.length) restSince = t
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    layout()
    if (reduce) {
      head = -SNAKE - 1
      draw()
    } else {
      raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      layout()
      if (reduce) {
        head = -SNAKE - 1
        draw()
      }
    })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [days, pad])

  return <canvas ref={ref} className="block w-full" aria-hidden="true" />
}
