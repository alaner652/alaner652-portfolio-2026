import type { Metadata } from 'next'

import { ProjectIndex } from '@/components/sections/ProjectIndex'
import { WORK_ITEMS } from '@/constants'
import { content } from '@/i18n/content'
import { pageMeta } from '@/i18n/meta'
import { initLocale, t } from '@/i18n/server'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => pageMeta(locale, 'projects', '/projects', 'website'))
}

/** 頁首：小字頁名、兩行標題，右邊一個空心的作品總數和一句手寫。 */
export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params)
  const d = t().projects
  return (
    <>
      <section className="wrap flex items-end justify-between gap-6 pt-7 md:gap-10 md:pt-14">
        <div className="">
          <div className="text-text-3 text-[13px] md:text-sm">{d.title}</div>
          <h1 className="text-text mt-2.5 text-[34px] leading-[1.2] font-black tracking-[-0.02em] md:mt-3 md:text-[clamp(44px,4.5vw,64px)] md:leading-[1.1] md:tracking-[-0.03em]">
            {d.h1a}
            <br className="hidden md:block" />
            {d.h1b}
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="outline-num text-[64px] md:text-[160px] md:leading-[0.85]"
            aria-hidden="true"
          >
            {String(WORK_ITEMS.length).padStart(2, '0')}
          </div>
          <div className="font-hand text-accent mt-2 hidden text-[24px] md:block">{d.note}</div>
        </div>
      </section>
      <div className="">
        <ProjectIndex items={content().WORK_ITEMS} />
      </div>
    </>
  )
}
