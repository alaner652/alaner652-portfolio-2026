import { getDict } from '@/i18n/dict'
import { getAllPosts } from '@/lib/mdx'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Writing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** /blog：標題 + 文章數，底下列最近幾篇的標籤 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).blog
  const posts = getAllPosts()
  const tags = [...new Set(posts.flatMap((p) => p.frontmatter.tags ?? []))]
  return ogImage({
    locale,
    path: '/blog',
    kicker: `03 · ${d.title} · ${posts.length}`,
    title: [d.h1a, d.h1b],
    subtitle: d.description,
    tags: tags.map((t) => `#${t}`),
  })
}
