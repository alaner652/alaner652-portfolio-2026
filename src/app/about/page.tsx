import type { Metadata } from 'next'

import {
  AboutHero,
  Beliefs,
  Riding,
  SkillList,
  Timeline,
} from '@/components/sections/AboutSections'
import { SITE_CONFIG } from '@/constants'

const DESCRIPTION =
  '吳宸麒 (alaner652) 的經歷、學歷與會的東西。全端工程師，在大學電算中心做授權範圍內的資安工作。'

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

/** 關於：照片＋自介 → 四句信念 → 一年一年的故事 → 會的東西 → 假日在山路上。事實跟 /resume 同源（constants）。 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Beliefs />
      <Timeline />
      <SkillList />
      <Riding />
    </>
  )
}
