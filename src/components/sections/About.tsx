import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'

export function About() {
  return (
    <section id="about" className="border-line-soft border-t py-14 md:py-20">
      <div className="mx-auto max-w-270 px-6">
        <RevealWrapper>
          <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <SectionLabel title="關於" />
            <div className="text-dim max-w-[60ch] space-y-[1.1em] text-md leading-[1.75]">
              <p>
                家裡沒有人做資訊相關工作，我也沒有補習班或可以問的長輩。國中因為想改 Roblox
                地圖開始學 Lua，那台跑 Roblox Studio 的二手電腦是我自己拆開來修好的。
              </p>
              <p>
                後來去了一個國際遊戲工作室當 Lead
                Scripter。技術上學了不少，但更重要的一課是「做出來不等於有人要」。
              </p>
              <p>
                五專的成績很難看，幾門必修不及格，這學期又開始拒學。我不打算粉飾這件事——我把時間放在了自己認為更值得的地方，代價是成績，這個帳我自己認。上學期我把它拉回全過，證明需要的時候我做得到。現在在補演算法和系統設計，那是我最虛的一塊。
              </p>
              <p>
                我比較在意的還是同一個問題：能不能把一個真實的問題，變成一個能用的系統。完整一點的版本寫在{' '}
                <Link
                  href="/blog/my-story"
                  className="text-txt hover:text-amber underline underline-offset-[4px] transition-colors duration-180"
                >
                  這篇
                </Link>
                。
              </p>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
