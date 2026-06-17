import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { WORK_ITEMS } from '@/constants'

export function Work() {
  return (
    <section id="work" className="py-[72px] border-t border-line-soft">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper className="mb-[38px]">
          <Eyebrow>Featured Work</Eyebrow>
          <h2 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
            Not just the result — the way of solving the problem.
          </h2>
        </RevealWrapper>

        <div className="grid gap-[18px]">
          {WORK_ITEMS.map((item) => (
            <RevealWrapper key={item.id}>
              <article className="border border-line rounded-[12px] bg-panel px-[26px] pt-[26px] pb-[24px] transition-[border-color,transform,background] duration-[200ms] hover:border-amber hover:translate-y-[-3px] hover:bg-panel-hi relative">
                <div className="flex items-center gap-[14px] mb-[14px]">
                  <span className="font-mono text-[0.72rem] text-amber tracking-[0.08em]">{item.id}</span>
                  <span className="ml-auto font-mono text-[0.68rem] text-dim border border-line px-[10px] py-[4px] rounded-[20px] tracking-[0.06em]">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[1.4rem] tracking-[-0.01em] mb-[10px]">
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
                  className="text-dim text-[0.98rem] max-w-[54ch]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="flex flex-wrap gap-[8px] mt-[18px]">
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
