import { RevealWrapper } from '@/components/common/RevealWrapper'
import { EXPERIENCE } from '@/constants'

export function Experience() {
  return (
    <section id="experience" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <h2 className="font-display mb-[16px] text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium tracking-[-0.015em]">
            Experience
          </h2>

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
