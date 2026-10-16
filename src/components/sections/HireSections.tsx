import Image from 'next/image'
import Link from 'next/link'

import { HIRE, SITE_CONFIG, WORK_ITEMS } from '@/constants'
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
  return (
    <section className="wrap pt-11 pb-10 md:pt-24 md:pb-22">
      <div className="text-accent font-mono text-[11px] tracking-[0.14em] md:text-[13px]">
        接案 / 按案報價 / 一個人做完
      </div>
      <h1 className="text-text mt-4 text-[clamp(40px,11vw,50px)] leading-[1.05] font-black tracking-[-0.04em] md:mt-6 md:text-[clamp(64px,7.8vw,112px)] md:leading-[1.02] md:tracking-[-0.05em]">
        把東西做出來，
        <br />
        然後讓它
        <span className="text-accent md:text-text relative inline-block md:isolate">
          撐得住
          <span
            aria-hidden="true"
            className="bg-accent absolute right-0 bottom-1.5 left-0 -z-10 hidden h-3 opacity-85 md:block"
          />
        </span>
        。
      </h1>
      <div className="mt-5 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10">
        <p className="text-text-2 max-w-[30em] text-base leading-[1.8] md:text-xl">{HIRE.lead}</p>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className={cn(BUTTON_PRIMARY, 'shrink-0 justify-center')}
        >
          寄信談需求 →
        </a>
      </div>
    </section>
  )
}

/** 接什麼：一列一種案型（編號 / 大標 / 描述 + 交付 + 例子）。手機收成 details。 */
export function Services() {
  return (
    <section className="wrap" id="services">
      {/* 桌面 */}
      <div className="hidden md:block">
        {HIRE.services.map((s, i) => (
          <article
            key={s.label}
            className="group/svc border-line grid grid-cols-[80px_minmax(0,5fr)_minmax(0,6fr)] items-start gap-8 border-t py-10"
          >
            <span className="text-accent pt-2.5 font-mono text-xl">{NO(i)}</span>
            <h3 className="text-text group-hover/svc:text-accent text-[clamp(36px,3.6vw,52px)] leading-[1.1] font-black tracking-[-0.03em] transition-colors">
              {s.label}
            </h3>
            <div className="flex flex-col gap-3.5 pt-1.5">
              <p className="text-text-body text-[17px] leading-[1.85]">{s.description}</p>
              <div className="text-text-3 flex justify-between gap-4 font-mono text-[13px]">
                <span>交付 → {s.deliverable}</span>
                {s.examples?.[0] && (
                  <Link
                    href={exampleHref(s.examples[0])}
                    className="text-text-2 hover:text-text shrink-0 transition-colors"
                  >
                    {s.examples[0]} ↗
                  </Link>
                )}
              </div>
            </div>
          </article>
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
              <span
                className="text-text-3 transition-transform group-open/d:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="text-text-body mb-2 text-[15px] leading-[1.8]">{s.description}</p>
            <p className="text-text-3 mb-5 font-mono text-xs">交付 → {s.deliverable}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** 怎麼合作：深一階的底，四步排在一條線上（前兩顆橘點），手機改成左邊一條直線。 */
export function Process() {
  return (
    <section className="bg-bg-deep border-line mt-12 border-y py-10 md:mt-24 md:py-18" id="process">
      <div className="wrap">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-text text-[30px] font-black md:text-[44px]">怎麼合作</h2>
          <span className="font-hand text-accent hidden text-[26px] md:inline">
            不會消失兩個禮拜 ✓
          </span>
        </div>
        <div className="relative mt-6 md:mt-14">
          <div
            aria-hidden="true"
            className="absolute top-[9px] right-0 left-0 hidden h-px bg-[linear-gradient(90deg,var(--color-accent),var(--color-border-strong))] md:block"
          />
          <ol className="border-border-strong relative ml-[9px] border-l md:ml-0 md:grid md:grid-cols-4 md:gap-8 md:border-l-0">
            {HIRE.steps.map((p, i) => (
              <li key={p.label} className="relative pb-6 pl-6.5 last:pb-0 md:pb-0 md:pl-0">
                <span
                  className={cn(
                    'bg-bg-deep absolute top-0.5 -left-2.5 block size-[19px] rounded-full border-2 md:static md:top-auto md:left-auto',
                    i < 2 ? 'border-accent' : 'border-text-3'
                  )}
                  aria-hidden="true"
                />
                <div className="text-text-3 font-mono text-[11px] md:mt-5 md:text-xs">{NO(i)}</div>
                <h3 className="text-text mt-0.5 text-xl font-black md:mt-1.5 md:text-[26px]">
                  {p.label}
                </h3>
                <p className="text-text-2 mt-1 text-sm leading-[1.75] md:mt-2.5 md:text-[15px] md:leading-[1.8]">
                  {p.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <p className="font-hand text-accent mt-1 text-right text-[22px] md:hidden">
          不會消失兩個禮拜 ✓
        </p>
      </div>
    </section>
  )
}

/** 做過的案子：三張（截圖 + 名字 + 技術），連作品頁。手機橫向捲。 */
export function Cases() {
  const items = HIRE.cases.flatMap((t) => WORK_ITEMS.filter((w) => w.title === t))
  return (
    <section className="pt-12 md:pt-24" id="cases">
      <div className="wrap mb-4 flex items-baseline justify-between gap-6 md:mb-6">
        <h2 className="text-text text-[30px] font-black md:text-[44px]">做過的案子</h2>
        <Link
          href="/projects"
          className="border-accent text-text hover:text-accent hidden border-b pb-0.5 text-sm transition-colors md:inline"
        >
          全部作品 →
        </Link>
      </div>
      <ul className="flex gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:wrap md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
        {items.map((w) => (
          <li key={w.slug} className="w-60 shrink-0 md:w-auto">
            <Link href={`/projects/${w.slug}`} className="group/case block">
              {w.preview && (
                <div className="border-border bg-raised relative aspect-[5/3] overflow-hidden rounded-sm border">
                  <Image
                    src={w.preview}
                    alt={`${w.title} 的畫面`}
                    fill
                    sizes="(min-width: 768px) 420px, 240px"
                    className="object-cover object-top transition-transform duration-500 group-hover/case:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
              )}
              <div className="text-text group-hover/case:text-accent mt-2.5 text-base font-bold transition-colors md:mt-3.5 md:text-xl">
                {w.title}
              </div>
              {w.metrics && (
                <div className="text-text-3 mt-1 hidden font-mono text-xs md:block">
                  {w.metrics.join(' · ')}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 先講清楚：問題左、答案右。 */
export function Faq() {
  return (
    <section className="wrap pt-12 pb-12 md:pt-28 md:pb-24" id="notes">
      <h2 className="text-text mb-2 text-[30px] font-black md:mb-6 md:text-[44px]">先講清楚</h2>
      <dl>
        {HIRE.notes.map(({ q, a }) => (
          <div
            key={q}
            className="border-line grid gap-1.5 border-t py-4.5 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-8 md:py-7"
          >
            <dt className="text-text text-[17px] font-black md:text-[22px]">{q}</dt>
            <dd className="text-text-body text-[14.5px] leading-[1.8] md:text-[17px] md:leading-[1.85]">
              {a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
