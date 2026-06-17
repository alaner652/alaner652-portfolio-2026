import { Eyebrow } from '@/components/common/Eyebrow'
import { StatusPanel } from '@/components/common/StatusPanel'
import { HERO_STATS } from '@/constants'

export function Hero() {
  return (
    <header className="pt-[64px] pb-[86px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <a id="top" />
        <Eyebrow>Full-Stack Engineer · Security Researcher · Builder</Eyebrow>

        <h1 className="font-display mt-[22px] mb-[22px] max-w-[18ch] text-[clamp(2.3rem,6.4vw,4.4rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          I build systems — then find what&rsquo;s <em className="text-amber not-italic">broken</em> in them.
        </h1>

        <p className="text-dim max-w-[46ch] text-[clamp(1rem,1.6vw,1.12rem)]">
          全端工程師 · 資安研究者，臺北城市科技大學資工系。
        </p>

        <StatusPanel />

        <div className="mt-[34px] flex flex-wrap gap-[14px]">
          <a
            href="#work"
            className="border-amber bg-amber text-bg inline-flex items-center gap-[8px] rounded-[8px] border px-[20px] py-[12px] font-mono text-[0.8rem] font-bold tracking-[0.04em] transition-[background,border-color] duration-[180ms] hover:border-[#ffbf55] hover:bg-[#ffbf55]"
          >
            View work →
          </a>
          <a
            href="#writing"
            className="border-line text-txt hover:border-faint inline-flex items-center gap-[8px] rounded-[8px] border px-[20px] py-[12px] font-mono text-[0.8rem] tracking-[0.04em] transition-[border-color,transform] duration-[180ms] hover:translate-y-[-1px]"
          >
            Read writing
          </a>
          <a
            href="/resume"
            className="border-line text-txt hover:border-faint inline-flex items-center gap-[8px] rounded-[8px] border px-[20px] py-[12px] font-mono text-[0.8rem] tracking-[0.04em] transition-[border-color,transform] duration-[180ms] hover:translate-y-[-1px]"
          >
            View CV
          </a>
        </div>

        <div
          className="border-line bg-panel mt-[30px] flex flex-wrap overflow-hidden rounded-[10px] border"
          role="list"
          aria-label="At a glance"
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="border-line-soft max-[560px]:border-line-soft min-w-[140px] flex-1 border-r px-[20px] py-[16px] last:border-r-0 max-[560px]:min-w-[50%] max-[560px]:border-b max-[560px]:[&:nth-child(even)]:border-r-0 max-[560px]:[&:nth-child(odd)]:border-r"
              role="listitem"
            >
              <b className="text-txt mb-[3px] block font-mono text-[1.1rem] font-bold tracking-[0.01em]">
                {stat.value}
              </b>
              <span className="text-faint font-mono text-[0.66rem] tracking-[0.1em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
