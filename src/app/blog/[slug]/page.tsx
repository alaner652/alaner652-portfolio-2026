import GithubSlugger from 'github-slugger'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { PluggableList } from 'unified'

import { Card } from '@/components/common/Card'
import { Columns } from '@/components/common/Columns'
import { Eyebrow } from '@/components/common/Eyebrow'
import { MacWindow } from '@/components/common/MacWindow'
import { Mermaid } from '@/components/common/Mermaid'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { TaskList } from '@/components/common/TaskList'
import { Toc, type TocHeading } from '@/components/common/Toc'
import { SITE_CONFIG } from '@/constants'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types'

function Pre({ children }: { children: ReactNode }) {
  if (isValidElement(children)) {
    const { className, children: code } = children.props as {
      className?: string
      children?: unknown
    }
    if (className === 'language-mermaid' && typeof code === 'string') {
      return <Mermaid chart={code} />
    }
    const lang =
      typeof className === 'string' && className.startsWith('language-')
        ? className.slice(9)
        : undefined
    return (
      <MacWindow title={lang}>
        <pre>{children}</pre>
      </MacWindow>
    )
  }
  return <pre>{children}</pre>
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // 標題自動產生 id 並掛上錨點，長文才能建目錄與深連結
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'heading-anchor' } }],
    ] as PluggableList,
  },
}

/** 從 MDX 原始碼撈 h2 當目錄。slug 用跟 rehype-slug 同一套 github-slugger，id 才對得上；
    先把程式碼區塊拿掉，不然 log 裡的 ## 會被當成標題。 */
