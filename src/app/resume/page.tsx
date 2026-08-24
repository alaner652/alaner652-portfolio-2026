import { Globe, GitFork, MapPin, Mail, GraduationCap, Briefcase, FolderOpen, Cpu, UserRound } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'

import { ResumeExport } from '@/components/common/ResumeExport'
import { SITE_CONFIG } from '@/constants'
import { getPostBySlug } from '@/lib/mdx'

const RESUME_TITLE = 'Full-Stack Engineer · Security Researcher'
const RESUME_EMAIL = SITE_CONFIG.email

export const metadata: Metadata = {
  title: 'Resume',
  description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: `Resume | ${SITE_CONFIG.name}`,
    description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
    url: '/resume',
    type: 'profile',
    locale: 'zh_TW',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Resume | ${SITE_CONFIG.name}`,
    description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
    creator: `@${SITE_CONFIG.handle}`,
  },
}

const SECTION_ICONS: Record<string, ReactNode> = {
  Summary: <UserRound size={17} className="text-amber" />,
  Education: <GraduationCap size={17} className="text-amber" />,
  Experience: <Briefcase size={17} className="text-amber" />,
  Projects: <FolderOpen size={17} className="text-amber" />,
  Skills: <Cpu size={17} className="text-amber" />,
}

function CVHeading({ children }: { children?: ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  const icon = SECTION_ICONS[text]
  return (
    <h2 className="font-display text-txt mt-[2.2em] mb-[0.7em] flex items-center gap-2.25 text-h3 font-medium tracking-[-0.015em]">
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
    name: 'Wu Chen-Chi',
    alternateName: ['吳宸麒', 'alaner652'],
    url: SITE_CONFIG.url,
    email: `mailto:${SITE_CONFIG.email}`,
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin].filter(Boolean),
    jobTitle: 'Full-Stack Engineer',
    description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
    address: { '@type': 'PostalAddress', addressLocality: 'Taipei', addressCountry: 'TW' },
    knowsAbout: ['Full-Stack Development', 'Security Research', 'Next.js', 'TypeScript', 'Python'],
  },
}

export default function ResumePage() {
  const post = getPostBySlug('resume')
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-225 px-6 py-12 md:py-18">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-h1 leading-[1.1] font-medium tracking-[-0.02em]">
            Wu Chen-Chi{' '}
            <span className="text-dim align-middle text-[0.62em] font-normal tracking-normal">
              吳宸麒
            </span>
          </h1>
          <p className="text-dim mt-2.5 text-base tracking-[0.01em]">
            {RESUME_TITLE}
          </p>
        </div>
        <div className="text-dim flex flex-wrap items-center gap-4.5 pt-1.5 text-sm">
          <ResumeExport
            name="Wu Chen-Chi"
            nameZh="吳宸麒"
            title={RESUME_TITLE}
            email={RESUME_EMAIL}
            url={SITE_CONFIG.url}
            github={SITE_CONFIG.github}
            location="Taipei, Taiwan"
          />
          <a
            href={`mailto:${RESUME_EMAIL}`}
            className="hover:text-amber flex items-center gap-1.5 transition-colors duration-180"
          >
            <Mail size={13} />
            email
          </a>
          <Link
            href="/"
            className="hover:text-amber flex items-center gap-1.5 transition-colors duration-180"
          >
            <Globe size={13} />
            portfolio
          </Link>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber flex items-center gap-1.5 transition-colors duration-180"
          >
            <GitFork size={13} />
            github
          </a>
          <span className="text-faint flex items-center gap-1.5">
            <MapPin size={13} />
            Taipei, Taiwan
          </span>
        </div>
      </div>

      <div className="prose-portfolio">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>
    </div>
  )
}
