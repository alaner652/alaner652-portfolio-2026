import Image from 'next/image'

import { SkillIcon } from '@/components/common/SkillIcon'
import { RidingGallery } from '@/components/sections/RidingGallery'
import { RIDING_PHOTOS, SITE_CONFIG } from '@/constants'
import { content } from '@/i18n/content'
import { t } from '@/i18n/server'
import { cn } from '@/lib/utils'

/** 頁首：左邊一張方形照片，右邊手寫「嗨 —」、大標、自介、手寫簽名。手機照片滿版在上。 */
export function AboutHero() {
  const d = t().about
  const { ABOUT_WHO } = content()
  return (
    <section className="md:wrap md:grid md:grid-cols-12 md:items-end md:gap-10 md:pt-16">
      {SITE_CONFIG.avatar && (
        <div className="relative aspect-square w-full overflow-hidden md:col-span-5 md:rounded-sm">
          <Image
            src={SITE_CONFIG.avatar}
            alt={d.photoAlt}
            fill
            priority
            sizes="(min-width: 768px) 520px, 100vw"
            quality={90}
            className="object-cover"
          />
        </div>
      )}
      <div className="wrap pt-7 md:col-span-7 md:px-0 md:pt-0 md:pb-3">
        <p className="font-hand text-accent text-[28px] md:text-[36px]">{d.hi}</p>
        <h1 className="text-text mt-1 text-[46px] leading-[1.05] font-black tracking-[-0.03em] md:mt-2 md:text-[clamp(56px,6vw,88px)] md:leading-[1.02] md:tracking-[-0.04em]">
          {d.h1}
        </h1>
        <p className="text-text-body mt-5 max-w-[30em] text-base leading-[1.9] md:mt-8 md:text-xl">
          {ABOUT_WHO}
        </p>
        <p className="font-hand text-accent mt-4 text-right text-[30px] md:mt-7 md:inline-block md:-rotate-3 md:text-left md:text-[40px]">
          {d.signature}
        </p>
      </div>
    </section>
  )
}

/** 四句一路上學到的話：桌面四格細線分隔，手機橫向捲。 */
export function Beliefs() {
  const { ABOUT_WORDS } = content()
  return (
    <section className="border-line mt-12 border-y md:mt-28">
      <ol className="wrap flex [scrollbar-width:none] overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
        {ABOUT_WORDS.lines.map(({ text, from }, i) => (
          <li
            key={text}
            className={cn(
              'border-line shrink-0 basis-65 border-r py-6 pr-5 md:basis-auto md:py-10 md:pr-7',
              i > 0 && 'pl-5 md:pl-7',
              i === ABOUT_WORDS.lines.length - 1 && 'md:border-r-0'
            )}
          >
            <blockquote className="text-text text-lg leading-[1.55] font-black md:text-[22px]">
              {text}
            </blockquote>
            <div className="text-text-3 mt-2.5 font-mono text-[11px] md:mt-3.5 md:text-xs">
              — {from}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** 年份清單：巨大的空心年份（只放區間的第一個年份），現在那一年填橘；右邊標題和一句話。 */
export function Timeline() {
  const d = t().about
  const { JOURNEY } = content()
  return (
    <section className="wrap pt-14 md:pt-28">
      <div className="mb-2 flex items-baseline justify-between gap-6 md:mb-6">
        <h2 className="text-text md:text-h2 text-[30px] leading-[1.3] font-black md:tracking-[-0.03em]">
          {d.timeline}
        </h2>
        <span className="font-hand text-accent hidden shrink-0 text-[26px] md:inline">
          {d.scrollHint}
        </span>
      </div>
      <ol>
        {JOURNEY.map((t) => {
          const year = t.period.slice(0, 4)
          const range = t.period.replace(/\s/g, '').replace(/—$/, '')
          return (
            <li
              key={t.period + t.title}
              className="border-line grid gap-x-8 border-t py-6 md:grid-cols-12 md:items-start md:py-9"
            >
              <div className="flex items-end gap-2.5 md:col-span-4 md:block">
                <div
                  className={cn(
                    'outline-num text-[64px] md:text-[112px]',
                    t.current && 'text-accent [-webkit-text-stroke:0]'
                  )}
                  aria-hidden="true"
                >
                  {year}
                </div>
                <div className="text-text-3 pb-1 font-mono text-[11px] md:mt-2.5 md:pb-0 md:text-xs">
                  <span className="sr-only">{t.period}，</span>
                  {range !== year && <span>{range} · </span>}
                  {t.track}
                </div>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-text mt-3 text-xl font-black md:mt-0 md:text-[28px]">
                  {t.title}
                </h3>
                <p className="text-text-2 mt-1.5 text-[15px] leading-[1.8] md:mt-3 md:text-[17px] md:leading-[1.85]">
                  {t.detail}
                </p>
              </div>
              {t.current && (
                <p className="font-hand text-accent mt-2 text-[22px] md:col-span-3 md:mt-0 md:-rotate-2 md:text-[24px]">
                  {d.now} <span className="md:hidden">↑</span>
                  <span className="hidden md:inline">←</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/** 會的東西：條列。左邊標題，右邊一組一列（mono 分類 + 一排技術），
    有 logo 的前面帶小磚（跟首頁 Bento 同一組 svg），沒有的只放文字。 */
export function SkillList() {
  const d = t().about
  const { SKILLS } = content()
  return (
    <section id="skills" className="wrap grid gap-2 pt-10 md:grid-cols-12 md:gap-8 md:pt-24">
      <h2 className="text-text text-[26px] font-black md:col-span-4 md:text-[40px]">{d.skills}</h2>
      <dl className="md:col-span-8">
        {SKILLS.map((g) => (
          <div
            key={g.label}
            className="border-line border-t py-3 md:grid md:grid-cols-[160px_minmax(0,1fr)] md:gap-6 md:py-4"
          >
            <dt className="text-text-3 font-mono text-[11px] md:pt-1.5 md:text-[13px]">
              {g.label}
            </dt>
            <dd className="mt-1.5 md:mt-0">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {g.items.map((name) => (
                  <li
                    key={name}
                    className="text-text flex items-center gap-2 text-[15px] leading-[1.7] md:text-lg"
                  >
                    <SkillIcon name={name} size={20} />
                    {name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/** 工作之外：滿版一張正面迎來的追焦照收尾，標題壓在照片左下；底下四張照真實比例錯落排，點了放大。 */
export function Riding() {
  const d = t().about
  return (
    <RidingGallery
      photos={RIDING_PHOTOS}
      labels={{
        eyebrow: d.ridingEyebrow,
        title: d.riding,
        note: d.ridingNote,
        list: d.ridingLabel,
        open: d.ridingOpen,
        close: d.ridingClose,
        prev: d.ridingPrev,
        next: d.ridingNext,
      }}
    />
  )
}
