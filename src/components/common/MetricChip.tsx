import { cn } from '@/lib/utils'

interface MetricChipProps {
  children: React.ReactNode
  className?: string
}

export function MetricChip({ children, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        'font-mono text-2xs text-dim bg-panel-hi border border-line-soft px-2.5 py-1 rounded-[5px]',
        className
      )}
    >
      {children}
    </span>
  )
}
