import { ArrowUpRight } from 'lucide-react'

import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { FeaturedRow } from '@/components/home/FeaturedWork'
import { Section } from '@/components/layout/Section'
import { HIRE, SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { TONE_CHIP, TONE_INK } from '@/lib/tone'

/** 接什麼：四種案型，一種一張卡。圖示和色調跟首頁「我能做什麼」同一套，
    底下列站上做過的例子——沒做過的案型不放，這頁跟首頁一樣賣證據。 */
export function HireServices() {
  return (
    <Section id="services" className="border-t-0 pt-0">
      <RevealWrapper>
        <SectionLabel title="接什麼" note="四種做過、也還想再做的案子。" className="mb-8" />
        <ul className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {HIRE.services.map(({ label, description, tone, icon: Icon, examples }) => (
            <li
              key={label}
              className="bg-panel border-line-soft rounded-card flex flex-col border p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-card flex size-10 shrink-0 items-center justify-center ${TONE_CHIP[tone]}`}
                  aria-hidden="true"
                >
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className={`font-mono text-sm tracking-[0.04em] ${TONE_INK[tone]}`}>{label}</h3>
              </div>
              <p className="text-txt mt-4 text-base leading-[1.75]">{description}</p>
              {examples && (
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  <span className="text-faint text-2xs font-mono tracking-[0.06em]">做過</span>
                  {examples.map((name) => (
                    <MetricChip key={name}>{name}</MetricChip>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}

/** 怎麼合作：四步照時間排成一列，編號用 mono 小字。左邊是流程，右邊是先講清楚的幾件事，
    手機上下疊。 */
export function HireProcess() {
  return (
    <Section id="process">
      <RevealWrapper>
        <SectionLabel title="怎麼合作" note="從第一封信到上線之後。" className="mb-8" />
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <ol className="divide-line-soft border-line-soft divide-y border-t">
            {HIRE.steps.map(({ label, description }, i) => (
              <li key={label} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="text-faint text-2xs pt-1 font-mono tracking-[0.08em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-txt text-lg font-medium tracking-[-0.01em]">
                    {label}
                  </h3>
                  <p className="text-dim mt-2 max-w-[48ch] text-base leading-[1.75]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="bg-panel border-line-soft rounded-card border p-6 md:p-8">
            <h3 className="text-faint mb-5 font-mono text-xs tracking-[0.08em]">先講清楚</h3>
            <dl className="divide-line-soft divide-y">
              {HIRE.notes.map(({ q, a }) => (
                <div key={q} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-display text-txt text-base font-medium tracking-[-0.01em]">
                    {q}
                  </dt>
                  <dd className="text-dim mt-1.5 text-sm leading-[1.7]">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </RevealWrapper>
    </Section>
  )
}

/** 做過的案子：從 WORK_ITEMS 挑 HIRE.cases 列的那幾個，版式跟首頁精選一樣。 */
export function HireCases() {
  const items = HIRE.cases.flatMap((title) => WORK_ITEMS.filter((w) => w.title === title))

  return (
    <Section id="cases">
      <RevealWrapper className="mb-10">
        <SectionLabel
          title="做過的案子"
          note="挑真的交出去、有人在用的。其他的在「做過的東西」。"
        />
      </RevealWrapper>
      <div className="divide-line-soft divide-y">
        {items.map((item) => (
          <RevealWrapper key={item.title} className="py-8 first:pt-0 last:pb-0 md:py-10">
            <FeaturedRow item={item} />
          </RevealWrapper>
        ))}
      </div>
    </Section>
  )
}

const PRIMARY =
  'bg-orange-cta text-bg hover:bg-txt inline-flex min-h-11 items-center rounded-full px-5 transition-colors'
const SECONDARY =
  'border-line hover:border-amber hover:text-amber text-txt inline-flex min-h-11 items-center gap-1.5 rounded-full border px-5 transition-colors'

/** 頁尾再叫一次：一句話 + 寄信。Threads 當備用，有人不想寫信。 */
export function HireContact() {
  return (
    <Section id="contact">
      <RevealWrapper>
        <div className="bg-panel border-line-soft rounded-card border p-6 md:p-10">
          <h2 className="font-display text-h2 font-medium tracking-[-0.015em]">有東西要做？</h2>
          <p className="text-dim text-md mt-3 max-w-[52ch] leading-[1.75]">
            寄信說你要做什麼、給誰用、什麼時候要。不用寫得很正式，一兩天內回。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-base">
            <a href={`mailto:${SITE_CONFIG.email}`} className={PRIMARY}>
              寄信給我
            </a>
            {SITE_CONFIG.threads && (
              <a
                href={SITE_CONFIG.threads}
                target="_blank"
                rel="noopener noreferrer"
                className={SECONDARY}
              >
                Threads 私訊 <ArrowUpRight size={16} className="text-faint" aria-hidden />
              </a>
            )}
            <span className="text-faint font-mono text-xs">{SITE_CONFIG.email}</span>
          </div>
        </div>
      </RevealWrapper>
    </Section>
  )
}
