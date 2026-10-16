import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-text-3 text-xs font-medium tracking-[0.14em] uppercase',
        className
      )}
    >
      {children}
    </span>
  )
}
