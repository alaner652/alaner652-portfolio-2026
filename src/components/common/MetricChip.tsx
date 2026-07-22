import { cn } from '@/lib/utils'

interface MetricChipProps {
  children: React.ReactNode
  className?: string
}

export function MetricChip({ children, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.72rem] text-dim bg-panel-hi border border-line-soft px-[10px] py-[4px] rounded-[5px]',
        className
      )}
    >
      {children}
    </span>
  )
}
