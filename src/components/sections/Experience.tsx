import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { JOURNEY } from '@/constants'
import type { JourneyEntry } from '@/types'

/** 一段：左邊超大的年份 + 手寫年級，右邊標題、一句話。中間一條軸線和點。 */
function JourneyItem({ entry }: { entry: JourneyEntry }) {
  const { period, stage, track, title, detail, current } = entry
  const dot = current
    ? 'bg-amber size-3.5 shadow-[0_0_0_3px_var(--color-bg),0_0_0_8px_var(--color-amber-soft)]'
    : 'bg-amber size-2.5 ring-4 ring-bg'

  return (
    <li className="timeline-item grid pb-12 pl-7 last:pb-0 md:grid-cols-12 md:gap-x-6 md:pl-0">
      <div className="hidden md:col-span-4 md:block">
        <div
          className={`font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-bold tracking-[-0.03em] whitespace-nowrap tabular-nums ${current ? 'text-amber' : 'text-txt'}`}
        >
          {period}
        </div>
        <div className="font-hand text-faint mt-2 text-[1.2rem] leading-none">
          {stage} · {track}
        </div>
      </div>

      <div className="relative min-w-0 md:col-span-8 md:pl-8">
        <span
          className={`timeline-dot absolute top-[0.7rem] left-0 -translate-x-1/2 rounded-full ${dot}`}
          aria-hidden="true"
        />
        <div className="font-hand text-faint mb-1.5 text-[1.2rem] leading-none md:hidden">
          <span className="text-txt">{period}</span> · {stage} · {track}
        </div>
        <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.3] font-medium tracking-[-0.015em]">
          {title}
        </h3>
        <p className="text-dim mt-2 max-w-[52ch] text-base leading-[1.75]">{detail}</p>
      </div>
    </li>
  )
}

/** 經歷：一條垂直時間軸，照時間講「那時候在幹嘛」。舊的在上、新的在下。 */
export function Experience() {
  return (
    <Section id="experience" label="從小六第一次打開 Roblox 開始">
      <RevealWrapper>
        <ol className="relative">
          <span
            className="bg-line absolute top-2 bottom-3 left-7 w-px -translate-x-1/2 md:left-[calc(33.333%+0.5rem)]"
            aria-hidden="true"
          />
          <span
            className="timeline-progress bg-amber absolute top-2 bottom-3 left-7 w-px origin-top -translate-x-1/2 md:left-[calc(33.333%+0.5rem)]"
            aria-hidden="true"
          />
          {JOURNEY.map((entry) => (
            <JourneyItem key={entry.period + entry.title} entry={entry} />
          ))}
        </ol>
      </RevealWrapper>
    </Section>
  )
}
