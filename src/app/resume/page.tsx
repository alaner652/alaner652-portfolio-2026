import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'

import { MetricChip } from '@/components/common/MetricChip'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/layout/Section'
import { SkillRow } from '@/components/sections/Skills'
import { EDUCATION, SITE_CONFIG, SKILLS } from '@/constants'
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
  /** 時間，經歷用 */
  period?: string
  /** 技術，專案用，排成 chip */
  tech?: string[]
  /** 剩下的 markdown（要點） */
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

function Prose({ source }: { source: string }) {
  return (
    <div className="prose-portfolio [&>*:last-child]:mb-0">
      <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
    </div>
  )
}

/** 一條：左邊標題 + 手寫的時間，右邊技術 chip 和要點。跟 /about 技能列同一種 3/9 格。 */
function Entry({ entry }: { entry: CVEntry }) {
  return (
    <li className="grid gap-y-3 py-7 md:grid-cols-12 md:gap-x-6 print:break-inside-avoid">
      <div className="md:col-span-4">
        <h3 className="font-display text-txt text-h3 leading-[1.3] font-medium tracking-[-0.015em]">
          {entry.title}
        </h3>
        {entry.period && (
          <p className="font-hand text-faint mt-2 text-[1.2rem] leading-none">{entry.period}</p>
        )}
      </div>
      <div className="md:col-span-8">
        {entry.tech && (
          <div className="mb-3 flex flex-wrap gap-2">
            {entry.tech.map((t) => (
              <MetricChip key={t}>{t}</MetricChip>
            ))}
          </div>
        )}
        <Prose source={entry.rest} />
      </div>
    </li>
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

const CONTACT_LINK =
  'text-dim hover:text-amber inline-flex min-h-11 items-center gap-1 text-sm transition-colors'

/** 履歷。用站上現成的東西拼：PageHeader 當抬頭（名字 + 摘要 + 聯絡方式）、
    每一段一個 Section（虛線 + 手寫段名）、技能用 /about 的 SkillRow、學歷讀 EDUCATION，
    經歷和專案是 resume.mdx 裡的條目，排成 4/8 格。不用 RevealWrapper：列印時不能有還沒淡入的段落。 */
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <PageHeader
        eyebrow="履歷"
        meta={RESUME_TITLE}
        title={
          <>
            吳宸麒{' '}
            <span className="text-dim text-[0.55em] font-normal tracking-normal">Wu Chen-Chi</span>
          </>
        }
        note={summary}
        actions={
          <>
            <a href={`mailto:${SITE_CONFIG.email}`} className={CONTACT_LINK}>
              {SITE_CONFIG.email}
            </a>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className={CONTACT_LINK}
            >
              GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
            <Link href="/" className={CONTACT_LINK}>
              <span className="print:hidden">作品集</span>
              <span className="hidden print:inline">alaner652.com</span>
              <ArrowUpRight size={14} aria-hidden className="print:hidden" />
            </Link>
            <span className="text-faint text-sm">台北 · GMT+8</span>
          </>
        }
      />

      <Section id="experience" label="經歷" wrapClassName="print:py-8">
        <ol className="divide-line-soft border-line-soft divide-y border-y">
          {experience.map((e) => (
            <Entry key={e.title} entry={e} />
          ))}
        </ol>
      </Section>

      <Section id="projects" label="專案" wrapClassName="print:py-8">
        <ol className="divide-line-soft border-line-soft divide-y border-y">
          {projects.map((e) => (
            <Entry key={e.title} entry={e} />
          ))}
        </ol>
      </Section>

      <Section id="skills" label="會的東西" wrapClassName="print:py-8">
        <dl className="divide-line-soft border-line-soft divide-y border-y">
          {SKILLS.map((group) => (
            <SkillRow key={group.label} group={group} />
          ))}
        </dl>
      </Section>

      <Section id="education" label="學歷" wrapClassName="print:py-8">
        <ul className="divide-line-soft border-line-soft divide-y border-y">
          {EDUCATION.map((e) => (
            <li
              key={e.school}
              className="grid gap-y-3 py-7 md:grid-cols-12 md:gap-x-6 print:break-inside-avoid"
            >
              <div className="md:col-span-4">
                <h3 className="font-display text-txt text-h3 leading-[1.3] font-medium tracking-[-0.015em]">
                  {e.school}
                </h3>
                <p className="font-hand text-faint mt-2 text-[1.2rem] leading-none">{e.period}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-txt text-md">{e.program}</p>
                {e.note && <p className="text-dim mt-1 text-base leading-[1.7]">{e.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {interests && (
        <Section id="offduty" label="工作之外" wrapClassName="print:py-8">
          <p className="text-dim max-w-[52ch] text-md leading-[1.7]">{interests}</p>
        </Section>
      )}
    </>
  )
}
