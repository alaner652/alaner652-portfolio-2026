import type { Metadata } from 'next'

import { Cases, Faq, HireHero, Process, Services } from '@/components/sections/HireSections'
import { pageMeta } from '@/i18n/meta'
import { initLocale } from '@/i18n/server'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => pageMeta(locale, 'hire', '/hire', 'website'))
}

/** 給客戶看的那一頁：接什麼 → 怎麼合作 → 做過的案子 → 先講清楚 → 大型 Footer（寄信）。
    不講學歷和經歷，那些在 /about 和 /resume。內容全在 constants 的 HIRE。 */
export default async function HirePage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params)
  return (
    <>
      <HireHero />
      <Services />
      <Process />
      <Cases />
      <Faq />
    </>
  )
}
