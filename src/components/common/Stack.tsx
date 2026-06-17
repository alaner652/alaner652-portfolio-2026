import type { ReactNode } from 'react'

export function Stack({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 mb-5">
      {children}
    </div>
  )
}
