import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { OFFERS } from '@/constants'
import { TONE_CHIP, TONE_INK } from '@/lib/tone'

export function About() {
  return (
    <Section id="about">
      <RevealWrapper>
        <SectionLabel title="關於" className="mb-10" />

        {/* 三條能力主張，各配一個圖示並排。圖示只是視覺錨點，語意在文字上，所以 aria-hidden。
            桌機是三短欄，各自置中才像一組；手機併回單欄、文字變長，就回到靠左比較好讀。 */}
        <dl className="grid gap-8 sm:grid-cols-3 sm:gap-10 sm:text-center">
          {OFFERS.map(({ label, description, tone, icon: Icon }) => (
            <div key={label}>
              <dt className="mb-3">
                <span
                  className={`rounded-card flex size-10 items-center justify-center sm:mx-auto ${TONE_CHIP[tone]}`}
                >
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span
                  className={`mt-3 block font-mono text-xs tracking-[0.04em] ${TONE_INK[tone]}`}
                >
                  {label}
                </span>
              </dt>
              <dd className="text-dim text-base leading-[1.65]">{description}</dd>
            </div>
          ))}
        </dl>
      </RevealWrapper>
    </Section>
  )
}
