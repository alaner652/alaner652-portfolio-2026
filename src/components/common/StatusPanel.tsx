'use client'

import { useEffect, useState } from 'react'
import { LiveClock } from './LiveClock'
import { STATUS_ROWS } from '@/constants'

export function StatusPanel() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      requestAnimationFrame(() => setBooted(true))
      return
    }
    requestAnimationFrame(() => setBooted(true))
  }, [])

  return (
    <div
      className="mt-[42px] border border-line rounded-[12px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-panel-hi), var(--color-panel))',
        boxShadow: '0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.03)',
      }}
      role="region"
      aria-label="Current status"
    >
      {/* title bar */}
      <div className="flex items-center gap-[14px] px-[18px] py-[13px] border-b border-line-soft bg-black/[.18]">
        <div className="flex gap-[7px]" aria-hidden="true">
          <i className="w-[11px] h-[11px] rounded-full block bg-amber opacity-90" style={{ listStyle: 'none' }} />
          <i className="w-[11px] h-[11px] rounded-full block bg-[#2C313B]" style={{ listStyle: 'none' }} />
          <i className="w-[11px] h-[11px] rounded-full block bg-[#2C313B]" style={{ listStyle: 'none' }} />
        </div>
        <span className="font-mono text-[0.78rem] text-dim tracking-[0.02em]">
          <b className="text-txt font-medium max-sm:hidden">alaner.status</b>
          <span className="max-sm:hidden"> — session</span>
        </span>
        <div className="ml-auto flex items-center gap-[12px]">
          <LiveClock />
          <span className="inline-flex items-center gap-[6px] text-live bg-live-soft px-[9px] py-[3px] rounded-[20px] font-mono text-[0.72rem] font-medium tracking-[0.1em]">
            <PulseDot />
            LIVE
          </span>
        </div>
      </div>

      {/* rows */}
      <div className="py-[6px]">
        {STATUS_ROWS.map((row, i) => (
          <div
            key={row.key}
            className="flex items-baseline gap-[16px] px-[22px] py-[15px] border-b border-line-soft last:border-b-0 transition-[opacity,transform] duration-500 ease-out max-sm:flex-wrap max-sm:gap-x-[12px] max-sm:gap-y-[6px] max-sm:px-[18px] max-sm:py-[14px]"
            style={{
              opacity: booted ? 1 : 0,
              transform: booted ? 'none' : 'translateY(8px)',
              transitionDelay: booted ? `${0.05 + i * 0.11}s` : '0s',
            }}
          >
            <span className="font-mono text-amber text-[0.85rem] w-[1.2em] shrink-0 text-center">
              {row.glyph}
            </span>
            <span className="font-mono text-[0.74rem] tracking-[0.13em] uppercase text-faint shrink-0 w-[150px] max-sm:w-auto">
              {row.key}
            </span>
            <span className="flex-1 border-b border-dotted border-[#313742] translate-y-[-3px] min-w-[14px] max-sm:hidden" aria-hidden="true" />
            <span className="font-medium text-txt text-right max-sm:w-full max-sm:text-left max-sm:ml-[calc(1.2em+16px)]">
              {row.value}
              {row.subValue && (
                <small className="block font-mono text-[0.7rem] text-dim font-normal tracking-[0.02em] mt-[2px]">
                  {row.subValue}
                </small>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="flex justify-between gap-[12px] flex-wrap px-[22px] py-[11px] border-t border-line-soft font-mono text-[0.7rem] text-faint">
        <span>uptime — building since 2019</span>
        <span>loc — Taipei · GMT+8</span>
      </div>
    </div>
  )
}

function PulseDot() {
  return (
    <span
      className="w-[6px] h-[6px] rounded-full bg-live inline-block"
      style={{
        animation: 'pulse 2.4s ease-out infinite',
      }}
    />
  )
}
