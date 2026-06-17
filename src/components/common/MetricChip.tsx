import { cn } from '@/lib/utils'

interface MetricChipProps {
  children: React.ReactNode
  className?: string
}

export function MetricChip({ children, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.7rem] text-dim bg-bg border border-line-soft px-[11px] py-[5px] rounded-[6px]',
        className
      )}
    >
      {children}
    </span>
  )
}
