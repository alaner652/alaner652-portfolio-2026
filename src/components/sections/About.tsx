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
          <p className="max-w-[62ch] text-dim text-[1.06rem]">
            我的起點是一個漏洞:我在學校的系統裡找到了安全問題，
            <b className="text-txt font-medium">負責任地揭露</b>
            它，後來被請進電算中心去把它修好。從那之後，我做的事情就一直繞著同一條線——
            <b className="text-txt font-medium">找問題、研究問題、設計系統、把它做出來</b>
            。現在我在電算中心負責授權範圍內的資安評估、修補與內部工具，同時開發自己的 AI 產品。擅長全端開發、架構設計、資安與部署，也很喜歡鑽研各種怪東西。
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
