import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { SKILLS } from '@/constants'
import { TONE_INK } from '@/lib/tone'

export function Skills() {
  return (
    <Section id="skills">
      <RevealWrapper>
        <SectionLabel
          title="會的東西"
          note="都是在上面那些專案裡真的用過的，不是看過教學就列上來。"
          className="mb-8"
        />

        <dl className="grid gap-6">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className="grid gap-2 md:grid-cols-[120px_1fr] md:items-baseline md:gap-6"
            >
              <dt className={`font-mono text-xs tracking-[0.04em] ${TONE_INK[group.tone]}`}>
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <MetricChip key={item} tone={group.tone}>
                    {item}
                  </MetricChip>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </RevealWrapper>
    </Section>
  )
}
