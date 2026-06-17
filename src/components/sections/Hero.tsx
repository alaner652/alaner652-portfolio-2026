import { Eyebrow } from '@/components/common/Eyebrow'
import { StatusPanel } from '@/components/common/StatusPanel'
import { MetricChip } from '@/components/common/MetricChip'
import { HERO_STATS } from '@/constants'

export function Hero() {
  return (
    <header className="pt-[64px] pb-[86px]">
      <div className="max-w-[1080px] mx-auto px-6">
        <a id="top" />
        <Eyebrow>Full-Stack Engineer · Security Researcher · Builder</Eyebrow>

        <h1 className="font-display font-semibold text-[clamp(2.3rem,6.4vw,4.4rem)] leading-[1.04] tracking-[-0.02em] mt-[22px] mb-[22px] max-w-[18ch]">
          I build systems — then find what&rsquo;s <em className="not-italic text-amber">broken</em> in them.
        </h1>

        <p className="text-dim text-[clamp(1rem,1.6vw,1.12rem)] max-w-[46ch]">
          全端工程師 · 資安研究者，臺北城市科技大學資工系。
        </p>

        <StatusPanel />

        <div className="flex gap-[14px] mt-[34px] flex-wrap">
          <a
            href="#work"
            className="font-mono text-[0.8rem] tracking-[0.04em] px-[20px] py-[12px] rounded-[8px] border border-amber bg-amber text-bg font-bold transition-[background,border-color] duration-[180ms] inline-flex items-center gap-[8px] hover:bg-[#ffbf55] hover:border-[#ffbf55]"
          >
            View work →
          </a>
          <a
            href="#writing"
            className="font-mono text-[0.8rem] tracking-[0.04em] px-[20px] py-[12px] rounded-[8px] border border-line text-txt transition-[border-color,transform] duration-[180ms] inline-flex items-center gap-[8px] hover:border-faint hover:translate-y-[-1px]"
          >
            Read writing
          </a>
          <a
            href="/resume"
            className="font-mono text-[0.8rem] tracking-[0.04em] px-[20px] py-[12px] rounded-[8px] border border-line text-txt transition-[border-color,transform] duration-[180ms] inline-flex items-center gap-[8px] hover:border-faint hover:translate-y-[-1px]"
          >
            View CV
          </a>
        </div>

        <div
          className="flex flex-wrap mt-[30px] border border-line rounded-[10px] overflow-hidden bg-panel"
          role="list"
          aria-label="At a glance"
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="flex-1 min-w-[140px] px-[20px] py-[16px] border-r border-line-soft last:border-r-0 max-[560px]:min-w-[50%] max-[560px]:border-b max-[560px]:border-line-soft max-[560px]:[&:nth-child(odd)]:border-r max-[560px]:[&:nth-child(even)]:border-r-0"
              role="listitem"
            >
              <b className="block font-mono text-[1.1rem] text-txt font-bold tracking-[0.01em] mb-[3px]">
                {stat.value}
              </b>
              <span className="font-mono text-[0.66rem] text-faint uppercase tracking-[0.1em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
