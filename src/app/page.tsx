import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { Work } from '@/components/sections/Work'
import { Writing } from '@/components/sections/Writing'
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Writing />
    </>
  )
}
