import { SITE_CONFIG } from '@/constants'

export function Hero() {
  return (
    <header className="pt-[104px] pb-[84px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <a id="top" />

        <p className="text-faint mb-[22px] font-mono text-[0.8rem] tracking-[0.14em]">
          alaner652
        </p>

        <h1 className="font-display max-w-[16ch] text-[clamp(2.3rem,6vw,3.8rem)] leading-[1.06] font-medium tracking-[-0.02em]">
          我做產品，也<span className="text-amber">拆系統找漏洞</span>。
        </h1>

        <p className="text-dim mt-[24px] max-w-[46ch] text-[clamp(1.05rem,1.7vw,1.25rem)] leading-[1.6]">
          通報過 HITCON ZeroDay 高風險漏洞，也把一套無文件的校務 API 逆向成能對話的 AI 助理。
          <span className="text-faint"> 全端開發 · 應用安全。</span>
        </p>

        <div className="mt-[38px] flex flex-wrap items-center gap-x-[26px] gap-y-[12px] text-[0.95rem]">
          <a href="#work" className="text-txt hover:text-amber underline-offset-[6px] transition-colors duration-150 hover:underline">
            看我做過什麼 →
          </a>
          <a href="#writing" className="text-txt hover:text-amber underline-offset-[6px] transition-colors duration-150 hover:underline">
            Writing
          </a>
          <a href="/resume" className="text-txt hover:text-amber underline-offset-[6px] transition-colors duration-150 hover:underline">
            Resume
          </a>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-amber underline-offset-[6px] transition-colors duration-150 hover:underline"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </header>
  )
}
