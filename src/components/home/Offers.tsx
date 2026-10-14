import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { OFFERS } from '@/constants'

/** 首頁「我能做什麼」：三個動詞——做出來、守得住、摸清楚——疊成一塊海報放左邊，
    右邊三段各對齊一行。動詞是空心線稿，捲到視窗中下段就從左往右填成橘色，滑過去也填；
    它們純裝飾（aria-hidden），讀屏讀的是右邊那欄的標題。 */
export function Offers() {
  return (
    <Section id="offers" label="我能做什麼">
      <RevealWrapper className="grid gap-x-6 gap-y-8 md:grid-cols-12">
        <div className="flex flex-col gap-1 md:col-span-7" aria-hidden="true">
          {OFFERS.map((offer) => (
            <span
              key={offer.verb}
              className="verb font-display text-[clamp(3.5rem,9vw,8rem)] leading-[1.02] font-bold tracking-[-0.03em] whitespace-nowrap"
            >
              <span className="verb-ghost">{offer.verb}</span>
              <span className="verb-fill">{offer.verb}</span>
            </span>
          ))}
        </div>
        <ol className="grid gap-7 md:col-span-5 md:grid-rows-3 md:gap-1">
          {OFFERS.map((offer, i) => (
            <li key={offer.label} className="flex flex-col justify-center">
              <h3 className="flex items-baseline gap-3">
                <span
                  className="font-hand text-amber text-[1.6rem] leading-none"
                  aria-hidden="true"
                >
                  {i + 1}.
                </span>
                <span className="text-amber-text font-mono text-xs tracking-[0.08em]">
                  <span className="sr-only">{offer.verb} · </span>
                  {offer.label}
                </span>
              </h3>
              <p className="font-display text-txt mt-2.5 max-w-[22em] text-[1.15rem] leading-[1.5] font-medium tracking-[-0.01em]">
                {offer.description}
              </p>
            </li>
          ))}
        </ol>
      </RevealWrapper>
    </Section>
  )
}
