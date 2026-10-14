import { Marker } from '@/components/common/Marker'
import { Photo } from '@/components/common/Photo'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { ABOUT_WHO, ABOUT_WORDS, SITE_CONFIG } from '@/constants'

/** 關於我：自介當開場大字，右邊一張頭像。名字、帳號、學校、在做什麼都在那段話裡，
    不另外列一份事實表。再下面一段是一路上學到的四句話，放大、關鍵句畫底線、左右錯開，每句標出處。 */
export function About() {
  return (
    <>
      <Section id="about" label="關於我">
        <RevealWrapper className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          <p className="font-display text-txt max-w-[24em] text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.6] font-medium tracking-[-0.01em] md:col-span-8">
            {ABOUT_WHO}
          </p>
          {SITE_CONFIG.avatar && (
            <div className="md:col-span-4 md:pt-4">
              <Photo
                src={SITE_CONFIG.avatar}
                alt="吳宸麒的頭像"
                sizes="(min-width: 768px) 340px, 100vw"
                frameClassName="aspect-square"
                className="mx-auto max-w-[20rem]"
              />
            </div>
          )}
        </RevealWrapper>
      </Section>

      <Section id="words" label="一路上學到的">
        <RevealWrapper>
          <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2 md:gap-y-14">
            {ABOUT_WORDS.lines.map(({ text, from }, i) => (
              <li key={text} className="md:even:mt-24">
                <div className="font-hand text-amber text-[1.6rem] leading-none" aria-hidden="true">
                  {i + 1}.
                </div>
                <blockquote className="font-display text-txt mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.35] font-medium tracking-[-0.02em]">
                  <Marker draw="view">{text}</Marker>
                </blockquote>
                <p className="font-hand text-faint mt-3 text-[1.2rem] leading-none">— {from}</p>
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </Section>
    </>
  )
}
