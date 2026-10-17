import type { ReactNode } from 'react'

import { CopyCode } from '@/components/common/CopyCode'

/** 程式碼區塊：上面一列檔名／語言 + 複製鈕，底下深底的 <pre>（CSS 畫行號），上下各一條線、不包卡片。
    名字沿用 MacWindow，因為 MDX 內容裡直接用了它。 */
export function MacWindow({ children, title }: { children: ReactNode; title?: string }) {
  return (
    // 整塊包在一個有邊框的框裡、內容左右留白，不再貼著文字欄的邊；長的行在框內橫向捲動，不會跑出欄外
    <figure className="code-block bg-bg-deep border-border my-[1.6em] max-w-full overflow-hidden rounded-xl border">
      <figcaption className="text-text-3 border-line flex items-center justify-between border-b py-1.5 pr-2 pl-4 font-mono text-xs">
        <span>{title ?? 'code'}</span>
        <CopyCode />
      </figcaption>
      {children}
    </figure>
  )
}
