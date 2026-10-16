import { getDict } from '@/i18n/dict'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

/** 單篇文章：文章標題 + 描述，kicker 放日期與閱讀時間，底下列標籤 */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const locale = await ogLocale(params)
  const { slug } = await params
  const d = getDict(locale).blog
  const post = getPostBySlug(slug, locale)
  const fm = post?.frontmatter
  return ogImage({
    locale,
    path: `/blog/${slug}`,
    kicker: [d.title, fm?.date, post ? d.minutes(post.readingMinutes) : null]
      .filter(Boolean)
      .join(' · '),
    title: fm?.title ?? d.title,
    subtitle: fm?.description,
    tags: (fm?.tags ?? []).map((t) => `#${t}`),
  })
}
