import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  /** 內層 1080 欄位的 class，要改上下留白時用（例如相片要壓到區塊上緣） */
  wrapClassName?: string
  /** 段名，手寫體、當這段的 h2，像在筆記本上寫一行標題：「我能做什麼 —」 */
  label?: string
  /** 段名右邊的小連結（「全部 8 個 →」） */
  aside?: React.ReactNode
}

/** 區塊外框：上緣一條虛線（筆記本的分隔）、統一的垂直節奏、量測欄寬。 */
export function Section({ id, children, className, wrapClassName, label, aside }: SectionProps) {
  // scroll-mt：錨點跳轉（/about#experience）時不被 sticky nav 蓋住
  return (
    <section id={id} className={cn('border-line scroll-mt-16 border-t border-dashed', className)}>
      <div className={cn('mx-auto max-w-270 px-6 py-14 md:py-20', wrapClassName)}>
        {(label || aside) && (
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 md:mb-10">
            {label && (
              <h2 className="font-hand text-dim text-[1.6rem] leading-none md:text-[1.85rem]">
                {label} —
              </h2>
            )}
            {aside && <div className="shrink-0">{aside}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/** 段名旁邊那種手寫小連結 */
export const HAND_LINK =
  'font-hand text-dim hover:text-amber inline-flex min-h-11 items-center gap-1 text-[1.25rem] leading-none transition-colors'
