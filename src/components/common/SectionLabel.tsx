import { cn } from '@/lib/utils'

interface SectionLabelProps {
  title: string
  note?: string
  className?: string
}

/** 區塊裡的一句大字（不是 heading，heading 是 Section 的手寫段名）。 */
export function SectionLabel({ title, note, className }: SectionLabelProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <p className="font-display text-h2 max-w-[18em] leading-[1.2] font-medium tracking-[-0.02em]">
        {title}
      </p>
      {note && <p className="text-dim mt-3 max-w-[40em] text-base leading-[1.6]">{note}</p>}
    </div>
  )
}
