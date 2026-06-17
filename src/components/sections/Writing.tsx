import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { getAllPosts } from '@/lib/mdx'

export function Writing() {
  const posts = getAllPosts()

  return (
    <section id="writing" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Writing</Eyebrow>
            <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
              記錄研究與思考。
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-[14px]">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline gap-[16px] border border-line rounded-[10px] bg-panel px-[22px] py-[18px] transition-[border-color,background] duration-[200ms] hover:border-amber hover:bg-panel-hi flex-wrap"
                >
                  <span className="font-display font-medium text-[1.05rem] text-txt group-hover:text-amber transition-colors duration-[180ms] flex-1 min-w-[200px]">
                    {post.frontmatter.title}
                  </span>
                  <time className="font-mono text-[0.7rem] text-faint shrink-0">
                    {post.frontmatter.date}
                  </time>
                </a>
              ))}
              <a
                href="/blog"
                className="font-mono text-[0.78rem] text-dim hover:text-amber transition-colors duration-[180ms] mt-[4px] inline-flex items-center gap-[6px]"
              >
                All posts →
              </a>
            </div>
          ) : (
            <p className="font-mono text-[0.82rem] text-faint">Posts coming soon.</p>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}
