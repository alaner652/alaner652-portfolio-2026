import Image from 'next/image'
import Link from 'next/link'

import { WorkRows } from '@/components/home/WorkRows'
import { WORK_ITEMS } from '@/constants'

/** 做過的東西：第一件精選放大（截圖微斜 -1°、右邊一段），接著兩件一列一件，最後「還有 N 個」。
    精選和列表都讀 WORK_ITEMS 標 featured 的那幾件，順序照資料。 */
export function Work() {
  const featured = WORK_ITEMS.filter((i) => i.featured)
  const [lead, ...rows] = featured
  const rest = WORK_ITEMS.length - featured.length

  return (
    <section className="wrap pt-18 md:pt-30">
      <div className="mb-6 flex items-baseline justify-between md:mb-8">
        <h2 className="text-text text-h2 font-black tracking-[-0.03em]">做過的東西</h2>
        <Link
          href="/projects"
          className="text-text hover:text-accent font-mono text-[13px] transition-colors"
        >
          全部 {WORK_ITEMS.length} 個 →
        </Link>
      </div>

      <Link
        href={`/projects/${lead.slug}`}
        className="group/lead grid gap-6 md:grid-cols-12 md:items-center md:gap-10"
      >
        {lead.preview && (
          <div className="border-border bg-raised overflow-hidden rounded-md border md:col-span-7 md:-rotate-1 md:transition-transform md:duration-500 md:group-hover/lead:rotate-0 motion-reduce:transition-none">
            <Image
              src={lead.preview}
              alt={`${lead.title} 的畫面`}
              width={1200}
              height={600}
              sizes="(min-width: 768px) 740px, 100vw"
              className="aspect-2/1 w-full object-cover object-top"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 md:col-span-5 md:gap-4">
          <span className="text-accent font-mono text-xs md:text-[13px]">01 · {lead.category}</span>
          <span className="text-text group-hover/lead:text-accent text-[36px] leading-none font-black tracking-[-0.03em] transition-colors md:text-[56px]">
            {lead.title}
          </span>
          <span className="text-text-body text-[15px] leading-[1.8] md:text-lg">
            {lead.result ?? lead.description}
          </span>
          <span className="border-accent text-text self-start border-b pb-0.5 text-[15px]">
            看完整介紹 →
          </span>
        </div>
      </Link>

      <div className="mt-10 md:mt-18">
        <WorkRows items={rows} start={2} rest={rest} />
      </div>
    </section>
  )
}
