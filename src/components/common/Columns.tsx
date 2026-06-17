import type { ReactNode } from 'react'

export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      {children}
    </div>
  )
}
