import { cn } from '@/lib/utils'
import { TONE_CHIP } from '@/lib/tone'
import type { Tone } from '@/types'

interface MetricChipProps {
  children: React.ReactNode
  /** 帶了色調就用分類色，沒帶就是中性灰——技術名詞本身不分類時維持中性 */
  tone?: Tone
  className?: string
}

/** 技術標籤。只用底色不用外框——一頁上有二三十顆，加了框線整片會很吵。 */
export function MetricChip({ children, tone, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        'rounded-chip px-2 py-1 font-mono text-2xs',
        tone ? TONE_CHIP[tone] : 'bg-panel-hi text-dim',
        className
      )}
    >
      {children}
    </span>
  )
}
