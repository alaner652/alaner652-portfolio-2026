import type { Metadata } from 'next'

import {
  AboutHero,
  Beliefs,
  Riding,
  SkillList,
  Timeline,
} from '@/components/sections/AboutSections'
import { pageMeta } from '@/i18n/meta'
import { initLocale } from '@/i18n/server'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => pageMeta(locale, 'about', '/about', 'profile'))
}

/** 關於：照片＋自介 → 四句信念 → 一年一年的故事 → 會的東西 → 假日在山路上。事實跟 /resume 同源（constants）。 */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params)
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
