import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SKILLS } from '@/constants'

export function Skills() {
  return (
    <section id="skills" className="border-line-soft border-t py-14 md:py-20">
      <div className="mx-auto max-w-270 px-6">
        <RevealWrapper>
          <SectionLabel
            title="會的東西"
            note="都是在上面那些專案裡真的用過的，不是看過教學就列上來。"
            className="mb-7"
          />

          <dl className="grid gap-5.5">
            {SKILLS.map((group) => (
              <div
                key={group.label}
                className="grid gap-2.5 md:grid-cols-[120px_1fr] md:items-baseline md:gap-6"
              >
                <dt className="text-dim font-mono text-xs tracking-[0.04em]">
                  {group.label}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <MetricChip key={item}>{item}</MetricChip>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </RevealWrapper>
      </div>
    </section>
  )
}
