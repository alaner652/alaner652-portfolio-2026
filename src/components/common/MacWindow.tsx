import type { ReactNode } from 'react'

import { CopyCode } from '@/components/common/CopyCode'

/** 程式碼區塊：上面一列檔名／語言 + 複製鈕，底下深底的 <pre>（CSS 畫行號），上下各一條線、不包卡片。
    名字沿用 MacWindow，因為 MDX 內容裡直接用了它。 */
export function MacWindow({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <figure className="code-block bg-bg-deep border-line my-[1.6em] border-y">
      <figcaption className="text-text-3 flex items-center justify-between py-2 font-mono text-xs">
        <span>{title ?? 'code'}</span>
        <CopyCode />
      </figcaption>
      {children}
    </figure>
  )
}
