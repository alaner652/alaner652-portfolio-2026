import { content } from '@/i18n/content'
import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Resume'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** /resume：名字當標題，底下一排技能 logo（每組挑前兩個） */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).resume
  const icons = content(locale).SKILLS.flatMap((g) => g.items.slice(0, 2))
  return ogImage({
    locale,
    path: '/resume',
    kicker: `04 · ${d.title}`,
    title: locale === 'zh' ? '吳宸麒 Wu Chen-Chi' : 'Wu Chen-Chi',
    subtitle: d.description,
    icons,
  })
}
