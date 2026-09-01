import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { EDUCATION, EXPERIENCE } from '@/constants'

interface TimelineItemProps {
  period: string
  title: string
  subtitle: string
  note?: string
  /** 學歷用灰點，工作用橘點——同一條時間軸上分主次 */
  muted?: boolean
}

function TimelineItem({ period, title, subtitle, note, muted }: TimelineItemProps) {
  return (
    <li className={muted ? 'relative pb-6 last:pb-0' : 'relative pb-8 last:pb-0'}>
      {/* -translate-x-1/2 讓圓點自己對齊左側那條線，不必手算位移 */}
      <span
        className={`border-bg absolute top-2 -left-8 size-3 -translate-x-1/2 rounded-full border-2 ${
          muted ? 'bg-line' : 'bg-amber'
        }`}
        aria-hidden="true"
      />
      <div className="text-faint mb-1.5 font-mono text-2xs tracking-[0.04em]">{period}</div>
      <div className="font-display text-lg font-medium">{title}</div>
      <div className="text-dim mt-1 mb-2 font-mono text-xs tracking-[0.02em]">{subtitle}</div>
      {note && <p className="text-dim max-w-[56ch] text-base leading-[1.65]">{note}</p>}
    </li>
  )
}

export function Experience() {
  return (
    <Section id="experience">
      <RevealWrapper>
        <SectionLabel title="經歷" className="mb-8" />

        <ul className="border-line ml-1.5 list-none border-l pl-8">
          {EXPERIENCE.map((item) => (
            <TimelineItem
              key={item.role + item.period}
              period={item.period}
              title={item.role}
              subtitle={item.org}
              note={item.description}
            />
          ))}
        </ul>

        <h3 className="font-display text-dim mt-12 mb-6 text-md font-medium">學歷</h3>
        <ul className="border-line ml-1.5 list-none border-l pl-8">
          {EDUCATION.map((item) => (
            <TimelineItem
              key={item.school + item.period}
              period={item.period}
              title={item.school}
              subtitle={item.program}
              note={item.note}
              muted
            />
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}
