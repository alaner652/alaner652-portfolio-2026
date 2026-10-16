import type { Metadata } from 'next'

import { PostIndex } from '@/components/sections/PostIndex'
import { getAllPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: '心得分享',
  description: '記錄研究、系統設計、資安與產品開發的思考過程。',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '心得分享 | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    url: '/blog',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'alaner652',
  },
  twitter: {
    card: 'summary_large_image',
    title: '心得分享 | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    creator: '@alaner652',
  },
}

/** 「2026-09-05」→「2026.09」 */
const ym = (d: string) => d.slice(0, 7).replace('-', '.')

/** /blog：像一本刊物的目錄。頁首 VOL. + 篇數和區間、120px 大標、手寫一句；底下交給 PostIndex 篩選分組。 */
export default function BlogPage() {
  const posts = getAllPosts()
  const latest = posts[0]?.frontmatter.date
  const oldest = posts.at(-1)?.frontmatter.date
  // 出現最多的幾個標籤當篩選列
  const freq = new Map<string, number>()
  for (const p of posts)
    for (const t of p.frontmatter.tags ?? []) freq.set(t, (freq.get(t) ?? 0) + 1)
  const tags = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([t]) => t)

  return (
    <>
      <section className="wrap pt-7 md:pt-14">
        <div className="border-line border-b pb-4 md:pb-5">
          <div className="text-text-3 flex justify-between font-mono text-[11px] tracking-[0.1em] md:text-xs">
            <span>VOL. {latest?.slice(0, 4)}</span>
            <span>
              {posts.length} 篇
              {latest && oldest && (
                <span className="hidden md:inline">
                  {' '}
                  · {ym(oldest)} — {ym(latest)}
                </span>
              )}
            </span>
          </div>
          <h1 className="text-text mt-2.5 text-[48px] leading-[1.05] font-black tracking-[-0.04em] md:mt-3.5 md:text-[clamp(64px,8.3vw,120px)] md:leading-none md:tracking-[-0.05em]">
            做過、踩過、
            <br />
            想過的事
          </h1>
          <p className="font-hand text-accent mt-2.5 text-[22px] md:mt-5 md:text-[30px]">
            大多是記錄，不是教學。
          </p>
        </div>
      </section>
      <PostIndex posts={posts} tags={tags} />
    </>
  )
}
