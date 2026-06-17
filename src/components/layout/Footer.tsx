import { SITE_CONFIG } from '@/constants'

export function Footer() {
  return (
    <footer className="border-t border-line-soft pt-[54px] pb-[60px]">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="flex justify-between items-end gap-[30px] flex-wrap">
          <div className="font-display font-bold text-[1.5rem]">
            alaner<span className="text-amber">652</span>
          </div>
          <div className="flex gap-[22px] font-mono text-[0.82rem]">
            <a
              href={SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors duration-[180ms] hover:text-amber inline-flex items-center gap-[7px]"
            >
              {SITE_CONFIG.handle}.com ↗
            </a>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors duration-[180ms] hover:text-amber inline-flex items-center gap-[7px]"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="font-mono text-[0.72rem] text-faint mt-[26px] tracking-[0.03em]">
          {SITE_CONFIG.copyright}
        </div>
      </div>
    </footer>
  )
}
