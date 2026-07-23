import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { EXPERIENCE } from '@/constants'

export function Experience() {
  return (
    <section id="experience" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <SectionLabel index="03" title="Experience" className="mb-[36px]" />

          <div className="border-line ml-[5px] border-l pl-[28px]">
            {EXPERIENCE.map((item, i) => (
              <div key={i} className="relative pb-[36px] last:pb-0">
                <span
                  className="border-bg bg-amber absolute top-[7px] left-[-35px] h-[11px] w-[11px] rounded-full border-2"
                  aria-hidden="true"
                />
                <div className="text-faint mb-[6px] font-mono text-[0.74rem] tracking-[0.04em]">
                  {item.period}
                </div>
                <div className="font-display text-[1.18rem] font-medium">{item.role}</div>
                <div className="text-amber mt-[4px] mb-[9px] font-mono text-[0.78rem] tracking-[0.02em]">
                  {item.org}
                </div>
                <p className="text-dim max-w-[56ch] text-[0.97rem] leading-[1.65]">{item.description}</p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
