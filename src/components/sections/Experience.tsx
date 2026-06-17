import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { EXPERIENCE } from '@/constants'

export function Experience() {
  return (
    <section id="experience" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Experience</Eyebrow>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
              Roles
            </h2>
          </div>

          <div>
            {EXPERIENCE.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[130px_1fr] gap-[24px] py-[24px] border-b border-line-soft last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-[6px]"
              >
                <div className="font-mono text-[0.74rem] text-faint tracking-[0.04em] pt-[4px] max-[560px]:pt-0">
                  {item.period}
                </div>
                <div>
                  <div className="font-display font-semibold text-[1.18rem]">{item.role}</div>
                  <div className="font-mono text-[0.78rem] text-amber mt-[5px] mb-[9px] tracking-[0.02em]">
                    {item.org}
                  </div>
                  <p className="text-dim text-[0.97rem] max-w-[56ch]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
