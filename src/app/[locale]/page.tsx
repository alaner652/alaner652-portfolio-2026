import { Bento } from '@/components/home/Bento'
import { Caps } from '@/components/home/Caps'
import { Hero } from '@/components/home/Hero'
import { Work } from '@/components/home/Work'
import { Writing } from '@/components/home/Writing'
import { cookies } from 'next/headers'

import { SITE_CONFIG } from '@/constants'
import { initLocale } from '@/i18n/server'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  email: `mailto:${SITE_CONFIG.email}`,
  sameAs: [
    SITE_CONFIG.github,
    SITE_CONFIG.instagram,
    SITE_CONFIG.threads,
    SITE_CONFIG.discord,
    SITE_CONFIG.linkedin,
  ].filter(Boolean),
  jobTitle: 'Software Engineer',
  description: SITE_CONFIG.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
}

/** 首頁：Hero → Bento（追焦照／技能／GitHub，他最喜歡的三格）→ 做過的東西 → 三個動詞 → 最近寫的 → 大型 Footer。
    年份和經歷只在 /about，不在這裡再講一次。 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params)
  // 開場動畫一個分頁只演一次：IntroOnce 看過會寫一個 session cookie，之後伺服器直接輸出完成狀態，
  // 不用任何 inline script（script 在切語系時會被 React 警告），硬重整也不會先閃一下動畫
  const seen = (await cookies()).has('intro')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div data-intro={seen ? 'done' : undefined}>
        <Hero />
        <Bento />
      </div>
      <Work />
      <Caps />
      <Writing limit={3} />
    </>
  )
}
