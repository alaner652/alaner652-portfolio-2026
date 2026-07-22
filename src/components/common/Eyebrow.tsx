import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-faint text-[0.75rem] font-medium tracking-[0.14em] uppercase',
        className
      )}
    >
      {children}
    </span>
  )
}
