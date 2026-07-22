import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { WORK_ITEMS } from '@/constants'

export function Work() {
  return (
    <section id="work" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper className="mb-[16px]">
          <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium tracking-[-0.015em]">
            Selected work
          </h2>
        </RevealWrapper>

        <div>
          {WORK_ITEMS.map((item) => (
            <RevealWrapper key={item.id}>
              <article className="border-line-soft border-t py-[28px]">
                <div className="mb-[10px] flex items-baseline justify-between gap-[16px]">
                  <h3 className="font-display text-[1.2rem] font-medium tracking-[-0.01em]">
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
                  <span className="text-faint shrink-0 font-mono text-[0.68rem] tracking-[0.04em]">
                    {item.status}
                  </span>
                </div>
                <p
                  className="text-dim max-w-[64ch] text-[0.96rem] leading-[1.65]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="mt-[16px] flex flex-wrap gap-[8px]">
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
