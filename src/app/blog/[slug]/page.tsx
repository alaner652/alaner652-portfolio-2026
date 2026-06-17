import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { Eyebrow } from '@/components/common/Eyebrow'
import { TaskList } from '@/components/common/TaskList'
import { Mermaid } from '@/components/common/Mermaid'
import { SITE_CONFIG } from '@/constants'

import { isValidElement, type ReactNode } from 'react'
import { Card } from '@/components/common/Card'
import { Columns } from '@/components/common/Columns'
import { Stack } from '@/components/common/Stack'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'

function Pre({ children }: { children: ReactNode }) {
  if (isValidElement(children)) {
    const { className, children: code } = children.props as { className?: string; children?: unknown }
    if (className === 'language-mermaid' && typeof code === 'string') {
      return <Mermaid chart={code} />
    }
  }
  return <pre>{children}</pre>
}

const mdxComponents = { TaskList, Mermaid, pre: Pre, Card, Columns, Stack, Eyebrow, MetricChip, RevealWrapper }
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const canonicalUrl = `/blog/${slug}`
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.frontmatter.date,
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
  if (!post) notFound()

  const maxWidth = post.frontmatter.wide ? 'max-w-[900px]' : 'max-w-[720px]'

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
    <div className={`${maxWidth} mx-auto px-6 py-[72px]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mb-[48px]">
        <Link
          href="/blog"
          className="font-mono text-[0.78rem] text-faint hover:text-dim transition-colors duration-[180ms] flex w-fit items-center gap-[6px] mb-[32px]"
        >
          ← All posts
        </Link>
        <Eyebrow>Writing</Eyebrow>
        <h1 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.4rem)] tracking-[-0.02em] mt-[12px] leading-[1.1]">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-[16px] mt-[16px] flex-wrap">
          <time className="font-mono text-[0.72rem] text-faint">{post.frontmatter.date}</time>
          {post.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.66rem] text-faint border border-line-soft px-[8px] py-[3px] rounded-[5px]"
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
