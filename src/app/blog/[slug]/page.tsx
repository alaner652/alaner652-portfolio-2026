import Link from 'next/link'
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
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { TaskList } from '@/components/common/TaskList'
import { SITE_CONFIG } from '@/constants'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'

function Pre({ children }: { children: ReactNode }) {
  if (isValidElement(children)) {
    const { className, children: code } = children.props as { className?: string; children?: unknown }
    if (className === 'language-mermaid' && typeof code === 'string') {
      return <Mermaid chart={code} />
    }
    const lang = typeof className === 'string' && className.startsWith('language-')
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

const mdxComponents = { TaskList, Mermaid, MacWindow, pre: Pre, Card, Columns, Eyebrow, MetricChip, RevealWrapper }
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

  const maxWidth = post.frontmatter.wide ? 'max-w-225' : 'max-w-180'

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
    <div className={`${maxWidth} mx-auto px-6 py-12 md:py-18`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mb-12">
        <Link
          href="/blog"
          className="text-faint hover:text-amber mb-8 flex w-fit items-center gap-1.5 font-mono text-xs transition-colors duration-180"
        >
          ← All posts
        </Link>
        <Eyebrow>心得分享</Eyebrow>
        <h1 className="font-display mt-3 text-h1 leading-[1.15] font-medium tracking-[-0.02em]">
          {post.frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <time className="text-faint font-mono text-2xs">{post.frontmatter.date}</time>
          {post.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="text-dim bg-panel-hi border-line-soft rounded-[5px] border px-2.25 py-0.75 font-mono text-2xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose-portfolio">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  )
}
