import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { WorkList } from '@/components/sections/WorkList'

export function Work() {
  return (
    <Section id="work">
      <RevealWrapper className="mb-6">
        <SectionLabel title="做過的東西" note="還在跑的，以及一些已經停了的。" />
      </RevealWrapper>

      {/* 清單和篩選都要 state，所以拆成 client component；標題這層維持 server */}
      <WorkList />
    </Section>
  )
}
