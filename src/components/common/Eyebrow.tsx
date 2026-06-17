import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.6em]',
        'font-mono text-[0.72rem] font-medium tracking-[0.18em] uppercase text-amber',
        "before:content-[''] before:w-[14px] before:h-px before:bg-amber before:inline-block",
        className
      )}
    >
      {children}
    </span>
  )
}
