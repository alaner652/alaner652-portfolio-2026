import Image from 'next/image'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { RIDING_PHOTOS } from '@/constants'

/** /about 最底下的追焦照。橫向捲動一排、固定高度、寬度照原圖比例，
    直式那張自然變窄，不裁圖。手機用 -mx-6 讓它貼到螢幕邊緣，捲起來像相簿。 */
export function OffDuty() {
  return (
    <Section id="offduty">
      <RevealWrapper>
        <SectionLabel title="工作之外" note="假日在山路上。" className="mb-8" />
      </RevealWrapper>

      <RevealWrapper>
        <ul
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] max-md:-mx-6 max-md:scroll-px-6 max-md:px-6"
          aria-label="騎車追焦照"
        >
          {RIDING_PHOTOS.map((p) => (
            <li
              key={p.src}
              className="rounded-card relative h-56 shrink-0 snap-start overflow-hidden md:h-72"
              style={{ aspectRatio: `${p.width} / ${p.height}` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 430px, 340px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}
