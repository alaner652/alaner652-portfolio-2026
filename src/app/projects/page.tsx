import type { Metadata } from 'next'

import { Marker } from '@/components/common/Marker'
import { PageHeader } from '@/components/common/PageHeader'
import { WorkList } from '@/components/sections/WorkList'
import { SITE_CONFIG } from '@/constants'

const DESCRIPTION = '吳宸麒 (alaner652) 做過的東西：還在跑的、開源的，以及一些已經停了的。'

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

export default function ProjectsPage() {
  return (
    <>
      {/* 照草稿 v3：大標的後半句畫一條麥克筆（開頁畫，跟 /about 同一種） */}
      <PageHeader
        eyebrow="做過的東西"
        title={
          <>
            還在跑的，以及一些
            <Marker draw="load" delay={900}>
              已經停了的
            </Marker>
          </>
        }
      />
      <WorkList />
    </>
  )
}
