import { WORK_ITEMS } from '@/constants'
import { content } from '@/i18n/content'
import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Project'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return WORK_ITEMS.map((w) => ({ slug: w.slug }))
}

/** 作品詳情：封面 + 作品名 + 一句結果 + 用到的技術 logo */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const locale = await ogLocale(params)
  const { slug } = await params
  const d = getDict(locale).projects
  const item =
    content(locale).WORK_ITEMS.find((w) => w.slug === slug) ?? content(locale).WORK_ITEMS[0]
  return ogImage({
    locale,
    path: `/projects/${item.slug}`,
    kicker: `${d.title} · ${d.categories[item.category] ?? item.category} · ${item.status}`,
    title: item.title,
    subtitle: item.result ?? item.description,
    image: item.preview && !item.card ? { src: item.preview, shape: 'wide' } : undefined,
    icons: item.metrics,
    tags: item.metrics,
  })
}
