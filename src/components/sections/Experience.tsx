import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { JOURNEY } from '@/constants'
import type { JourneyEntry, Tone } from '@/types'

/** 時間軸上的實心點，顏色跟同一段的 chip 一致。Tailwind 只掃字面量，所以整串寫死。 */
const TONE_DOT: Record<Tone, string> = {
  orange: 'bg-orange-ink',
  gold: 'bg-gold-ink',
  green: 'bg-green-ink',
  blue: 'bg-blue-ink',
  plum: 'bg-plum-ink',
}

/** 一段：桌機左欄是年份 + 年級，中間是軸線和點，右邊是標題 + chip + 一小段話。
    手機把年份摺進右欄第一行，軸線靠左。 */
function JourneyItem({ entry }: { entry: JourneyEntry }) {
  const { period, stage, track, tone, title, detail, current } = entry
  // ring-bg 把軸線在點的周圍切開；進行中的那顆再多一圈淡綠當光暈
  const dot = current
    ? 'bg-green-ink size-3.5 shadow-[0_0_0_3px_var(--color-bg),0_0_0_8px_var(--color-green-tint)]'
    : `${TONE_DOT[tone]} size-2.5 ring-4 ring-bg`

  return (
    <li className="grid pb-10 pl-7 last:pb-0 md:grid-cols-[10rem_1fr] md:pl-0">
      <div className="hidden pr-8 text-right md:block">
        <div className="font-display text-txt text-xl font-medium tracking-[-0.01em] whitespace-nowrap tabular-nums">
          {period}
        </div>
        <div className="text-faint mt-1 font-mono text-2xs tracking-[0.06em] whitespace-nowrap">
          {stage}
        </div>
      </div>

      <div className="relative min-w-0 pl-8">
        <span
          className={`absolute top-[0.55rem] left-0 -translate-x-1/2 rounded-full ${dot}`}
          aria-hidden="true"
        />
        <div className="text-faint mb-1.5 font-mono text-2xs tracking-[0.06em] md:hidden">
          <span className="text-txt">{period}</span> · {stage}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-display text-lg font-medium tracking-[-0.01em]">{title}</h3>
          <MetricChip tone={tone}>{track}</MetricChip>
        </div>
        <p className="text-dim mt-2 max-w-[56ch] text-base leading-[1.75]">{detail}</p>
      </div>
    </li>
  )
}

/** 經歷：一條垂直時間軸，照時間講「那時候在幹嘛」，從小六第一次打開 Roblox 到現在。
    職稱和學歷的正式版在 /resume；這裡是故事線，所以舊的在上、新的在下。 */
export function Experience() {
  return (
    <Section id="experience">
      <RevealWrapper>
        <SectionLabel
          title="經歷"
          note="照時間講，從小六第一次打開 Roblox 開始。"
          className="mb-10"
        />
        <ol className="relative">
          {/* 軸線：手機貼在左邊（pl-7 的位置），桌機在年份欄（10rem）的右緣。
              從第一顆點畫到最後一顆點，所以 top / bottom 各留一點。 */}
          <span
            className="bg-line absolute top-2 bottom-3 left-7 w-px -translate-x-1/2 md:left-40"
            aria-hidden="true"
          />
          {JOURNEY.map((entry) => (
            <JourneyItem key={entry.period + entry.title} entry={entry} />
          ))}
        </ol>
        <Link
          href="/resume"
          className="text-dim hover:text-amber mt-12 inline-flex items-center gap-1 font-mono text-xs tracking-[0.02em] transition-colors"
        >
          工作與學歷的正式版：履歷 <ArrowUpRight size={12} aria-hidden />
        </Link>
      </RevealWrapper>
    </Section>
  )
}
