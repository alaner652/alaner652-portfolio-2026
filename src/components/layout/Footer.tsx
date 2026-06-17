import { SITE_CONFIG } from '@/constants'

export function Footer() {
  return (
    <footer className="border-line-soft border-t pt-[54px] pb-[60px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-[30px]">
          <div className="font-display text-[1.5rem] font-bold">
            alaner<span className="text-amber">652</span>
          </div>
          <div className="flex gap-[22px] font-mono text-[0.82rem]">
            <a
              href={SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-amber inline-flex items-center gap-[7px] transition-colors duration-[180ms]"
            >
              {SITE_CONFIG.handle}.com ↗
            </a>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-amber inline-flex items-center gap-[7px] transition-colors duration-[180ms]"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="text-faint mt-[26px] font-mono text-[0.72rem] tracking-[0.03em]">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
