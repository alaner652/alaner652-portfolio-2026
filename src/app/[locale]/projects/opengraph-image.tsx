import { content } from '@/i18n/content'
import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Work'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** /projects：三張真的產品畫面疊成一疊（GitHub 卡不算） */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).projects
  const items = content(locale).WORK_ITEMS
  const shots = items.filter((w) => w.preview && !w.card).map((w) => w.preview as string)
  const cats = [...new Set(items.map((w) => d.categories[w.category] ?? w.category))]
  return ogImage({
    locale,
    path: '/projects',
    kicker: `02 · ${d.title} · ${items.length}`,
    title: [d.h1a, d.h1b],
    subtitle: d.description,
    stack: shots.slice(0, 3),
    tags: cats,
  })
}
