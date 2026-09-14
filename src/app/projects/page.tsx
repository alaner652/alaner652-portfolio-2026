import type { Metadata } from 'next'

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
      <PageHeader eyebrow="做過的東西" title="還在跑的，以及一些已經停了的" />
      <div className="mx-auto max-w-270 px-6 pb-14 md:pb-20">
        <WorkList />
      </div>
    </>
  )
}
