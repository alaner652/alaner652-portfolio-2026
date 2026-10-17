import Image from 'next/image'

import { SkillIcon } from '@/components/common/SkillIcon'
import { WorkRows } from '@/components/home/WorkRows'
import { Accordion } from '@/components/motion/Accordion'
import { Reveal, RevealItem, itemStagger } from '@/components/motion/Reveal'
import { SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { LLink as Link } from '@/i18n/client'
import { content } from '@/i18n/content'
import { t } from '@/i18n/server'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/button'
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
    <section className="wrap pt-12 md:pt-24" id="services">
      <SecHead title={d.services} />
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
                <span className="flex shrink-0 gap-4">
                  {s.examples?.map((e) => (
                    <Link
                      key={e}
                      href={exampleHref(e)}
                      className="text-text-2 hover:text-text transition-colors"
                    >
                      {e} ↗
                    </Link>
                  ))}
                </span>
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
      className="blueprint bg-bg-deep border-line mt-12 border-y py-10 md:mt-24 md:py-18"
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

/** 一個區塊的標題列：大標 + 一行小字說明（評價怎麼來的、收據怎麼打碼） */
function SecHead({ title, note }: { title: string; note?: string }) {
  return (
    <Reveal className="mb-6 md:mb-10">
      <h2 className="text-text text-[30px] font-black md:text-[44px]">{title}</h2>
      {note && <p className="text-text-3 mt-2 font-mono text-xs md:text-[13px]">{note}</p>}
    </Reveal>
  )
}

/** 名字的第一個字當頭像：不拿別人的大頭貼來用 */
function Initial({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-raised text-accent border-border flex size-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm',
        className
      )}
    >
      {[...name][0]?.toUpperCase()}
    </span>
  )
}

/** 原始截圖外面的那層框：深色襯底 + 細框 + 柔和陰影，內容不動，只是讓截圖跟網站搭得起來 */
const SHOT_FRAME =
  'bg-surface border-border rounded-2xl border p-2 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)] md:p-2.5'

/** 客戶怎麼說：桌機放 Discord 原始截圖（真實性比重打的字高），左右交錯排；
    手機螢幕太窄，截圖縮下來字會糊，改顯示原文 + 連到原圖。 */
export function Reviews() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section className="wrap pt-12 md:pt-24" id="reviews">
      <SecHead title={d.reviews} note={d.reviewsNote} />
      {/* 桌機：原始截圖 */}
      <Reveal stagger={itemStagger} className="hidden flex-col gap-5 md:flex">
        {HIRE.reviews.map((r, i) => (
          <RevealItem key={r.name} className={cn('w-fit max-w-full', i % 2 === 1 && 'lg:self-end')}>
            <figure className={cn(SHOT_FRAME, 'm-0')}>
              <Image
                src={r.image}
                alt={`${r.name}：${r.text}`}
                width={r.width}
                height={r.height}
                sizes="(min-width: 1100px) 1040px, 100vw"
                className="block h-auto max-w-full rounded-xl"
              />
            </figure>
          </RevealItem>
        ))}
      </Reveal>
      {/* 手機：原文 + 原圖連結 */}
      <Reveal stagger={itemStagger} className="grid gap-4 md:hidden">
        {HIRE.reviews.map((r) => (
          <RevealItem key={r.name}>
            <figure className="bg-surface border-border m-0 rounded-xl border p-5">
              <blockquote className="text-text-body text-[15px] leading-[1.8]">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Initial name={r.name} />
                <span className="flex flex-1 flex-col">
                  <span className="text-text text-sm font-bold">{r.name}</span>
                  <span className="text-text-3 font-mono text-[11px]">Discord</span>
                </span>
                <a
                  href={r.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-2 hover:text-text font-mono text-[11px] transition-colors"
                >
                  {d.reviewsOriginal}
                </a>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}

/** 接案紀錄：PayPal 原始截圖（頭像模糊、姓名與金額遮掉）；右邊是工作室經歷（CubexStudios） */
export function Receipts() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section className="wrap pt-12 md:pt-24" id="record">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <SecHead title={d.receipts} note={d.receiptsNote} />
          <Reveal as="ul" stagger={itemStagger} className="grid gap-3 md:gap-4">
            {HIRE.receipts.map((r) => (
              <RevealItem as="li" key={r.image} className={SHOT_FRAME}>
                <Image
                  src={r.image}
                  alt={d.receiptAlt(d.receiptDate(r.month, r.day), r.amount, r.memo)}
                  width={r.width}
                  height={r.height}
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="block h-auto w-full rounded-xl"
                />
              </RevealItem>
            ))}
          </Reveal>
        </div>
        <Reveal className="md:col-span-5 md:pt-[76px]">
          <div className="border-line border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <p className="text-accent font-mono text-xs tracking-[0.14em] md:text-[13px]">
              {d.studio}
            </p>
            <h3 className="text-text mt-2 text-[26px] font-black md:text-[32px]">CubexStudios</h3>
            <p className="text-text-body mt-3 text-[15px] leading-[1.85] md:text-base">
              {HIRE.studio}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** 怎麼寫：從寫程式碼到進 Studio 的四步，一步一格、箭頭串起來（手機改成直的），
    每格上面是那一步用的工具 logo，底下一句 config 的說明。 */
export function Workflow() {
  const d = t().hire
  const { HIRE } = content()
  return (
    <section className="wrap pt-12 md:pt-24" id="workflow">
      <SecHead title={d.workflow} note={HIRE.workflowNote} />
      <Reveal as="ol" stagger={itemStagger} className="grid gap-3 md:grid-cols-4 md:gap-0">
        {HIRE.workflow.map((w, i) => (
          <RevealItem
            as="li"
            key={w.label}
            className={cn('relative flex md:pr-8', i === HIRE.workflow.length - 1 && 'md:pr-0')}
          >
            <div className="bg-surface border-border flex w-full flex-col rounded-2xl border p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="text-accent font-mono text-[13px]">{NO(i)}</span>
                <span className="flex gap-1.5">
                  {w.tools.map((tool) => (
                    <SkillIcon key={tool} name={tool} size={26} />
                  ))}
                </span>
              </div>
              <h3 className="text-text mt-5 text-[22px] font-black md:text-[26px]">{w.label}</h3>
              <p className="text-text-2 mt-2 text-sm leading-[1.75] md:text-[15px]">{w.text}</p>
            </div>
            {i < HIRE.workflow.length - 1 && (
              <span
                aria-hidden="true"
                className="text-text-3 absolute top-1/2 right-0 hidden w-8 -translate-y-1/2 text-center text-lg md:block"
              >
                →
              </span>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}

/** Roblox 以外的需求：一句話 + 連到作品集 */
export function OtherWork() {
  const d = t().hire
  return (
    <section className="wrap pb-12 md:pb-24" id="other">
      <Reveal className="bg-surface border-border flex flex-col gap-5 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
        <div>
          <h2 className="text-text text-[24px] font-black md:text-[32px]">{d.otherTitle}</h2>
          <p className="text-text-2 mt-2 max-w-[36em] text-[15px] leading-[1.8] md:text-base">
            {d.otherText}
          </p>
        </div>
        <Link href="/projects" className={cn(BUTTON_SECONDARY, 'shrink-0 justify-center')}>
          {d.otherCta}
        </Link>
      </Reveal>
    </section>
  )
}
