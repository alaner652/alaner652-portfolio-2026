'use client'

import { useEffect, useState } from 'react'

import { STATUS_ROWS } from '@/constants'

import { LiveClock } from './LiveClock'

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
      className="border-line mt-[42px] overflow-hidden rounded-[12px] border"
      style={{
        background: 'linear-gradient(180deg, var(--color-panel-hi), var(--color-panel))',
        boxShadow: '0 30px 60px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.03)',
      }}
      role="region"
      aria-label="Current status"
    >
      {/* title bar */}
      <div className="border-line-soft flex items-center gap-[14px] border-b bg-black/[.18] px-[18px] py-[13px]">
        <div className="flex gap-[7px]" aria-hidden="true">
          <i className="block h-[11px] w-[11px] rounded-full bg-[#FF5F56]" style={{ listStyle: 'none' }} />
          <i className="block h-[11px] w-[11px] rounded-full bg-[#FFBD2E]" style={{ listStyle: 'none' }} />
          <i className="block h-[11px] w-[11px] rounded-full bg-[#27C93F]" style={{ listStyle: 'none' }} />
        </div>
        <span className="text-dim font-mono text-[0.78rem] tracking-[0.02em]">
          <b className="text-txt font-medium max-sm:hidden">alaner.status</b>
          <span className="max-sm:hidden"> — session</span>
        </span>
        <div className="ml-auto flex items-center gap-[12px]">
          <LiveClock />
          <span className="text-live bg-live-soft inline-flex items-center gap-[6px] rounded-[20px] px-[9px] py-[3px] font-mono text-[0.72rem] font-medium tracking-[0.1em]">
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
            className="border-line-soft flex items-baseline gap-[16px] border-b px-[22px] py-[15px] transition-[opacity,transform] duration-500 ease-out last:border-b-0 max-sm:flex-wrap max-sm:gap-x-[12px] max-sm:gap-y-[6px] max-sm:px-[18px] max-sm:py-[14px]"
            style={{
              opacity: booted ? 1 : 0,
              transform: booted ? 'none' : 'translateY(8px)',
              transitionDelay: booted ? `${0.05 + i * 0.11}s` : '0s',
            }}
          >
            <span className="text-amber w-[1.2em] shrink-0 text-center font-mono text-[0.85rem]">
              {row.glyph}
            </span>
            <span className="text-faint w-[150px] shrink-0 font-mono text-[0.74rem] tracking-[0.13em] uppercase max-sm:w-auto">
              {row.key}
            </span>
            <span className="min-w-[14px] flex-1 translate-y-[-3px] border-b border-dotted border-[#313742] max-sm:hidden" aria-hidden="true" />
            <span className="text-txt text-right font-medium max-sm:ml-[calc(1.2em+16px)] max-sm:w-full max-sm:text-left">
              {row.value}
              {row.subValue && (
                <small className="text-dim mt-[2px] block font-mono text-[0.7rem] font-normal tracking-[0.02em]">
                  {row.subValue}
                </small>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="border-line-soft text-faint flex flex-wrap justify-between gap-[12px] border-t px-[22px] py-[11px] font-mono text-[0.7rem]">
        <span>uptime — building since 2019</span>
        <span>loc — Taipei · GMT+8</span>
      </div>
    </div>
  )
}

function PulseDot() {
  return (
    <span
      className="bg-live inline-block h-[6px] w-[6px] rounded-full"
      style={{
        animation: 'pulse 2.4s ease-out infinite',
      }}
    />
  )
}
