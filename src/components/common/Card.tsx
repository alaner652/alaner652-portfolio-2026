import type { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-card bg-panel border border-line-soft rounded-[10px] px-6 py-5">
      {children}
    </div>
  )
}
