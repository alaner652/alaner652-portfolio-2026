import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { PAST_ITEMS, WORK_ITEMS } from '@/constants'

export function Work() {
  return (
    <section id="work" className="border-line-soft border-t py-14 md:py-20">
      <div className="mx-auto max-w-270 px-6">
        <RevealWrapper className="mb-7">
          <SectionLabel title="做過的東西" note="還在跑的，以及一些已經停了的。" />
        </RevealWrapper>

        <div>
          {WORK_ITEMS.map((item) => (
            <RevealWrapper key={item.title}>
              <article className="border-line-soft border-t py-7.5">
                <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber transition-colors duration-180"
                      >
                        {item.title} ↗
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span className="text-dim shrink-0 text-xs">{item.status}</span>
                </div>
                <p className="text-dim max-w-[64ch] text-base leading-[1.7]">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.metrics.map((m) => (
                    <MetricChip key={m}>{m}</MetricChip>
                  ))}
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper className="mt-12">
          <h3 className="text-faint mb-1.5 text-sm">以前做的</h3>
          <ul className="border-line-soft max-w-[64ch] list-none border-t">
            {PAST_ITEMS.map((item) => (
              <li key={item.title} className="border-line-soft border-b py-3.5 last:border-b-0">
                <span className="font-display text-md font-medium">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber transition-colors duration-180"
                    >
                      {item.title} ↗
                    </a>
                  ) : (
                    item.title
                  )}
                </span>
                <p className="text-dim mt-0.75 text-sm leading-[1.65]">{item.note}</p>
              </li>
            ))}
          </ul>
        </RevealWrapper>
      </div>
    </section>
  )
}
