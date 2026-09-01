import { Globe, GitFork, MapPin, Mail, GraduationCap, Briefcase, FolderOpen, Cpu, UserRound, Heart } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'

import { ResumeExport } from '@/components/common/ResumeExport'
import { SITE_CONFIG } from '@/constants'
import { getPostBySlug } from '@/lib/mdx'

const RESUME_TITLE = '全端工程師 · 資安'
const RESUME_EMAIL = SITE_CONFIG.email

export const metadata: Metadata = {
  title: '履歷',
  description: '吳宸麒 — 全端工程師，專注在資安、自動化與逆向。目前在找實習。',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: `履歷 | ${SITE_CONFIG.name}`,
    description: '吳宸麒 — 全端工程師，專注在資安、自動化與逆向。目前在找實習。',
    url: '/resume',
    type: 'profile',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `履歷 | ${SITE_CONFIG.name}`,
    description: '吳宸麒 — 全端工程師，專注在資安、自動化與逆向。目前在找實習。',
    creator: `@${SITE_CONFIG.handle}`,
  },
}

const SECTION_ICONS: Record<string, ReactNode> = {
  摘要: <UserRound size={17} className="text-amber" />,
  技能: <Cpu size={17} className="text-amber" />,
  學歷: <GraduationCap size={17} className="text-amber" />,
  經歷: <Briefcase size={17} className="text-amber" />,
  專案: <FolderOpen size={17} className="text-amber" />,
  興趣: <Heart size={17} className="text-amber" />,
}

function CVHeading({ children }: { children?: ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  const icon = SECTION_ICONS[text]
  return (
    <h2 className="font-display text-txt mt-[2.2em] mb-[0.7em] flex items-center gap-2 text-h3 font-medium tracking-[-0.015em]">
      {icon}
      {children}
    </h2>
  )
}

function CVLink({ href, children }: { href?: string; children?: ReactNode }) {
  const external = href?.startsWith('http')
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

const mdxComponents = { h2: CVHeading, a: CVLink }
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: '吳宸麒',
    alternateName: ['Wu Chen-Chi', 'alaner652'],
    url: SITE_CONFIG.url,
    email: `mailto:${SITE_CONFIG.email}`,
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin].filter(Boolean),
    jobTitle: '全端工程師',
    description: '吳宸麒 — 全端工程師，專注在資安、自動化與逆向。目前在找實習。',
    address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
    knowsAbout: ['Full-Stack Development', 'Security Research', 'Next.js', 'TypeScript', 'Python'],
  },
}

export default function ResumePage() {
  const post = getPostBySlug('resume')
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-225 px-6 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-h1 leading-[1.1] font-medium tracking-[-0.02em]">
            吳宸麒{' '}
            <span className="text-dim align-middle text-[0.62em] font-normal tracking-normal">
              Wu Chen-Chi
            </span>
          </h1>
          <p className="text-dim mt-2 text-base tracking-[0.01em]">
            {RESUME_TITLE}
          </p>
        </div>
        <div className="text-dim flex flex-wrap items-center gap-4 pt-1 text-sm">
          <ResumeExport
            name="吳宸麒"
            nameEn="Wu Chen-Chi"
            title={RESUME_TITLE}
            email={RESUME_EMAIL}
            url={SITE_CONFIG.url}
            github={SITE_CONFIG.github}
            location="台北"
          />
          <a
            href={`mailto:${RESUME_EMAIL}`}
            className="hover:text-amber flex items-center gap-1.5 transition-colors"
          >
            <Mail size={13} />
            信箱
          </a>
          <Link
            href="/"
            className="hover:text-amber flex items-center gap-1.5 transition-colors"
          >
            <Globe size={13} />
            作品集
          </Link>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber flex items-center gap-1.5 transition-colors"
          >
            <GitFork size={13} />
            GitHub
          </a>
          <span className="text-faint flex items-center gap-1.5">
            <MapPin size={13} />
            台北
          </span>
        </div>
      </div>

      <div className="prose-portfolio">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  )
}
