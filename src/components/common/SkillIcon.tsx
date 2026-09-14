import SKILL_ICONS from '@/constants/skill-icons.json'

const ICON_MAP: Record<string, string> = SKILL_ICONS

/** 技能 logo，帶品牌色的圓角小磚。svg 由 scripts/skill-icons.mjs 抓到 public/skill-icons/，
    沒對到 logo 的技能回 null，chip 就只顯示文字。 */
export function SkillIcon({ name }: { name: string }) {
  const slug = ICON_MAP[name]
  if (!slug) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element -- 本地靜態 svg，不需要 next/image 的最佳化
    <img
      src={`/skill-icons/${slug}.svg`}
      alt=""
      aria-hidden
      width={22}
      height={22}
      className="size-[22px] shrink-0 rounded-[5px]"
    />
  )
}
