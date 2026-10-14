import { Photo } from '@/components/common/Photo'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { RIDING_PHOTOS } from '@/constants'

/** /about 最底下的追焦照。桌機：三欄的相片牆，直式那張靠右佔兩列；手機：一列橫向捲，像翻相簿。 */
export function OffDuty() {
  return (
    <Section id="offduty" label="工作之外，假日在山路上">
      <RevealWrapper>
        <ul className="hidden gap-4 md:grid md:grid-cols-3 md:grid-rows-2" aria-label="騎車追焦照">
          {RIDING_PHOTOS.map((p) => {
            const portrait = p.height > p.width
            return (
              <li
                key={p.src}
                className={portrait ? 'md:col-start-3 md:row-span-2 md:row-start-1' : undefined}
              >
                <Photo
                  src={p.src}
                  alt={p.alt}
                  sizes="(min-width: 768px) 340px, 78vw"
                  frameClassName={portrait ? 'aspect-auto h-full' : 'aspect-3/2'}
                />
              </li>
            )
          })}
        </ul>
        <ul
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] md:hidden"
          aria-label="騎車追焦照"
        >
          {RIDING_PHOTOS.map((p) => (
            <li key={p.src} className="w-[min(78vw,26rem)] shrink-0 snap-start">
              <Photo
                src={p.src}
                alt={p.alt}
                sizes="78vw"
                frameClassName={p.height > p.width ? 'aspect-3/4' : 'aspect-3/2'}
              />
            </li>
          ))}
        </ul>
      </RevealWrapper>
    </Section>
  )
}
