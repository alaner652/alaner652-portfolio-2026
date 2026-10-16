import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'

import { PrintButton } from '@/components/common/PrintButton'
import { EDUCATION, SITE_CONFIG, SKILLS, WORK_ITEMS } from '@/constants'
import { getPostBySlug } from '@/lib/mdx'

const RESUME_TITLE = '全端工程師 · 資安'
const DESCRIPTION = '吳宸麒 — 全端工程師，專注在資安、自動化與逆向。'

export const metadata: Metadata = {
  title: '履歷',
  description: DESCRIPTION,
  alternates: { canonical: '/resume' },
  openGraph: {
    title: `履歷 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    url: '/resume',
    type: 'profile',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `履歷 | ${SITE_CONFIG.name}`,
    description: DESCRIPTION,
    creator: `@${SITE_CONFIG.handle}`,
  },
}

/* ── 把 resume.mdx 拆成版面要的形狀 ──
   `## 標題` 切段；經歷和專案再用 `### 標題` 切成一條一條，
   每條底下第一行是 meta：經歷是時間（「2026 – 現在」）、專案是技術（「_FastAPI · Next.js_」），
   再往下才是要點。文字只在 MDX 裡維護一份，這裡只決定放哪裡。 */
interface CVSection {
  title: string
  body: string
}
interface CVEntry {
  title: string
  period?: string
  tech?: string[]
  rest: string
}

function splitSections(source: string): CVSection[] {
  const parts = source.split(/^## (.+)$/m)
  const out: CVSection[] = []
  for (let i = 1; i < parts.length; i += 2) {
    out.push({ title: parts[i].trim(), body: parts[i + 1].replace(/^---\s*$/gm, '').trim() })
  }
  return out
}

function splitEntries(body: string): CVEntry[] {
  const parts = body.split(/^### (.+)$/m)
  const out: CVEntry[] = []
  for (let i = 1; i < parts.length; i += 2) {
    const lines = parts[i + 1].trim().split('\n')
    const first = lines[0]?.trim() ?? ''
    const entry: CVEntry = { title: parts[i].trim(), rest: parts[i + 1].trim() }
    if (first && !first.startsWith('-')) {
      const tech = first.match(/^_(.+)_$/)
      if (tech) entry.tech = tech[1].split(' · ')
      else entry.period = first
      entry.rest = lines.slice(1).join('\n').trim()
    }
    out.push(entry)
  }
  return out
}

function CVLink({ href, children }: { href?: string; children?: ReactNode }) {
  const external = href?.startsWith('http')
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
const mdxComponents = { a: CVLink }
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

function Bullets({ source }: { source: string }) {
  return (
    <div className="prose-portfolio prose-cv">
      <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
    </div>
  )
}

/** 專案標題「Agora-AI — 校務 AI 助理」對到 WORK_ITEMS，連去作品頁 */
function caseHref(title: string) {
  const item = WORK_ITEMS.find((w) => title.startsWith(w.title))
  return item ? `/projects/${item.slug}` : undefined
}

/** 區塊標題：mono 小字、橘色、拉開字距 */
function H({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-accent mb-3.5 font-mono text-[11px] tracking-[0.16em] uppercase ${className}`}
    >
      {children}
    </h2>
  )
}

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: '吳宸麒',
    alternateName: ['Wu Chen-Chi', 'alaner652'],
    url: SITE_CONFIG.url,
    email: `mailto:${SITE_CONFIG.email}`,
    sameAs: [
      SITE_CONFIG.github,
      SITE_CONFIG.instagram,
      SITE_CONFIG.threads,
      SITE_CONFIG.linkedin,
    ].filter(Boolean),
    jobTitle: '全端工程師',
    description: DESCRIPTION,
    address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
    knowsAbout: ['Full-Stack Development', 'Security Research', 'Next.js', 'TypeScript', 'Python'],
  },
}

/** 履歷：深色底上一張紙。抬頭（名字／職稱／聯絡）→ 摘要 → 左欄經歷＋專案、右欄技能＋學歷＋工作之外 → 手寫簽名。
    列印時整張紙變白底黑字（globals.css 的 @media print .resume-paper），導覽和按鈕藏起來，連結印出網址。 */
export default function ResumePage() {
  const post = getPostBySlug('resume')
  if (!post) notFound()

  const sections = splitSections(post.content)
  const get = (title: string) => sections.find((s) => s.title === title)
  const summary = get('摘要')?.body ?? ''
  const experience = splitEntries(get('經歷')?.body ?? '')
  const projects = splitEntries(get('專案')?.body ?? '')
  const interests = get('興趣')?.body ?? ''

  return (
    <div className="bg-bg-deep -mb-px print:bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <div className="mx-auto max-w-[1040px] px-3 pt-4 pb-12 md:px-10 md:pt-8 md:pb-24 print:max-w-none print:p-0">
        <div className="mb-3 flex justify-end md:mb-4 print:hidden">
          <PrintButton />
        </div>

        <article className="resume-paper border-line bg-[#14171a] border px-4.5 py-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:px-16 md:py-14 print:border-0 print:p-0 print:shadow-none">
          {/* 抬頭 */}
          <header className="border-text grid gap-4 border-b-2 pb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-6 md:pb-7">
            <div>
              <h1 className="text-text text-[34px] leading-none font-black tracking-[-0.02em] md:text-[52px]">
                吳宸麒{' '}
                <span className="text-text-2 text-[15px] font-medium tracking-normal md:text-2xl">
                  Wu Chen-Chi
                </span>
              </h1>
              <div className="text-accent mt-2.5 text-[15px] font-bold md:mt-3 md:text-[17px]">
                {RESUME_TITLE}
              </div>
            </div>
            <div className="text-text font-mono text-xs leading-[1.9] md:text-right md:text-[12.5px]">
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-accent">
                {SITE_CONFIG.email}
              </a>
              <br />
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                github.com/alaner652
              </a>
              <br />
              <Link href="/" className="hover:text-accent">
                alaner652.com
              </Link>
              <br />
              <span className="text-text-3">台北 · GMT+8</span>
            </div>
          </header>

          {summary && (
            <p className="text-text-body mt-4 text-[14.5px] leading-[1.85] md:mt-6 md:text-base md:leading-[1.9]">
              {summary}
            </p>
          )}

          <div className="mt-7 grid gap-10 md:mt-9 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:gap-12">
            {/* 左欄：經歷、專案 */}
            <div>
              <H>經歷</H>
              {experience.map((e) => (
                <section
                  key={e.title}
                  className="border-line border-t py-3.5 md:py-4.5 print:break-inside-avoid"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-text text-base font-bold md:text-[17px]">{e.title}</h3>
                    {e.period && (
                      <span className="text-text-3 font-mono text-[11px] md:text-xs">
                        {e.period}
                      </span>
                    )}
                  </div>
                  <Bullets source={e.rest} />
                </section>
              ))}

              <H className="mt-7">專案</H>
              {projects.map((e) => {
                const href = caseHref(e.title)
                return (
                  <section
                    key={e.title}
                    className="border-line border-t py-3.5 md:py-4.5 print:break-inside-avoid"
                  >
                    <h3 className="text-text text-base font-bold">
                      {href ? (
                        <Link href={href} className="hover:text-accent transition-colors">
                          {e.title}
                        </Link>
                      ) : (
                        e.title
                      )}
                    </h3>
                    {e.tech && (
                      <div className="text-text-3 mt-0.5 font-mono text-[11px]">
                        {e.tech.join(' · ')}
                      </div>
                    )}
                    <Bullets source={e.rest} />
                  </section>
                )
              })}
            </div>

            {/* 右欄：技能、學歷、工作之外 */}
            <div>
              <H>技能</H>
              <dl className="text-sm leading-[1.75]">
                {SKILLS.map((g) => (
                  <div key={g.label} className="border-line border-t py-2.5">
                    <dt className="text-text-3 font-mono text-[11px]">{g.label}</dt>
                    <dd className="text-text mt-0.5">{g.items.join(' · ')}</dd>
                  </div>
                ))}
              </dl>

              <H className="mt-7">學歷</H>
              {EDUCATION.map((e) => (
                <div key={e.school} className="border-line border-t pt-2.5 text-sm leading-[1.75]">
                  <b className="text-text">{e.school}</b>
                  <br />
                  <span className="text-text">{e.program}</span>
                  <br />
                  <span className="text-text-3 font-mono text-xs">{e.period}</span>
                </div>
              ))}

              {interests && (
                <>
                  <H className="mt-7">工作之外</H>
                  <p className="border-line text-text-body border-t pt-2.5 text-sm leading-[1.8]">
                    {interests}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end md:mt-10">
            <span className="font-hand text-accent inline-block -rotate-3 text-[28px] md:text-[34px]">
              — small R
            </span>
          </div>
        </article>
      </div>
    </div>
  )
}
