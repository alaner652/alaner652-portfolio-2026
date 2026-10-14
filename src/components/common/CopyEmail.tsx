'use client'

import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

/** 信箱：點左邊開郵件軟體，點右邊的小按鈕直接複製。
    複製成功在原地換成勾勾兩秒，不彈視窗。 */
export function CopyEmail({ email, className = '' }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // 沒有 clipboard 權限就算了，mailto 連結還在
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={`mailto:${email}`}
        className="font-display hover:text-amber inline-flex min-h-11 items-center gap-2 text-h3 font-medium tracking-[-0.01em] transition-colors"
      >
        {email}
        <ArrowUpRight size={20} className="text-ink-faint" aria-hidden />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? '已複製信箱' : '複製信箱'}
        className="border-ink-line text-ink-dim hover:border-amber hover:text-amber inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 font-mono text-2xs tracking-[0.06em] transition-colors"
      >
        {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
        {copied ? '已複製' : '複製'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? '信箱已複製' : ''}
      </span>
    </div>
  )
}
