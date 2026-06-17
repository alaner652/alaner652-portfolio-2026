import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Mindoyo } from '@/components/sections/Mindoyo'
import { Work } from '@/components/sections/Work'
import { Experience } from '@/components/sections/Experience'
import { Writing } from '@/components/sections/Writing'
import { Now } from '@/components/sections/Now'
import { Philosophy } from '@/components/sections/Philosophy'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mindoyo />
      <Work />
      <Experience />
      <Writing />
      <Now />
      <Philosophy />
    </>
  )
}
