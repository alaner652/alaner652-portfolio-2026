import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SkillIcon } from '@/components/common/SkillIcon'
import { Section } from '@/components/layout/Section'
import { SKILLS } from '@/constants'
import type { SkillGroup } from '@/types'

/** 一組技能一列：左邊手寫的分類名，右邊是帶 logo 的 chip。/resume 也拿這個排技能。 */
export function SkillRow({ group }: { group: SkillGroup }) {
  return (
    <div className="grid gap-3 py-5 md:grid-cols-12 md:gap-6">
      <dt className="font-hand text-txt text-[1.35rem] leading-none md:col-span-3 md:pt-1">
        {group.label}
        <span className="text-faint ml-2 text-[1rem]">{group.items.length}</span>
      </dt>
      <dd className="md:col-span-9">
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-chip bg-panel-hi text-txt hover:bg-amber-soft inline-flex items-center gap-2 py-1.5 pr-3 pl-1.5 font-mono text-xs transition-colors"
            >
              <SkillIcon
                name={item}
                className="grayscale transition-[filter] duration-300 motion-reduce:transition-none [li:hover_&]:grayscale-0"
              />
              {item}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

/** 會的東西：五組技能一組一列。 */
export function Skills() {
  return (
    <Section id="skills" label="會的東西">
      <RevealWrapper>
        <dl className="divide-line-soft border-line-soft divide-y border-y">
          {SKILLS.map((group) => (
            <SkillRow key={group.label} group={group} />
          ))}
        </dl>
      </RevealWrapper>
    </Section>
  )
}
