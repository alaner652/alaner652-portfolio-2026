import { Globe, GitFork, MapPin, Mail, GraduationCap, Briefcase, FolderOpen, Cpu, UserRound } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'

import { ResumeExport } from '@/components/common/ResumeExport'
import { SITE_CONFIG } from '@/constants'
import { getPostBySlug } from '@/lib/mdx'

const RESUME_TITLE = 'Full-Stack Engineer · Security Researcher'
const RESUME_EMAIL = 'hhgg12661@gmail.com'

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
    <h2 className="font-display text-txt mt-[2.2em] mb-[0.7em] flex items-center gap-[9px] text-[clamp(1.1rem,2vw,1.3rem)] font-medium tracking-[-0.015em]">
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
    sameAs: [SITE_CONFIG.github],
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
    <div className="mx-auto max-w-[900px] px-6 py-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <div className="mb-[48px] flex flex-wrap items-start justify-between gap-[24px]">
        <div>
          <h1 className="font-display text-[clamp(1.7rem,3.6vw,2.4rem)] leading-[1.1] font-medium tracking-[-0.02em]">
            Wu Chen-Chi{' '}
            <span className="text-dim align-middle text-[0.62em] font-normal tracking-normal">
              吳宸麒
            </span>
          </h1>
          <p className="text-dim mt-[10px] text-[0.95rem] tracking-[0.01em]">
            {RESUME_TITLE}
          </p>
        </div>
        <div className="text-dim flex flex-wrap items-center gap-[18px] pt-[6px] text-[0.85rem]">
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
            className="hover:text-amber flex items-center gap-[6px] transition-colors duration-[180ms]"
          >
            <Mail size={13} />
            email
          </a>
          <a
            href={SITE_CONFIG.url}
            className="hover:text-amber flex items-center gap-[6px] transition-colors duration-[180ms]"
          >
            <Globe size={13} />
            portfolio
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber flex items-center gap-[6px] transition-colors duration-[180ms]"
          >
            <GitFork size={13} />
            github
          </a>
          <span className="text-faint flex items-center gap-[6px]">
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
