import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { Eyebrow } from '@/components/common/Eyebrow'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="max-w-[720px] mx-auto px-6 py-[72px]">
      <div className="mb-[48px]">
        <a
          href="/blog"
          className="font-mono text-[0.78rem] text-faint hover:text-dim transition-colors duration-[180ms] inline-flex items-center gap-[6px] mb-[32px]"
        >
          ← All posts
        </a>
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
        <MDXRemote source={post.content} />
      </div>
    </div>
  )
}
