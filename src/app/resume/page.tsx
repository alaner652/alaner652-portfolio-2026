import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '@/lib/mdx'
import { SITE_CONFIG } from '@/constants'
import { Globe, GitFork, MapPin, GraduationCap, Briefcase, FolderOpen, Cpu } from 'lucide-react'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Resume',
  description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: `Resume | ${SITE_CONFIG.name}`,
    description: '吳宸麒 (Wu Chen-Chi) — Full-Stack Engineer · Security Researcher',
    url: '/resume',
    type: 'article',
  },
}

const SECTION_ICONS: Record<string, ReactNode> = {
  Education: <GraduationCap size={17} className="text-amber" />,
  Experience: <Briefcase size={17} className="text-amber" />,
  Projects: <FolderOpen size={17} className="text-amber" />,
  Skills: <Cpu size={17} className="text-amber" />,
}

function CVHeading({ children }: { children?: ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  const icon = SECTION_ICONS[text]
  return (
    <h2 className="font-display font-semibold text-[clamp(1.1rem,2vw,1.3rem)] tracking-[-0.015em] text-txt mt-[2.2em] mb-[0.7em] flex items-center gap-[8px]">
      {icon}
      {children}
    </h2>
  )
}

const mdxComponents = { h2: CVHeading }
const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

export default function ResumePage() {
  const post = getPostBySlug('resume')
  if (!post) notFound()

  return (
    <div className="max-w-[900px] mx-auto px-6 py-[72px]">
      <div className="mb-[48px] flex items-start justify-between gap-[24px] flex-wrap">
        <div>
          <h1 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.4rem)] tracking-[-0.02em] leading-[1.1]">
            Wu Chen-Chi{' '}
            <span className="font-mono text-[0.6em] text-dim font-normal tracking-normal align-middle">
              吳宸麒
            </span>
          </h1>
          <p className="font-mono text-[0.82rem] text-dim mt-[8px] tracking-[0.02em]">
            Full-Stack Engineer · Security Researcher
          </p>
        </div>
        <div className="flex items-center gap-[20px] font-mono text-[0.78rem] text-dim pt-[4px] flex-wrap">
          <a
            href={SITE_CONFIG.url}
            className="flex items-center gap-[6px] hover:text-amber transition-colors duration-[180ms]"
          >
            <Globe size={13} />
            portfolio
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px] hover:text-amber transition-colors duration-[180ms]"
          >
            <GitFork size={13} />
            github
          </a>
          <span className="flex items-center gap-[6px] text-faint">
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
