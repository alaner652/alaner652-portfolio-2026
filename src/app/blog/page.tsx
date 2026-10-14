import type { Metadata } from 'next'
import Link from 'next/link'

import { MetricChip } from '@/components/common/MetricChip'
import { PageHeader } from '@/components/common/PageHeader'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { Section } from '@/components/layout/Section'
import { getAllPosts } from '@/lib/mdx'
import type { BlogPost } from '@/types'

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

const MONTHS = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

/** 照「年-月」分組，順序跟 getAllPosts 一樣新的在前。 */
function groupByMonth(posts: BlogPost[]) {
  const groups: {
    key: string
    year: string
    month: string
    posts: { post: BlogPost; number: number }[]
  }[] = []
  let number = 0
  for (const post of posts) {
    number += 1
    const [year, month] = post.frontmatter.date.split('-')
    const key = `${year}-${month}`
    let group = groups.find((g) => g.key === key)
    if (!group) {
      group = { key, year, month: MONTHS[Number(month) - 1] ?? month, posts: [] }
      groups.push(group)
    }
    group.posts.push({ post, number })
  }
  return groups
}

/** 標籤一律中性色。顏色在這個站上是「分類」的編碼，而文章標籤有幾十個，
    每個都給一個顏色就只是雜訊。 */
function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <MetricChip key={tag}>{tag}</MetricChip>
      ))}
    </div>
  )
}

/** 目錄的一列：空心編號（整列滑過去填橘）、標題、一排點點牽到日期和閱讀時間，底下標籤。 */
function Row({ post, number }: { post: BlogPost; number: number }) {
  const [, month, day] = post.frontmatter.date.split('-')
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group/row grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-x-4 py-6 md:grid-cols-[4.5rem_minmax(0,1fr)] md:py-7"
      >
        <span
          className="ghost font-display text-[1.75rem] leading-none font-bold tracking-[-0.03em] tabular-nums md:text-[2.25rem]"
          aria-hidden="true"
        >
          {String(number).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:flex-nowrap">
            <h2 className="font-display group-hover/row:text-amber text-h3 leading-[1.3] font-medium tracking-[-0.015em] transition-colors">
              {post.frontmatter.title}
            </h2>
            <span
              className="border-line hidden min-w-10 flex-1 -translate-y-[0.35em] border-b-2 border-dotted md:block"
              aria-hidden="true"
            />
            <span className="font-hand text-faint shrink-0 text-[1.2rem] leading-none">
              {month}-{day} · {post.readingMinutes} 分
            </span>
          </div>
          <div className="mt-3">
            <Tags tags={post.frontmatter.tags} />
          </div>
        </div>
      </Link>
    </li>
  )
}

/** /blog：一張目錄，照月份分組，左邊手寫月份，新的在上面。最新那篇不另外放大，首頁已經露過了。 */
export default function BlogPage() {
  const posts = getAllPosts()
  const groups = groupByMonth(posts)

  return (
    <>
      <PageHeader
        eyebrow="心得分享"
        title="做過、踩過、想過的事"
        note="大多是記錄，不是教學。"
        meta={posts.length ? `${posts.length} 篇` : undefined}
      />
      {posts.length === 0 ? (
        <Section id="posts" label="文章">
          <p className="text-dim font-mono text-sm">No posts yet.</p>
        </Section>
      ) : (
        <>
          <Section id="posts" label="全部">
            {groups.map((group, gi) => (
              <RevealWrapper
                key={group.key}
                className={`grid gap-y-2 md:grid-cols-12 md:gap-x-6 ${gi === 0 ? '' : 'border-line mt-6 border-t border-dashed pt-6'}`}
              >
                <div className="md:col-span-2 md:pt-7">
                  <div className="font-hand text-dim text-[1.85rem] leading-none">
                    {group.month}
                  </div>
                  <div className="font-hand text-faint mt-2 text-[1.1rem] leading-none">
                    {group.year}
                  </div>
                </div>
                <ol className="divide-line-soft divide-y md:col-span-10">
                  {group.posts.map(({ post, number }) => (
                    <Row key={post.slug} post={post} number={number} />
                  ))}
                </ol>
              </RevealWrapper>
            ))}
          </Section>
        </>
      )}
    </>
  )
}
