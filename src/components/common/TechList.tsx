import { SkillIcon } from '@/components/common/SkillIcon'
import SKILL_ICONS from '@/constants/skill-icons.json'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, string> = SKILL_ICONS

/** 作品用到的技術：跟技能區同一組 logo，有 logo 的排前面（技能名稱要跟 SKILLS 一致才對得到），
    沒有的照原順序接在後面、只顯示文字。 */
export function TechList({
  items,
  size = 16,
  className,
}: {
  items: string[]
  size?: number
  className?: string
}) {
  const sorted = [...items.filter((x) => ICON_MAP[x]), ...items.filter((x) => !ICON_MAP[x])]
  return (
    <span className={cn('inline-flex flex-wrap items-center gap-x-3 gap-y-1.5', className)}>
      {sorted.map((name) => (
        <span key={name} className="inline-flex items-center gap-1.5">
          <SkillIcon name={name} size={size} />
          {name}
        </span>
      ))}
    </span>
  )
}
