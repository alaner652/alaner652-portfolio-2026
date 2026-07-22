import { RevealWrapper } from '@/components/common/RevealWrapper'
import { NOW_LIST } from '@/constants'

export function Now() {
  return (
    <section id="now" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <h2 className="font-display mb-[24px] text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium tracking-[-0.015em]">
            Now
          </h2>
          <ul className="grid max-w-[62ch] list-none gap-[12px]">
            {NOW_LIST.map((item, i) => (
              <li key={i} className="text-dim flex items-start gap-[12px] text-[1.02rem] leading-[1.6]">
                <span className="bg-amber mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full" aria-hidden="true" />
                {item.text}
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}
