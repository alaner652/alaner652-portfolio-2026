import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { ABOUT_WHO, ABOUT_WORDS, EDUCATION, EXPERIENCE, SITE_CONFIG } from '@/constants'

/** 兩張卡共用的外殼：mono 小標當卡片標題，內容自己排。 */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="bg-panel border-line-soft rounded-card flex flex-col border p-6 md:p-8">
      <h3 className="text-faint mb-5 font-mono text-xs tracking-[0.08em]">{title}</h3>
      {children}
    </article>
  )
}

/** 幾行可核對的事實。全部從 constants 讀，這裡不另外維護一份。 */
function Facts() {
  const job = EXPERIENCE[0]
  const school = EDUCATION[0]
  const rows = [
    { label: '名字', value: '吳宸麒' },
    { label: '網路上', value: `${SITE_CONFIG.handle} · small R` },
    { label: '所在', value: `${SITE_CONFIG.location} · ${SITE_CONFIG.timezone}` },
    { label: '在讀', value: `${school.school} ${school.program}` },
    { label: '在做', value: `${job.org} · ${job.role}` },
  ]

  return (
    <dl className="divide-line-soft border-line-soft mt-auto divide-y border-t pt-2">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex gap-4 py-2.5">
          <dt className="text-faint w-14 shrink-0 font-mono text-2xs tracking-[0.06em]">{label}</dt>
          <dd className="text-txt min-w-0 text-sm leading-[1.6]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** 關於我：兩張卡並排——左邊「我是誰」（一段自介 + 幾行事實），右邊「我想說的」
    （一段開場 + 幾句一路上學到的話，每句都標出處）。手機上下疊。 */
export function About() {
  return (
    <Section id="about">
      <RevealWrapper>
        <SectionLabel title="關於我" className="mb-8" />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <Card title="我是誰">
            <p className="text-txt text-md leading-[1.85]">{ABOUT_WHO}</p>
            <div className="pt-6">
              <Facts />
            </div>
          </Card>

          <Card title="我想說的">
            <p className="text-txt text-md leading-[1.85]">{ABOUT_WORDS.lead}</p>
            <ul className="divide-line-soft border-line-soft mt-auto divide-y border-t pt-2">
              {ABOUT_WORDS.lines.map(({ text, from }) => (
                <li key={text} className="py-3">
                  <p className="font-display text-txt text-base font-medium tracking-[-0.01em]">
                    {text}
                  </p>
                  <p className="text-faint mt-1 font-mono text-2xs tracking-[0.04em]">— {from}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </RevealWrapper>
    </Section>
  )
}
