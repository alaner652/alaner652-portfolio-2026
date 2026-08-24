import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EDUCATION, EXPERIENCE } from '@/constants'

export function Experience() {
  return (
    <section id="experience" className="border-line-soft border-t py-14 md:py-20">
      <div className="mx-auto max-w-270 px-6">
        <RevealWrapper>
          <SectionLabel title="經歷" className="mb-7" />

          <div className="border-line ml-1.25 border-l pl-7">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="relative pb-9 last:pb-0">
                <span
                  className="border-bg bg-amber absolute top-1.75 -left-8.75 h-2.75 w-2.75 rounded-full border-2"
                  aria-hidden="true"
                />
                <div className="text-faint mb-1.5 font-mono text-2xs tracking-[0.04em]">
                  {item.period}
                </div>
                <div className="font-display text-lg font-medium">{item.role}</div>
                <div className="text-dim mt-1 mb-2.25 font-mono text-xs tracking-[0.02em]">
                  {item.org}
                </div>
                <p className="text-dim max-w-[56ch] text-base leading-[1.65]">{item.description}</p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-dim mt-11 mb-5 text-md font-medium">
            學歷
          </h3>
          <div className="border-line ml-1.25 border-l pl-7">
            {EDUCATION.map((item, i) => (
              <div key={i} className="relative pb-6 last:pb-0">
                <span
                  className="border-bg bg-line absolute top-1.75 -left-8.75 h-2.75 w-2.75 rounded-full border-2"
                  aria-hidden="true"
                />
                <div className="text-faint mb-1.5 font-mono text-2xs tracking-[0.04em]">
                  {item.period}
                </div>
                <div className="font-display text-lg font-medium">{item.school}</div>
                <div className="text-dim mt-1 mb-2.25 font-mono text-xs tracking-[0.02em]">
                  {item.program}
                </div>
                {item.note && (
                  <p className="text-dim max-w-[56ch] text-base leading-[1.65]">{item.note}</p>
                )}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
