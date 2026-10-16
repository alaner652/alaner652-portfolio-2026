import type { MetadataRoute } from 'next'

import { SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { LOCALES, localePath } from '@/i18n/config'
import { getAllPosts } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const base = SITE_CONFIG.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/resume`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/hire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = WORK_ITEMS.map((w) => ({
    url: `${base}/projects/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 每條路由兩個語系，並互相標 hreflang
  return [...staticRoutes, ...projectRoutes, ...postRoutes].flatMap((r) => {
    const path = r.url.slice(base.length) || '/'
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l === 'zh' ? 'zh-Hant' : l, `${base}${localePath(l, path)}`])
    )
    return LOCALES.map((l) => ({
      ...r,
      url: `${base}${localePath(l, path)}`,
      alternates: { languages },
    }))
  })
}
