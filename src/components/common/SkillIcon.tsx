import SKILL_ICONS from '@/constants/skill-icons.json'

const ICON_MAP: Record<string, string> = SKILL_ICONS

/** 技能 logo，帶品牌色的圓角小磚。svg 由 scripts/skill-icons.mjs 抓到 public/skill-icons/，
    沒對到 logo 的技能回 null，chip 就只顯示文字。size 是 px，chip 用預設 22，首頁跑馬燈放大。 */
export function SkillIcon({ name, size = 22 }: { name: string; size?: number }) {
  const slug = ICON_MAP[name]
  if (!slug) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element -- 本地靜態 svg，不需要 next/image 的最佳化
    <img
      src={`/skill-icons/${slug}.svg`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: size * 0.22 }}
      className="shrink-0"
    />
  )
}
