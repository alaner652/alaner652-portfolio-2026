import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { NOW_LIST } from '@/constants'

export function Now() {
  return (
    <section id="now" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <SectionLabel index="05" title="Now" className="mb-[20px]" />
          <ul className="grid max-w-[56ch] list-none gap-[10px]">
            {NOW_LIST.map((item, i) => (
              <li key={i} className="text-dim flex items-baseline gap-[12px] text-[1.02rem]">
                <span className="text-amber shrink-0 font-mono text-[0.9rem]">—</span>
                {item.text}
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}
