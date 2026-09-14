import type { Metadata } from 'next'

import { PageHeader } from '@/components/common/PageHeader'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { OffDuty } from '@/components/sections/OffDuty'
import { Skills } from '@/components/sections/Skills'
import { SITE_CONFIG } from '@/constants'

const DESCRIPTION =
  '吳宸麒 (alaner652) 的經歷、學歷與會的東西。全端工程師，在學校電算中心做授權範圍內的資安工作。'

export const metadata: Metadata = {
  title: '關於',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `關於 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    url: '/about',
    type: 'profile',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `關於 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    creator: `@${SITE_CONFIG.handle}`,
  },
}

/** 中文版的自我介紹頁。事實跟 /resume 同源（constants），只是這裡有版面、那邊可列印。 */
export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="關於" title="我是誰、做過什麼、會什麼" note="事實跟履歷同一份來源。" />
      <About />
      <Experience />
      <Skills />
      <OffDuty />
    </>
  )
}
