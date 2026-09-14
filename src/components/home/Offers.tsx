import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { OFFERS } from '@/constants'
import { TONE_CHIP, TONE_INK } from '@/lib/tone'

/** 一步：編號 → 圖示 → 標題 → 說明。進場照順序一步一步亮，像流程在往下走。
    延遲掛在 style 上，數量改了不用動 class；reveal-item 讓 noscript 時也看得到。 */
function Step({ offer, index }: { offer: (typeof OFFERS)[number]; index: number }) {
  const { label, description, tone, icon: Icon } = offer

  return (
    <li
      className="reveal-item group-data-visible:translate-y-0 group-data-visible:opacity-100 relative translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
      style={{ transitionDelay: `${180 + index * 220}ms` }}
    >
      <div className="flex items-center gap-3">
        <span
          className={`rounded-card flex size-10 shrink-0 items-center justify-center ${TONE_CHIP[tone]}`}
          aria-hidden="true"
        >
          <Icon className="size-5" strokeWidth={1.6} />
        </span>
        <span className="text-faint bg-bg relative px-1.5 font-mono text-2xs tracking-[0.08em]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className={`mt-4 font-mono text-sm tracking-[0.04em] ${TONE_INK[tone]}`}>{label}</h3>
      <p className="text-txt mt-2 max-w-[36ch] text-base leading-[1.75]">{description}</p>
    </li>
  )
}

/** 首頁「我能做什麼」：三步排成一條交付流程——做出來 → 守得住 → 摸清楚。
    RevealWrapper 進到視窗後，先畫連接線（scale-x 0 → 1），再讓三步依序亮起。
    不放證據連結，證據在下面「做過的東西」和 /projects。 */
export function Offers() {
  return (
    <Section id="offers">
      <RevealWrapper>
        <SectionLabel
          title="我能做什麼"
          note="一個人接得起整條線：從做出來、守得住，到把黑盒子摸清楚。"
          className="mb-10"
        />
        <div className="relative">
          {/* 連接線：桌機橫的（穿過三個圖示的中線），手機直的（貼在圖示左緣） */}
          <span
            className="bg-line group-data-visible:scale-x-100 absolute top-5 right-0 left-0 hidden h-px origin-left scale-x-0 transition-transform duration-1000 ease-out motion-reduce:transition-none md:block"
            aria-hidden="true"
          />
          <span
            className="bg-line group-data-visible:scale-y-100 absolute top-5 bottom-5 left-5 w-px origin-top scale-y-0 transition-transform duration-1000 ease-out motion-reduce:transition-none md:hidden"
            aria-hidden="true"
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {OFFERS.map((offer, i) => (
              <Step key={offer.label} offer={offer} index={i} />
            ))}
          </ol>
        </div>
      </RevealWrapper>
    </Section>
  )
}
