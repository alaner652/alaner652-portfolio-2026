import type { ReactNode } from 'react'

/** 文章裡的補充框（「這裡欠一個量測」「注意」這類旁註）：淺一階的底、左邊一條橘線，不是卡片。 */
export function Card({ children }: { children: ReactNode }) {
  return (
    <aside className="mdx-card bg-surface border-accent my-[1.6em] rounded-r-sm border-l-2 px-5 py-4 text-[0.95em] md:px-6">
      {children}
    </aside>
  )
}
