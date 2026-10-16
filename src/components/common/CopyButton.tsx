'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

/** 複製按鈕：按下去文字變成「已複製 ✓」、底色翻橘，兩秒後恢復。沒有 clipboard 權限就什麼都不做。 */
export function CopyButton({ text, label = '複製', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // 剪貼簿不可用：旁邊的 mailto 連結還在
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full border px-6 text-base font-medium transition-colors',
          copied
            ? 'border-accent bg-accent text-on-accent'
            : 'border-border-strong text-text hover:border-text',
          className
        )}
      >
        {copied ? '已複製 ✓' : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? '信箱已複製' : ''}
      </span>
    </>
  )
}
