import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'

export function About() {
  return (
    <section id="about" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>About</Eyebrow>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
              It started with a bug I probably shouldn&rsquo;t have found.
            </h2>
          </div>
          <div className="max-w-[62ch] space-y-[1.1em] text-dim text-[1.06rem]">
            <p>
              2019 年自學 Roblox 遊戲開發起步，後加入國際工作室任 Lead Scripter。進入五專後技術重心轉向全端開發與資安研究。
            </p>
            <p>
              對校務系統做安全研究期間發現多項高風險漏洞，向{' '}
              <b className="text-txt font-medium">HITCON ZeroDay 負責任揭露</b>
              ，隨後獲聘入電算中心主導修補。
            </p>
            <p>
              目前在電算中心執行授權範圍內的安全評估與修補。
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
