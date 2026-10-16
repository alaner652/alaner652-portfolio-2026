import { cn } from '@/lib/utils'

interface MetricChipProps {
  children: React.ReactNode
  className?: string
}

/** 行內的數字或短詞標籤（「4 GB」「症狀相似」）：mono、偏橘，跟行內程式碼同一個調子但不是程式碼。 */
export function MetricChip({ children, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        'bg-surface rounded-chip px-1.5 py-0.5 font-mono text-[0.85em] text-[#ffb48a]',
        className
      )}
    >
      {children}
    </span>
  )
}
