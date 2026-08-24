import type { ReactNode } from 'react'

export function MacWindow({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="mac-window border-line bg-panel-hi my-[1.5em] overflow-hidden rounded-[10px] border">
      {title && (
        <div className="border-line-soft flex items-center gap-2 border-b px-4 py-2.25">
          <span className="bg-amber inline-block h-1.75 w-1.75 rounded-full" aria-hidden="true" />
          <span className="text-faint font-mono text-2xs tracking-[0.08em] uppercase">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}