function extractHeadings(content: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const text = content.replace(/```[\s\S]*?```/g, '')
  const headings: TocHeading[] = []
  for (const match of text.matchAll(/^## +(.+?)\s*$/gm)) {
    const heading = match[1].replace(/[`*_]/g, '')
    headings.push({ id: slugger.slug(heading), text: heading })
  }
  return headings
}

/** 文章結尾的上一篇／下一篇：兩個虛線框。 */
function ReadNext({
  post,
  dir,
  className,
}: {
  post: BlogPost
  dir: 'prev' | 'next'
  className?: string
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group/rn border-line hover:border-amber rounded-card block border border-dashed px-5 py-4 transition-colors',
        dir === 'next' && 'text-right',
        className
      )}
    >
      <span className="font-hand text-faint text-[1.2rem] leading-none">
        {dir === 'prev' ? '← 上一篇' : '下一篇 →'}
      </span>
      <span className="font-display group-hover/rn:text-amber text-md mt-2 block leading-[1.35] font-medium tracking-[-0.01em] transition-colors">
        {post.frontmatter.title}
      </span>
    </Link>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.frontmatter.hidden) return {}
  const canonicalUrl = `/blog/${slug}`
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      siteName: SITE_CONFIG.name,
      locale: 'zh_TW',
      authors: [SITE_CONFIG.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      creator: `@${SITE_CONFIG.handle}`,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  // hidden 文章有自己的路由（例如 resume.mdx → /resume），不從 /blog 再曝光一次
  if (!post || post.frontmatter.hidden) notFound()

  const headings = extractHeadings(post.content)
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)
  // 列表新的在前：上一篇是更早寫的，下一篇是更新的
  const older = index >= 0 ? posts[index + 1] : undefined
  const newer = index > 0 ? posts[index - 1] : undefined

  // h2 前面一個手寫的章節編號（照目錄的順序，用 id 對照），只在寬螢幕有左欄的時候露出（放在內文欄外面）
  const sectionNo = new Map(headings.map((h, i) => [h.id, String(i + 1).padStart(2, '0')]))
  const H2 = ({ children, ...props }: ComponentProps<'h2'>) => {
    const n = props.id ? sectionNo.get(props.id) : undefined
    return (
      <h2 {...props} className="relative">
        {n && (
          <span
            className="font-hand text-amber absolute top-[0.1em] -left-[2.4em] text-[1.1em] leading-none max-xl:hidden"
            aria-hidden="true"
          >
            {n}
          </span>
        )}
        {children}
      </h2>
    )
  }
  const mdxComponents = {
    TaskList,
    Mermaid,
    MacWindow,
    pre: Pre,
    h2: H2,
    Card,
    Columns,
    Eyebrow,
    MetricChip,
    RevealWrapper,
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: { '@type': 'Person', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    publisher: { '@type': 'Person', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    keywords: post.frontmatter.tags?.join(', '),
    inLanguage: 'zh-Hant-TW',
    image: `${SITE_CONFIG.url}/blog/${slug}/opengraph-image`,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* 最上緣一條橘線，跟著整頁捲動長 */}
      <div className="progress" aria-hidden="true" />

      {/* 頁首：標題撐 9 欄；右邊日期印章、讀多久、標籤 */}
      <header className="mx-auto max-w-[77rem] px-6 pt-12 md:pt-16">
        <div className="border-line-soft grid gap-x-6 gap-y-8 border-b pb-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-9">
            <Link
              href="/blog"
              className="text-faint hover:text-amber flex min-h-11 w-fit items-center gap-1.5 font-mono text-xs transition-colors"
            >
              <ArrowLeft size={14} aria-hidden />
              全部文章
            </Link>
            <p className="font-hand text-dim mt-7 text-[1.6rem] leading-none md:text-[1.85rem]">
              心得分享 —
            </p>
            <h1 className="font-display text-h1 mt-4 max-w-[18em] leading-[1.12] font-medium tracking-[-0.02em]">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.description && (
              <p className="text-dim text-lead mt-5 max-w-[40em] leading-[1.7]">
                {post.frontmatter.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
            <span className="stamp text-amber-text inline-flex rotate-6 flex-col items-center gap-1 px-3 py-2">
              <b className="font-display text-[1.05rem] font-bold tracking-[-0.02em]">
                <time>{post.frontmatter.date}</time>
              </b>
              <small className="text-[0.62rem] tracking-[0.16em]">TAIPEI</small>
            </span>
            <span className="font-hand text-faint text-[1.25rem] leading-none">
              {post.readingMinutes} 分鐘，慢慢看
            </span>
            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2 md:justify-end">
                {post.frontmatter.tags.map((tag) => (
                  <MetricChip key={tag}>{tag}</MetricChip>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 內文：寬螢幕三欄——左邊黏著的目錄、中間 720 的文章、右邊留白；窄螢幕只剩文章 */}
      <div className="mx-auto max-w-[77rem] px-6 pt-12 pb-14 md:pb-20 xl:grid xl:grid-cols-[200px_minmax(0,720px)_220px] xl:justify-center xl:gap-x-12">
        <aside className="hidden xl:block">
          <Toc headings={headings} />
        </aside>
        <div
          className={cn(
            'mx-auto xl:mx-0 xl:max-w-none',
            post.frontmatter.wide ? 'max-w-225' : 'max-w-180'
          )}
        >
          <div className="prose-portfolio">
            <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
          </div>

          <footer className="border-line mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed pt-7">
            <div className="flex items-center gap-4">
              <span
                className="font-hand text-txt inline-flex -rotate-6 items-center justify-center rounded-[4px] border-2 border-current px-2 py-1 text-[1.4rem] leading-none"
                aria-hidden="true"
              >
                完
              </span>
              <span className="font-hand text-faint text-[1.3rem] leading-none">
                寫於 {post.frontmatter.date}，台北
              </span>
            </div>
          </footer>
          {(older || newer) && (
            <nav aria-label="上一篇與下一篇" className="mt-7 grid gap-4 sm:grid-cols-2">
              {older && <ReadNext post={older} dir="prev" />}
              {newer && (
                <ReadNext
                  post={newer}
                  dir="next"
                  className={older ? undefined : 'sm:col-start-2'}
                />
              )}
            </nav>
          )}
        </div>
        <div className="hidden xl:block" aria-hidden="true" />
      </div>
    </article>
  )
}
