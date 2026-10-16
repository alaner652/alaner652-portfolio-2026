import type { Metadata } from 'next'

import { ProjectIndex } from '@/components/sections/ProjectIndex'
import { SITE_CONFIG, WORK_ITEMS } from '@/constants'

const DESCRIPTION = 'small R (alaner652) 做過的東西：還在跑的、開源的，以及一些已經停了的。'

export const metadata: Metadata = {
  title: '做過的東西',
  description: DESCRIPTION,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `做過的東西 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    url: '/projects',
    type: 'website',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `做過的東西 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    creator: `@${SITE_CONFIG.handle}`,
  },
}

/** 頁首：小字頁名、兩行標題，右邊一個空心的作品總數和一句手寫。 */
export default function ProjectsPage() {
  return (
    <>
      <section className="wrap flex items-end justify-between gap-6 pt-7 md:gap-10 md:pt-14">
        <div>
          <div className="text-text-3 text-[13px] md:text-sm">做過的東西</div>
          <h1 className="text-text mt-2.5 text-[34px] leading-[1.2] font-black tracking-[-0.02em] md:mt-3 md:text-[clamp(44px,4.5vw,64px)] md:leading-[1.1] md:tracking-[-0.03em]">
            還在跑的，
            <br className="hidden md:block" />
            以及一些已經停了的
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="outline-num text-[64px] md:text-[160px] md:leading-[0.85]"
            aria-hidden="true"
          >
            {String(WORK_ITEMS.length).padStart(2, '0')}
          </div>
          <div className="font-hand text-accent mt-2 hidden text-[24px] md:block">
            停掉的也留著 ↓
          </div>
        </div>
      </section>
      <ProjectIndex />
    </>
  )
}
