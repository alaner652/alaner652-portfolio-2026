import type { ReactNode } from 'react'

export function Stack({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-4">
      {children}
    </div>
  )
}
