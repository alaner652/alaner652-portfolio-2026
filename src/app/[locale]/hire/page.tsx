import type { Metadata } from 'next'

import {
  Cases,
  Faq,
  HireHero,
  OtherWork,
  Process,
  Receipts,
  Reviews,
  Services,
  Workflow,
} from '@/components/sections/HireSections'
import { pageMeta } from '@/i18n/meta'
import { initLocale } from '@/i18n/server'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => pageMeta(locale, 'hire', '/hire', 'website'))
}

/** 給 Roblox 客戶看的那一頁（2026-10-17 起只講 Roblox）：
    評價 → 接什麼 → 作品 → 接案紀錄與工作室 → 怎麼寫 → 怎麼合作 → 先講清楚 → Roblox 以外導去作品集。
    不講學歷，那些在 /about 和 /resume。內容全在 constants 的 HIRE。 */
export default async function HirePage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params)
  return (
    <>
      <HireHero />
      <Reviews />
      <Services />
      <Cases />
      <Receipts />
      <Workflow />
      <Process />
      <Faq />
      <OtherWork />
    </>
  )
}
