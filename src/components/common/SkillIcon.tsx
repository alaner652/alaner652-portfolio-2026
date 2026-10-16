import SKILL_ICONS from '@/constants/skill-icons.json'

const ICON_MAP: Record<string, string> = SKILL_ICONS

/** 技能 logo，帶品牌色的圓角小磚。svg 由 scripts/skill-icons.mjs 抓到 public/skill-icons/，
    沒對到 logo 的技能回 null，chip 就只顯示文字。size 是 px，chip 用預設 22，首頁跑馬燈放大。 */
export function SkillIcon({
  name,
  size = 22,
  className = '',
}: {
  name: string
  size?: number
  className?: string
}) {
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
      // 小磚底色 #242938 跟頁面暗底太接近，描一圈淡白邊，磚的輪廓才看得出來
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
      }}
      className={`shrink-0 ${className}`}
    />
  )
}
