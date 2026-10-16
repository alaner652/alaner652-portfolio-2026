import { content } from '@/i18n/content'
import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Hire'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** /hire：主標 + 接案一句話，底下列五種案型 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).hire
  const hire = content(locale).HIRE
  return ogImage({
    locale,
    path: '/hire',
    kicker: `05 · ${d.title}`,
    // 跟頁面上一樣斷成兩行；英文的片段之間要補空格，中文不用
    title: [d.h1a, [d.h1b, d.h1c].join(locale === 'en' ? ' ' : '') + d.h1d],
    subtitle: hire.lead,
    tags: hire.services.map((s) => s.label),
  })
}
