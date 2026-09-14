import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
}

/** 首頁與 /about 區塊的共用外框：上緣細線 + 統一的垂直節奏 + 量測欄寬。
    以前這三個 class 在每個 section 各抄一次，改一次要改五個地方。 */
export function Section({ id, children, className }: SectionProps) {
  // scroll-mt：錨點跳轉（/about#experience）時不被 sticky nav 蓋住
  return (
    <section
      id={id}
      className={cn('border-line-soft scroll-mt-16 border-t py-14 md:py-20', className)}
    >
      <div className="mx-auto max-w-270 px-6">{children}</div>
    </section>
  )
}
