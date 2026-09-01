import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { PAST_ITEMS, WORK_ITEMS } from '@/constants'
import type { WorkStatus } from '@/types'

/** 顏色在這裡是狀態的編碼，不是裝飾：綠＝還在跑，藍＝開源，停掉的就不給顏色。 */
const STATUS: Record<WorkStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-green-ink', text: 'text-green-ink' },
  open: { dot: 'bg-blue-ink', text: 'text-blue-ink' },
  idle: { dot: 'bg-faint', text: 'text-faint' },
}

/** 外部連結標題共用；有 link 才變成連結，沒有就只是文字 */
function ItemTitle({ title, link }: { title: string; link?: string }) {
  if (!link) return <>{title}</>
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber transition-colors"
    >
      {title} ↗
    </a>
  )
}

export function Work() {
  return (
    <Section id="work">
      <RevealWrapper className="mb-8">
        <SectionLabel title="做過的東西" note="還在跑的，以及一些已經停了的。" />
      </RevealWrapper>

      {/* divide-y 而非每則各自 border-t：標題下方少一條線，區塊起頭才不會擠 */}
      <div className="divide-line-soft divide-y">
        {WORK_ITEMS.map((item) => (
          <RevealWrapper key={item.title}>
            <article className="py-8">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                  <ItemTitle title={item.title} link={item.link} />
                </h3>
                <span
                  className={`flex shrink-0 items-center gap-1.5 text-xs ${STATUS[item.tone].text}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${STATUS[item.tone].dot}`}
                    aria-hidden="true"
                  />
                  {item.status}
                </span>
              </div>
              <p className="text-dim max-w-[64ch] text-base leading-[1.7]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.metrics.map((m) => (
                  <MetricChip key={m}>{m}</MetricChip>
                ))}
              </div>
            </article>
          </RevealWrapper>
        ))}
      </div>

      <RevealWrapper className="mt-12">
        <h3 className="text-faint mb-3 text-sm">以前做的</h3>
        <ul className="divide-line-soft max-w-[64ch] list-none divide-y">
          {PAST_ITEMS.map((item) => (
            <li key={item.title} className="py-4 first:pt-0">
              <span className="font-display text-md font-medium">
                <ItemTitle title={item.title} link={item.link} />
              </span>
              <p className="text-dim mt-1 text-sm leading-[1.65]">{item.note}</p>
            </li>
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}
