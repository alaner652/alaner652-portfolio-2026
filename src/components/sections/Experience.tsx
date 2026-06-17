import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { EXPERIENCE } from '@/constants'

export function Experience() {
  return (
    <section id="experience" className="border-line-soft border-t py-[72px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Experience</Eyebrow>
            <h2 className="font-display mt-[12px] text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold tracking-[-0.015em]">
              Roles
            </h2>
          </div>

          <div>
            {EXPERIENCE.map((item, i) => (
              <div
                key={i}
                className="border-line-soft grid grid-cols-[130px_1fr] gap-[24px] border-b py-[24px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-[6px]"
              >
                <div className="text-faint pt-[4px] font-mono text-[0.74rem] tracking-[0.04em] max-[560px]:pt-0">
                  {item.period}
                </div>
                <div>
                  <div className="font-display text-[1.18rem] font-semibold">{item.role}</div>
                  <div className="text-amber mt-[5px] mb-[9px] font-mono text-[0.78rem] tracking-[0.02em]">
                    {item.org}
                  </div>
                  <p className="text-dim max-w-[56ch] text-[0.97rem]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
