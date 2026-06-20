import type { ReactNode } from 'react'

export function MacWindow({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="mac-window border-line bg-panel my-[1.5em] overflow-hidden rounded-[10px] border">
      <div
        className="border-line-soft flex items-center gap-3 border-b bg-black/18 px-3.5 py-2.5"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="block h-2.75 w-2.75 rounded-full bg-[#FF5F56]" />
          <span className="block h-2.75 w-2.75 rounded-full bg-[#FFBD2E]" />
          <span className="block h-2.75 w-2.75 rounded-full bg-[#27C93F]" />
        </div>
        {title && (
          <span className="text-faint font-mono text-[0.72rem] tracking-[0.02em]">{title}</span>
        )}
      </div>
      {children}
    </div>
  )
}
