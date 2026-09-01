import { SITE_CONFIG } from '@/constants'

const LINK = 'text-dim hover:text-amber inline-flex min-h-11 items-center transition-colors'

export function Footer() {
  return (
    <footer className="border-line-soft border-t py-14">
      <div className="mx-auto max-w-270 px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="font-display text-xl font-bold">
            alaner<span className="text-amber">652</span>
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <a href={`mailto:${SITE_CONFIG.email}`} className={LINK}>
              {SITE_CONFIG.email}
            </a>
            {SITE_CONFIG.linkedin && (
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                LinkedIn ↗
              </a>
            )}
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="text-faint mt-6 font-mono text-2xs tracking-[0.03em]">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
