import type { ReactNode } from 'react'

export function MacWindow({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="mac-window border-line bg-panel-hi my-[1.5em] overflow-hidden rounded-[10px] border">
      {title && (
        <div className="border-line-soft flex items-center gap-[8px] border-b px-[16px] py-[9px]">
          <span className="bg-amber inline-block h-[7px] w-[7px] rounded-full" aria-hidden="true" />
          <span className="text-faint font-mono text-[0.7rem] tracking-[0.08em] uppercase">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}
