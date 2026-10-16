import { Bento } from '@/components/home/Bento'
import { Caps } from '@/components/home/Caps'
import { Hero } from '@/components/home/Hero'
import { Work } from '@/components/home/Work'
import { Writing } from '@/components/home/Writing'
import { SITE_CONFIG } from '@/constants'

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
    SITE_CONFIG.linkedin,
  ].filter(Boolean),
  jobTitle: 'Software Engineer',
  description: SITE_CONFIG.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
}

/** 首頁：Hero → Bento（追焦照／技能／GitHub，他最喜歡的三格）→ 做過的東西 → 三個動詞 → 最近寫的 → 大型 Footer。
    年份和經歷只在 /about，不在這裡再講一次。 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Bento />
      <Work />
      <Caps />
      <Writing limit={3} />
    </>
  )
}
