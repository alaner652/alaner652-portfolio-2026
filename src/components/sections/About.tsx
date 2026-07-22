import { RevealWrapper } from '@/components/common/RevealWrapper'

export function About() {
  return (
    <section id="about" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <h2 className="font-display mb-[28px] text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium tracking-[-0.015em]">
            About
          </h2>
          <div className="text-dim max-w-[64ch] space-y-[1.1em] text-[1.02rem] leading-[1.75]">
            <p>
              2019 年從自學遊戲開發起步，後來把重心轉向全端開發與資安研究。做安全研究時發現多項高風險漏洞，向{' '}
              <b className="text-txt font-medium">HITCON ZeroDay 負責任揭露</b>
              。
            </p>
            <p>
              現在專注在授權範圍內的資安評估，以及獨立開發 Agora-AI。
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
