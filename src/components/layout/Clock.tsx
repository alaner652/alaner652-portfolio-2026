'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('zh-TW', {
  timeZone: 'Asia/Taipei',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** 台北現在時間，每秒走。伺服器先出佔位，掛載後才開始跳，所以不會有 hydration 差異。 */
export function Clock({
  className,
  prefix = '台北',
  label = '台北現在時間',
}: {
  className?: string
  prefix?: string
  label?: string
}) {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={className} aria-label={label}>
      {prefix}
      <span className="tabular-nums">{now ?? '--:--:--'}</span>
    </span>
  )
}
