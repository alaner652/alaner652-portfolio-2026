import { Reveal, RevealItem, itemStagger } from '@/components/motion/Reveal'
import { PostIndex } from '@/components/sections/PostIndex'
import { pageMeta } from '@/i18n/meta'
import { initLocale, t } from '@/i18n/server'
import { getAllPosts } from '@/lib/mdx'

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => pageMeta(locale, 'blog', '/blog', 'website'))
}

/** 「2026-09-05」→「2026.09」 */
const ym = (d: string) => d.slice(0, 7).replace('-', '.')

/** /blog：像一本刊物的目錄。頁首 VOL. + 篇數和區間、120px 大標、手寫一句；底下交給 PostIndex 篩選分組。 */
export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await initLocale(params)
  const d = t().blog
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
        <Reveal load stagger={itemStagger} className="border-line border-b pb-4 md:pb-5">
          <RevealItem
            small
            className="text-text-3 flex justify-between font-mono text-[11px] tracking-[0.1em] md:text-xs"
          >
            <span>
              {d.vol} {latest?.slice(0, 4)}
            </span>
            <span>
              {d.count(posts.length)}
              {latest && oldest && (
                <span className="hidden md:inline">
                  {''}· {ym(oldest)} — {ym(latest)}
                </span>
              )}
            </span>
          </RevealItem>
          <RevealItem small>
            <h1 className="text-text mt-2.5 text-[48px] leading-[1.05] font-black tracking-[-0.04em] md:mt-3.5 md:text-[clamp(64px,8.3vw,120px)] md:leading-none md:tracking-[-0.05em]">
              {d.h1a}
              <br />
              {d.h1b}
            </h1>
          </RevealItem>
          <RevealItem
            small
            as="p"
            className="font-hand text-accent mt-2.5 text-[22px] md:mt-5 md:text-[30px]"
          >
            {d.note}
          </RevealItem>
        </Reveal>
      </section>
      <PostIndex posts={posts} tags={tags} locale={locale} />
    </>
  )
}
