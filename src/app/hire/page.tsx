import type { Metadata } from 'next'

import { PageHeader } from '@/components/common/PageHeader'
import { HireCases, HireProcess, HireServices } from '@/components/sections/Hire'
import { HIRE, SITE_CONFIG } from '@/constants'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/button'

const DESCRIPTION =
  '找 alaner652 接案：網頁產品、LINE Bot 與自動化、系統整合、授權範圍內的資安檢測。從需求到上線一個人做完，按案報價。'

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

/** 給客戶看的那一頁。跟 /about 分開：這裡只講接什麼、怎麼合作、做過哪些，
    不講學歷和經歷，那些在 /about 和 /resume。內容全在 constants 的 HIRE。 */
export default function HirePage() {
  return (
    <>
      <PageHeader
        eyebrow="接案"
        title="把東西做出來，然後讓它撐得住。"
        note={HIRE.lead}
        actions={
          <>
            <a href={`mailto:${SITE_CONFIG.email}`} className={BUTTON_PRIMARY}>
              寄信談需求
            </a>
            <a href="#services" className={BUTTON_SECONDARY}>
              先看接什麼
            </a>
          </>
        }
      />
      <HireServices />
      <HireProcess />
      <HireCases />
    </>
  )
}
