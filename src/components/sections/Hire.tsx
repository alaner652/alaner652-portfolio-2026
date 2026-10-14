import { ArrowUpRight, Plus } from 'lucide-react'

import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { ProjectCover } from '@/components/sections/ProjectCard'
import { HIRE, SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/button'
import { cn } from '@/lib/utils'

/** 接什麼：四個筆記本框排成 2×2。手寫的編號和案型坐在框線上、旁邊一個圖示。
    證據在底下「做過的案子」，這裡不再列一次。 */
export function HireServices() {
  return (
    <Section id="services" label="接什麼">
      <RevealWrapper>
        <ul className="grid gap-x-6 gap-y-11 pt-3 md:grid-cols-2">
          {HIRE.services.map(({ label, description, icon: Icon }, i) => (
            <li
              key={label}
              className="border-line rounded-card relative border border-dashed px-6 pt-8 pb-6"
            >
              <h3 className="font-hand bg-bg text-txt absolute -top-[0.8em] left-3.5 inline-flex items-center gap-2.5 px-2 text-[1.5rem] leading-none">
                <span
                  className="bg-panel-hi text-amber grid size-9 shrink-0 place-items-center rounded-lg"
                  aria-hidden="true"
                >
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                </span>
                {String(i + 1).padStart(2, '0')} {label}
              </h3>
              <p className="text-txt text-base leading-[1.75]">{description}</p>
            </li>
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}

/** 怎麼合作：四步橫排，一條手畫的線從 1 穿到 4（捲到才畫）。
    底下「先講清楚」左右分欄：問題點開才看答案，用原生 details，不用 JS。 */
export function HireProcess() {
  return (
    <>
      <Section id="process" label="怎麼合作">
        <RevealWrapper>
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-x-8 md:pt-2">
            <svg
              viewBox="0 0 1032 28"
              preserveAspectRatio="none"
              className="draw-view absolute top-[1.15rem] left-0 hidden h-7 w-full overflow-visible md:block"
              aria-hidden="true"
            >
              <path
                className="sketch"
                pathLength={1}
                d="M0 14 C 120 4, 220 24, 344 14 S 560 4, 688 14 S 900 24, 1032 12"
              />
            </svg>
            {HIRE.steps.map(({ label, description }, i) => (
              <li key={label} className="relative">
                <span
                  className="font-hand text-amber bg-bg relative -ml-2 inline-block px-2 text-[1.6rem] leading-none"
                  aria-hidden="true"
                >
                  {i + 1}.
                </span>
                <h3 className="font-display text-txt mt-4 text-lg font-medium tracking-[-0.01em]">
                  {label}
                </h3>
                <p className="text-dim mt-2 text-base leading-[1.75]">{description}</p>
              </li>
            ))}
          </ol>
        </RevealWrapper>
      </Section>

      <Section id="notes">
        <RevealWrapper className="grid gap-8 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-4">
            <h2 className="font-hand text-dim text-[1.6rem] leading-none md:text-[1.85rem]">
              先講清楚 —
            </h2>
          </div>
          <div className="border-line-soft border-t md:col-span-8">
            {HIRE.notes.map(({ q, a }) => (
              <details key={q} className="group/faq border-line-soft border-b">
                <summary className="font-display hover:text-amber flex min-h-15 cursor-pointer list-none items-center justify-between gap-6 py-3 text-[1.1rem] font-medium tracking-[-0.01em] transition-colors [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus
                    size={20}
                    className="text-faint group-open/faq:text-amber shrink-0 transition-transform duration-300 group-open/faq:rotate-45 motion-reduce:transition-none"
                    aria-hidden
                  />
                </summary>
                <p className="text-dim pr-11 pb-5 text-base leading-[1.75]">{a}</p>
              </details>
            ))}
          </div>
        </RevealWrapper>
      </Section>
    </>
  )
}

/** 做過的案子：三個並排。有真實畫面的放一張圓角細框的封面；沒有的就是一條粗線起頭的文字。 */
export function HireCases() {
  const items = HIRE.cases.flatMap((title) => WORK_ITEMS.filter((w) => w.title === title))

  return (
    <Section id="cases" label="做過的案子">
      <RevealWrapper className="grid gap-10 md:grid-cols-3 md:items-start md:gap-x-8">
        {items.map((item) => {
          const href = item.link ?? item.demo
          return (
            <article
              key={item.title}
              className={item.preview ? 'group/card' : 'group/card border-txt border-t-2 pt-4'}
            >
              {item.preview && (
                <ProjectCover
                  item={item}
                  className="border-line-soft rounded-card border"
                  sizes="(min-width: 768px) 330px, 100vw"
                />
              )}
              <h3
                className={cn(
                  'font-display text-h3 font-medium tracking-[-0.01em]',
                  item.preview && 'mt-5'
                )}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber inline-flex items-center gap-1.5 transition-colors"
                  >
                    {item.title}
                    <ArrowUpRight size={16} className="text-faint" aria-hidden />
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="text-txt text-md mt-2.5 font-medium">
                {item.result ?? item.description}
              </p>
              {item.metrics && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.metrics.map((m) => (
                    <MetricChip key={m}>{m}</MetricChip>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </RevealWrapper>
    </Section>
  )
}

/** 頁尾再叫一次：一句話 + 寄信。現在頁面沒掛它（頁首有按鈕、Footer 有信箱），留著以後要用。 */
export function HireContact() {
  return (
    // 淡色帶而不是深底：底下緊接著就是深底的 Footer，兩塊深的疊在一起會糊成一片
    <Section id="contact" label="聯絡" className="bg-panel-hi">
      <RevealWrapper>
        <div className="max-w-[40em]">
          <p className="font-display text-h2 font-medium tracking-[-0.02em]">有東西要做？</p>
          <p className="font-hand text-dim mt-3 text-[1.35rem] leading-[1.25]">
            不用寫得很正式，一兩天內回。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-base">
            <a href={`mailto:${SITE_CONFIG.email}`} className={BUTTON_PRIMARY}>
              寄信給我
            </a>
            {SITE_CONFIG.threads && (
              <a
                href={SITE_CONFIG.threads}
                target="_blank"
                rel="noopener noreferrer"
                className={BUTTON_SECONDARY}
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
