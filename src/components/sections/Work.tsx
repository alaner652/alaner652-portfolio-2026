import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { WORK_ITEMS } from '@/constants'

export function Work() {
  return (
    <section id="work" className="border-line-soft border-t py-[72px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper className="mb-[38px]">
          <Eyebrow>Featured Work</Eyebrow>
          <h2 className="font-display mt-[12px] text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold tracking-[-0.015em]">
            Not just the result — the way of solving the problem.
          </h2>
        </RevealWrapper>

        <div className="grid gap-[18px]">
          {WORK_ITEMS.map((item) => (
            <RevealWrapper key={item.id}>
              <article className="border-line bg-panel hover:border-amber hover:bg-panel-hi relative rounded-[12px] border px-[26px] pt-[26px] pb-[24px] transition-[border-color,transform,background] duration-[200ms] hover:translate-y-[-3px]">
                <div className="mb-[14px] flex items-center gap-[14px]">
                  <span className="text-amber font-mono text-[0.72rem] tracking-[0.08em]">{item.id}</span>
                  <span className="text-dim border-line ml-auto rounded-[20px] border px-[10px] py-[4px] font-mono text-[0.68rem] tracking-[0.06em]">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-display mb-[10px] text-[1.4rem] font-semibold tracking-[-0.01em]">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber transition-colors duration-[180ms]"
                    >
                      {item.title} ↗
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p
                  className="text-dim max-w-[54ch] text-[0.98rem]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="mt-[18px] flex flex-wrap gap-[8px]">
                  {item.metrics.map((m) => (
                    <MetricChip key={m}>{m}</MetricChip>
                  ))}
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
