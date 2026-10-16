import { WorkRows } from '@/components/home/WorkRows'
import { Accordion } from '@/components/motion/Accordion'
import { Reveal, RevealItem, itemStagger } from '@/components/motion/Reveal'
import { SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { LLink as Link } from '@/i18n/client'
import { content } from '@/i18n/content'
import { t } from '@/i18n/server'
import { BUTTON_PRIMARY } from '@/lib/button'
import { cn } from '@/lib/utils'

const NO = (i: number) => String(i + 1).padStart(2, '0')

/** 例子對到 WORK_ITEMS 就連作品頁；對不到的（電算中心的經歷）連關於頁。 */
function exampleHref(title: string) {
  const item = WORK_ITEMS.find((w) => w.title === title)
  return item ? `/projects/${item.slug}` : '/about'
}

/** 頁首：mono 眉標、112px 大標（「撐得住」底下一塊橘色平塗）、一句話 + 橘色按鈕。 */
export function HireHero() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <Reveal as="section" load stagger={itemStagger} className="wrap pt-11 pb-10 md:pt-24 md:pb-22">
      <RevealItem
        small
        className="text-accent font-mono text-[11px] tracking-[0.14em] md:text-[13px]"
      >
        {d.eyebrow}
      </RevealItem>
      <RevealItem small>
        <h1 className="text-text mt-4 text-[clamp(40px,11vw,50px)] leading-[1.05] font-black tracking-[-0.04em] md:mt-6 md:text-[clamp(64px,7.8vw,112px)] md:leading-[1.02] md:tracking-[-0.05em]">
          {d.h1a}
          <br />
          {d.h1b}
          <span className="text-accent md:text-text relative inline-block md:isolate">
            {d.h1c}
            {/* 橘條：H1 出來之後 0.3s 從左畫出 */}
            <Reveal
              load
              as="span"
              aria-hidden="true"
              variants={{
                hidden: { scaleX: 0 },
                show: {
                  scaleX: 1,
                  transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1], delay: 0.9 },
                },
              }}
              style={{ transformOrigin: 'left' }}
              className="bg-accent absolute right-0 bottom-1.5 left-0 -z-10 hidden h-3 opacity-85 md:block"
            />
          </span>
          {d.h1d}
        </h1>
      </RevealItem>
      <RevealItem
        small
        className="mt-5 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10"
      >
        <p className="text-text-2 max-w-[30em] text-base leading-[1.8] md:text-xl">{HIRE.lead}</p>
        <a
          href={SITE_CONFIG.discord}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(BUTTON_PRIMARY, 'shrink-0 justify-center')}
        >
          {d.cta}
        </a>
      </RevealItem>
    </Reveal>
  )
}

