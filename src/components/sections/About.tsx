import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'

export function About() {
  return (
    <section id="about" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <div className="grid gap-[24px] md:grid-cols-[200px_1fr] md:gap-[48px]">
            <SectionLabel index="01" title="About" />
            <div className="text-dim max-w-[60ch] space-y-[1.1em] text-[1.02rem] leading-[1.75]">
              <p>
                自學寫程式長大，習慣把好奇的東西拆開搞懂。
              </p>
              <p>
                現在做全端產品和資安研究，也常常為了自己的需求動手做工具。
              </p>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
