import { Bento } from '@/components/home/Bento'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { Hero } from '@/components/home/Hero'
import { Offers } from '@/components/home/Offers'
import { Writing } from '@/components/home/Writing'
import { SITE_CONFIG } from '@/constants'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  email: `mailto:${SITE_CONFIG.email}`,
  sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin].filter(Boolean),
  jobTitle: 'Software Engineer',
  description: SITE_CONFIG.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
}

/** 首頁：Hero（文案 + NOW 卡）→ 我能做什麼（三步流程）→ 關於／經歷／技能的 Bento
    → 精選專案 → 最新文章。Bento 每格連到 /about 的對應區塊，完整專案在 /projects。 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Offers />
      <Bento />
      <FeaturedWork />
      <Writing limit={3} />
    </>
  )
}
