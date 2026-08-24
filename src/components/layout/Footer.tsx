import { SITE_CONFIG } from '@/constants'

export function Footer() {
  return (
    <footer className="border-line-soft border-t pt-13.5 pb-15">
      <div className="mx-auto max-w-270 px-6">
        <div className="flex flex-wrap items-end justify-between gap-7.5">
          <div className="font-display text-xl font-bold">
            alaner<span className="text-amber">652</span>
          </div>
          <div className="flex gap-5.5 font-mono text-xs">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-dim hover:text-amber inline-flex min-h-11 items-center gap-1.75 transition-colors duration-180"
            >
              {SITE_CONFIG.email}
            </a>
            {SITE_CONFIG.linkedin && (
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim hover:text-amber inline-flex min-h-11 items-center gap-1.75 transition-colors duration-180"
              >
                LinkedIn ↗
              </a>
            )}
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-amber inline-flex min-h-11 items-center gap-1.75 transition-colors duration-180"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="text-faint mt-6.5 font-mono text-2xs tracking-[0.03em]">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
