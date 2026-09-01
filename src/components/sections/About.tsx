import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'

export function About() {
  return (
    <Section id="about">
      <RevealWrapper>
        <SectionLabel title="關於" className="mb-8" />
        <div className="text-dim max-w-[60ch] space-y-[1.1em] text-md leading-[1.75]">
          <p>
            家裡沒有人做資訊相關工作，也沒有補習班或可以問的長輩。國中為了改 Roblox 地圖開始學
            Lua，那台跑 Roblox Studio 的二手電腦是我自己拆開來修好的。後來在一個國際遊戲工作室當
            Lead Scripter，學到最重要的一課是「做出來不等於有人要」。
          </p>
          <p>
            五專的成績很難看，幾門必修不及格，這學期又開始拒學。我把時間放在了自己認為更值得的地方，代價是成績，這個帳我自己認——上學期我把它拉回全過。現在在補演算法和系統設計，那是我最虛的一塊。完整一點的版本寫在{' '}
            <Link
              href="/blog/my-story"
              className="text-txt hover:text-amber underline underline-offset-[4px] transition-colors"
            >
              這篇
            </Link>
            。
          </p>
        </div>
      </RevealWrapper>
    </Section>
  )
}
