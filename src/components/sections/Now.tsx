import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { NOW_LIST } from '@/constants'

export function Now() {
  return (
    <section id="now" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Now</Eyebrow>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
              Current focus
            </h2>
          </div>
          <ul className="list-none grid gap-[14px] max-w-[60ch]">
            {NOW_LIST.map((item, i) => (
              <li key={i} className="flex gap-[14px] items-start text-dim text-[1.02rem]">
                <span className="text-amber font-mono mt-[1px] shrink-0">▸</span>
                {item.text}
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}
