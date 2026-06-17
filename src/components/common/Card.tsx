import type { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-card bg-panel border-line-soft rounded-[10px] border px-6 py-5">
      {children}
    </div>
  )
}
