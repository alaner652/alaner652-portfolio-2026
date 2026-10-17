import GithubSlugger from 'github-slugger'
import { LLink as Link } from '@/i18n/client'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { isValidElement, type ReactNode } from 'react'
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
import { Reveal, RevealItem, itemStagger } from '@/components/motion/Reveal'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { TaskList } from '@/components/common/TaskList'
import { Toc, TocMobile, type TocHeading } from '@/components/common/Toc'
import { SITE_CONFIG } from '@/constants'
import { hasLocale, localePath } from '@/i18n/config'
import { languages } from '@/i18n/meta'
import { initLocale, t } from '@/i18n/server'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types'

/** 程式碼區塊：mermaid 交給 Mermaid；其他的每行包一個 span 讓 CSS 畫行號，外面套 MacWindow（語言 + 複製）。 */
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
    const body =
      typeof code === 'string' ? (
        <code className={className}>
          {code
            .replace(/\n$/, '')
            .split('\n')
            .map((line, i) => (
              <span key={i} className="code-line">
                {line}
                {'\n'}
              </span>
            ))}
        </code>
      ) : (
        children
      )
    return (
      <MacWindow title={lang}>
        <pre>{body}</pre>
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

/** 相關文章：共同標籤最多的前兩篇。 */
function related(all: BlogPost[], slug: string, tags: string[] = []) {
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, n: (p.frontmatter.tags ?? []).filter((t) => tags.includes(t)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 2)
    .map((x) => x.p)
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug, locale } = await params
  const l = hasLocale(locale) ? locale : 'zh'
  const post = getPostBySlug(slug, l)
  if (!post || post.frontmatter.hidden) return {}
  const path = `/blog/${slug}`
  const canonicalUrl = localePath(l, path)
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    alternates: { canonical: canonicalUrl, languages: languages(path) },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      siteName: SITE_CONFIG.name,
      locale: l === 'en' ? 'en_US' : 'zh_TW',
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const locale = await initLocale(params)
  const d = t().blog
  const { slug } = await params
  const post = getPostBySlug(slug, locale)
  // hidden 文章有自己的路由（例如 resume.mdx → /resume），不從 /blog 再曝光一次
  if (!post || post.frontmatter.hidden) notFound()

  const headings = extractHeadings(post.content)
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)
  // 列表新的在前：上一篇是更早寫的，下一篇是更新的
  const older = index >= 0 ? posts[index + 1] : undefined
  const newer = index > 0 ? posts[index - 1] : undefined

  const mdxComponents = {
    TaskList,
    Mermaid,
    MacWindow,
    pre: Pre,
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
    keywords: post.frontmatter.tags?.join(','),
    inLanguage: 'zh-Hant-TW',
    image: `${SITE_CONFIG.url}/blog/${slug}/opengraph-image`,
  }

  const next = newer ?? older
  const nextLabel = newer ? d.next : d.prev
  const rel = related(posts, slug, post.frontmatter.tags)
  const [y, m] = post.frontmatter.date.split('-')
  const dotDate = post.frontmatter.date.replaceAll('-', '.')

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* 頁首：置中。麵包屑 / 第一個標籤、標題、日期 · 分鐘 · 標籤。三層錯開進場，正文不動 */}
      <Reveal
        load
        stagger={itemStagger}
        as="header"
        className="mx-auto max-w-[880px] px-5 pt-10 pb-8 text-center md:px-10 md:pt-20 md:pb-14"
      >
        <RevealItem small className="text-text-3 font-mono text-xs md:text-[13px]">
          <Link href="/blog" className="hover:text-text transition-colors">
            {d.title}
          </Link>
          {post.frontmatter.tags?.[0] && <> / #{post.frontmatter.tags[0]}</>}
        </RevealItem>
        <RevealItem small>
          <h1 className="text-text mt-3.5 text-[32px] leading-[1.35] font-black text-balance md:mt-6 md:text-[clamp(40px,4vw,56px)] md:leading-[1.3] md:tracking-[-0.02em]">
            {post.frontmatter.title}
          </h1>
        </RevealItem>
        <RevealItem
          small
          className="text-text-3 mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono text-xs md:mt-7 md:text-[13px]"
        >
          <time dateTime={post.frontmatter.date}>{dotDate}</time>
          <span>{d.minutes(post.readingMinutes)}</span>
          {post.frontmatter.tags && (
            <span>{post.frontmatter.tags.map((t) => `#${t}`).join(' ')}</span>
          )}
        </RevealItem>
        {locale === 'en' && post.lang === 'zh' && (
          <p className="text-text-3 mt-4 text-[13px]">{d.zhOnly}</p>
        )}
      </Reveal>

      {/* 內文：寬螢幕三欄，文章在正中間、目錄 + 相關靠右，左欄留空讓文章置中；
          窄螢幕只剩文章，目錄改成底部膠囊 */}
      <div className="wrap grid grid-cols-1 gap-x-10 pb-12 md:pb-20 xl:grid-cols-[minmax(240px,1fr)_minmax(0,760px)_minmax(240px,1fr)]">
        <div
          id="post-body"
          className={cn(
            'min-w-0',
            post.frontmatter.wide ? 'md:max-w-[60rem]' : 'md:max-w-[46rem]',
            'md:mx-auto xl:col-start-2 xl:mx-0 xl:max-w-none'
          )}
        >
          <div className="prose-portfolio">
            <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
          </div>
          <p className="font-hand text-accent mt-8 text-right text-[24px] md:mt-10 md:text-[28px]">
            {d.signature}, {y}.{m}
          </p>
        </div>
        {/* 目錄 + 閱讀進度（取代原本頁首那條 3px 橘線）：桌機黏在右欄，手機是底部浮起來的膠囊 */}
        {/* 寬度跟著右欄走，不另外寫死：比欄寬的話 Safari 會往右溢出、被 body 的 overflow-x 切掉 */}
        <aside className="hidden min-w-0 xl:col-start-3 xl:block">
          <div className="sticky top-28">
            <Toc headings={headings} minutes={post.readingMinutes} />
            {rel.length > 0 && (
              <div className="border-line text-text-3 mt-8 border-t pt-4 font-mono text-xs leading-[2]">
                {d.related}
                {rel.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="text-text-2 hover:text-text block transition-colors"
                  >
                    → {r.frontmatter.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>
        <TocMobile headings={headings} minutes={post.readingMinutes} />
      </div>

      {next && (
        <Link href={`/blog/${next.slug}`} className="group/next border-line block border-y">
          <div className="wrap flex items-end justify-between gap-6 py-6 md:py-10">
            <div>
              <div className="text-text-3 font-mono text-[11px] md:text-[13px]">
                {nextLabel} / {next.frontmatter.date.replaceAll('-', '.')}
              </div>
              <div className="text-text group-hover/next:text-accent mt-1.5 text-[22px] leading-[1.4] font-black md:mt-2.5 md:text-[clamp(28px,3.3vw,48px)] md:leading-[1.2] transition-colors">
                {next.frontmatter.title}
              </div>
            </div>
            <span
              className="text-accent hidden text-[56px] leading-none md:block"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      )}
    </article>
  )
}
