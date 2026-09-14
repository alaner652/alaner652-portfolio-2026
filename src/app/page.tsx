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

/** 首頁：Hero → 工作之外／技能／GitHub 的 Bento → 我能做什麼（三步流程）
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
