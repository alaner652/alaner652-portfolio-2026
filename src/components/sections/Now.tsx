import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { NOW_LIST } from '@/constants'

export function Now() {
  return (
    <section id="now" className="border-line-soft border-t py-[72px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Now</Eyebrow>
            <h2 className="font-display mt-[12px] text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold tracking-[-0.015em]">
              Current focus
            </h2>
          </div>
          <ul className="grid max-w-[60ch] list-none gap-[14px]">
            {NOW_LIST.map((item, i) => (
              <li key={i} className="text-dim flex items-start gap-[14px] text-[1.02rem]">
                <span className="text-amber mt-[1px] shrink-0 font-mono">▸</span>
                {item.text}
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}