/** 接什麼：一列一種案型（編號 / 大標 / 描述 + 交付 + 例子）。手機收成 details。 */
export function Services() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section className="wrap" id="services">
      {/* 桌面 */}
      <div className="hidden md:block">
        {HIRE.services.map((s, i) => (
          <Reveal
            as="article"
            stagger={0.06}
            key={s.label}
            className="group/svc border-line grid grid-cols-[80px_minmax(0,5fr)_minmax(0,6fr)] items-start gap-8 border-t py-10"
          >
            <RevealItem small as="span" className="text-accent pt-2.5 font-mono text-xl">
              {NO(i)}
            </RevealItem>
            <RevealItem small>
              <h3 className="text-text group-hover/svc:text-accent text-[clamp(36px,3.6vw,52px)] leading-[1.1] font-black tracking-[-0.03em] transition-colors">
                {s.label}
              </h3>
            </RevealItem>
            <RevealItem small className="flex flex-col gap-3.5 pt-1.5">
              <p className="text-text-body text-[17px] leading-[1.85]">{s.description}</p>
              <div className="text-text-3 flex justify-between gap-4 font-mono text-[13px]">
                <span>
                  {d.deliver} {s.deliverable}
                </span>
                {s.examples?.[0] && (
                  <Link
                    href={exampleHref(s.examples[0])}
                    className="text-text-2 hover:text-text shrink-0 transition-colors"
                  >
                    {s.examples[0]} ↗
                  </Link>
                )}
              </div>
            </RevealItem>
          </Reveal>
        ))}
      </div>
      {/* 手機 */}
      <div className="md:hidden">
        {HIRE.services.map((s, i) => (
          <details key={s.label} className="group/d border-line border-t">
            <summary className="flex min-h-19 cursor-pointer list-none items-center gap-3.5 [&::-webkit-details-marker]:hidden">
              <span className="text-accent font-mono text-[13px]">{NO(i)}</span>
              <span className="text-text flex-1 text-[26px] font-black tracking-[-0.02em]">
                {s.label}
              </span>
              <span className="text-text-3 group-open/d:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="text-text-body mb-2 text-[15px] leading-[1.8]">{s.description}</p>
            <p className="text-text-3 mb-5 font-mono text-xs">
              {d.deliver} {s.deliverable}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** 怎麼合作：深一階的底，四步用全站同一套巨大空心編號（關於頁的年份、文章頁的月份），
    第一步填橘＝從這裡開始。桌面四欄細直線分隔，手機一步一列、編號在左。 */
export function Process() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section
      className="dots bg-bg-deep border-line mt-12 border-y py-10 md:mt-24 md:py-18"
      id="process"
    >
      <div className="wrap">
        <h2 className="text-text text-[30px] font-black md:text-[44px]">{d.process}</h2>
        <Reveal as="ol" stagger={0.1} className="mt-4 md:mt-12 md:grid md:grid-cols-4">
          {HIRE.steps.map((p, i) => (
            <RevealItem
              as="li"
              key={p.label}
              className={cn(
                'border-line grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 border-t py-5 md:block md:border-t-0 md:border-l md:px-7 md:py-0',
                i === 0 && 'md:border-l-0 md:pl-0',
                i === HIRE.steps.length - 1 && 'md:pr-0'
              )}
            >
              <div
                className={cn(
                  'outline-num text-[56px] md:text-[96px]',
                  i === 0 && 'text-accent [-webkit-text-stroke:0]'
                )}
                style={i === 0 ? undefined : { color: 'var(--color-bg-deep)' }}
                aria-hidden="true"
              >
                {NO(i)}
              </div>
              <div className="md:mt-7">
                <h3 className="text-text text-xl font-black md:text-[26px]">
                  <span className="sr-only">{NO(i)} </span>
                  {p.label}
                </h3>
                <p className="text-text-2 mt-1 text-sm leading-[1.75] md:mt-2.5 md:text-[15px] md:leading-[1.8]">
                  {p.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** 做過的案子：跟首頁一樣的作品列（編號 / 大標 / 一句結果，滑過截圖跟著游標浮出），
    不放三張風格不一的縮圖。 */
export function Cases() {
  const d = t()
  const { HIRE, WORK_ITEMS: items0 } = content()
  const items = HIRE.cases.flatMap((c) => items0.filter((w) => w.title === c))
  return (
    <section className="wrap pt-12 md:pt-24" id="cases">
      <Reveal className="mb-4 flex items-baseline justify-between gap-6 md:mb-6">
        <h2 className="text-text text-[30px] font-black md:text-[44px]">{d.hire.cases}</h2>
        <Link
          href="/projects"
          className="text-text hover:text-accent font-mono text-[13px] transition-colors"
        >
          {d.hire.allWork}
        </Link>
      </Reveal>
      <WorkRows items={items} start={1} />
    </section>
  )
}

/** 先講清楚：手風琴（motion/Accordion）。標題先進場。 */
export function Faq() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section className="wrap pt-12 pb-12 md:pt-28 md:pb-24" id="notes">
      <Reveal>
        <h2 className="text-text mb-2 text-[30px] font-black md:mb-6 md:text-[44px]">{d.faq}</h2>
      </Reveal>
      <Accordion items={HIRE.notes} />
    </section>
  )
}
