'use client'

import { useEffect, useState } from 'react'

export function LiveClock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    function tick() {
      const d = new Date()
      const t = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 8 * 3600000)
      const p = (n: number) => String(n).padStart(2, '0')
      setTime(`${p(t.getHours())}:${p(t.getMinutes())}:${p(t.getSeconds())}`)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-[0.72rem] text-dim" aria-hidden="true">
      {time}
    </span>
  )
}
