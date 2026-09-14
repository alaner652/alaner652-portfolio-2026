import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { SkillIcon } from '@/components/common/SkillIcon'
import { Section } from '@/components/layout/Section'
import { SKILLS } from '@/constants'
import { TONE_INK } from '@/lib/tone'
import type { SkillGroup } from '@/types'

const TONE_DOT: Record<SkillGroup['tone'], string> = {
  orange: 'bg-orange-ink',
  gold: 'bg-gold-ink',
  green: 'bg-green-ink',
  blue: 'bg-blue-ink',
  plum: 'bg-plum-ink',
}

/** 一組技能一列：左邊色點 + 分類名 + 數量，右邊是帶 logo 的 chip。
    跟同頁「我是誰」底下的事實列表是同一種版式（mono 小標 + 內容 + 細線），不另外做卡片。 */
function SkillRow({ group }: { group: SkillGroup }) {
  return (
    <div className="grid gap-3 py-5 md:grid-cols-[11rem_1fr] md:gap-8">
      <dt className="flex items-center gap-2 md:pt-1.5">
        <span className={`size-1.5 rounded-full ${TONE_DOT[group.tone]}`} aria-hidden="true" />
        <span className={`font-mono text-xs tracking-[0.04em] ${TONE_INK[group.tone]}`}>
          {group.label}
        </span>
        <span className="text-faint font-mono text-2xs">{group.items.length}</span>
      </dt>
      <dd>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-chip bg-panel-hi text-txt inline-flex items-center gap-2 py-1.5 pr-3 pl-1.5 font-mono text-xs"
            >
              <SkillIcon name={item} />
              {item}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

/** 會的東西：五組技能一組一列，上下各一條線收邊。 */
export function Skills() {
  return (
    <Section id="skills">
      <RevealWrapper>
        <SectionLabel
          title="會的東西"
          note="都是在做過的專案裡真的用過的，不是看過教學就列上來。"
          className="mb-8"
        />
        <dl className="divide-line-soft border-line-soft divide-y border-y">
          {SKILLS.map((group) => (
            <SkillRow key={group.label} group={group} />
          ))}
        </dl>
      </RevealWrapper>
    </Section>
  )
}
