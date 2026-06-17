import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { MINDOYO_TAGS } from '@/constants'

export function Mindoyo() {
  return (
    <section id="mindoyo" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Product Lab</Eyebrow>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
              Mindoyo
            </h2>
          </div>
          <p className="max-w-[62ch] text-dim text-[1.06rem]">
            Mindoyo 不是一間公司——它是我做出來的東西的統稱。一個工程師往創辦人路上的工作檯，底下放著我真正在開發、上線、維護的專案。它的共同問題只有一個:
            <b className="text-txt font-medium">怎麼用軟體與 AI 把日常裡多餘的摩擦拿掉。</b>
          </p>
          <div className="flex flex-wrap gap-[10px] mt-[26px]">
            {MINDOYO_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="font-mono text-[0.76rem] text-dim border border-line px-[14px] py-[8px] rounded-[7px] bg-panel"
              >
                <span className="text-amber mr-[7px]">›</span>
                {tag.label}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
