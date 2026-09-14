import { SITE_CONFIG } from '@/constants'

/** 有填才顯示；順序照重要性，GitHub 最前。 */
const SOCIALS: [string, string | undefined][] = [
  ['GitHub', SITE_CONFIG.github],
  ['Instagram', SITE_CONFIG.instagram],
  ['Threads', SITE_CONFIG.threads],
  ['LinkedIn', SITE_CONFIG.linkedin],
]

const LINK = 'text-dim hover:text-amber inline-flex min-h-11 items-center transition-colors'

export function Footer() {
  return (
    <footer className="border-line-soft border-t py-14">
      <div className="mx-auto max-w-270 px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="font-display text-xl font-bold">
            alaner<span className="text-amber">652</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
            <a href={`mailto:${SITE_CONFIG.email}`} className={LINK}>
              {SITE_CONFIG.email}
            </a>
            {SOCIALS.map(([label, href]) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  {label} ↗
                </a>
              ) : null
            )}
          </div>
        </div>
        <div className="text-faint mt-6 font-mono text-2xs tracking-[0.03em]">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
