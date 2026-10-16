import type { Metadata } from 'next'

import { Cases, Faq, HireHero, Process, Services } from '@/components/sections/HireSections'
import { SITE_CONFIG } from '@/constants'

const DESCRIPTION =
  '找 alaner652 接案：網頁產品、Roblox 遊戲、LINE Bot 與自動化、系統整合、授權範圍內的資安檢測。從需求到上線一個人做完，按案報價。'

export const metadata: Metadata = {
  title: '接案',
  description: DESCRIPTION,
  alternates: { canonical: '/hire' },
  openGraph: {
    title: `接案 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    url: '/hire',
    type: 'website',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `接案 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    creator: `@${SITE_CONFIG.handle}`,
  },
}

/** 給客戶看的那一頁：接什麼 → 怎麼合作 → 做過的案子 → 先講清楚 → 大型 Footer（寄信）。
    不講學歷和經歷，那些在 /about 和 /resume。內容全在 constants 的 HIRE。 */
export default function HirePage() {
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
