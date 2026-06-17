import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { Experience } from '@/components/sections/Experience'
import { Writing } from '@/components/sections/Writing'
import { Now } from '@/components/sections/Now'
import { Philosophy } from '@/components/sections/Philosophy'
import { SITE_CONFIG } from '@/constants'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  sameAs: [SITE_CONFIG.github],
  jobTitle: 'Software Engineer',
  description: SITE_CONFIG.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Writing />
      <Now />
      <Philosophy />
    </>
  )
}
