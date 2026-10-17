'use client'

import { Check } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'

/** 程式碼區塊右上的「複製」：抓同一個 figure 裡的 <pre> 文字（行號是 CSS 畫的，不會被複製到）。兩秒後字恢復。 */
export function CopyCode() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  async function copy(e: MouseEvent<HTMLButtonElement>) {
    const pre = e.currentTarget.closest('figure')?.querySelector('pre')
    if (!pre) return
    try {
      await navigator.clipboard.writeText(pre.innerText)
      setCopied(true)
    } catch {
      // 沒權限就算了
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="複製程式碼"
      className="text-text-2 hover:text-text inline-flex min-h-9 cursor-pointer items-center gap-1 px-2.5 font-mono text-xs transition-colors"
    >
      {copied ? (
        <>
          <Check size={13} strokeWidth={2.5} className="text-accent" aria-hidden="true" />
          已複製
        </>
      ) : (
        '複製'
      )}
    </button>
  )
}
