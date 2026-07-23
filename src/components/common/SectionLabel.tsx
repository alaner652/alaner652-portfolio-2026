import { cn } from '@/lib/utils'

interface SectionLabelProps {
  index: string
  title: string
  className?: string
}

export function SectionLabel({ index, title, className }: SectionLabelProps) {
  return (
    <div className={className}>
      <span className="text-amber mb-[10px] block font-mono text-[0.72rem] tracking-[0.16em]">
        {index}
      </span>
      <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium tracking-[-0.015em]">
        {title}
      </h2>
    </div>
  )
}
