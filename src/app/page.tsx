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

/** 首頁：Hero → Bento（相片／技能／GitHub，最一開始的三格）→ 我能做什麼（三個大動詞）
    → 做過的東西（一列一件，替上面三個動詞作證）→ 最新文章。
    Bento 緊接在 Hero 底下：第一屏只有字，第一張圖要早一點出現，而且 Hero 故意留 10% 讓它露出來。
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
      <Offers />
      <FeaturedWork />
      <Writing limit={3} />
    </>
  )
}
