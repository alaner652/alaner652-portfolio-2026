interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  note?: string
  /** 標題底下的按鈕列（/hire 的寄信）。多數內頁不用。 */
  actions?: React.ReactNode
  /** 右邊的一行手寫小字（數量這類） */
  meta?: React.ReactNode
}

/** 內頁共用的頁首：手寫體的頁名 + 一行 h1 大字 + 可選的一句補充。 */
export function PageHeader({ eyebrow, title, note, actions, meta }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-270 px-6 pt-12 pb-12 md:pt-20 md:pb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="font-hand text-dim text-[1.6rem] leading-none md:text-[1.85rem]">
          {eyebrow} —
        </p>
        {meta && <p className="font-hand text-faint text-[1.25rem] leading-none">{meta}</p>}
      </div>
      <h1 className="font-display text-h1 mt-6 max-w-[16em] leading-[1.1] font-medium tracking-[-0.025em]">
        {title}
      </h1>
      {note && <p className="text-dim text-lead mt-5 max-w-[42ch] leading-[1.65]">{note}</p>}
      {actions && <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">{actions}</div>}
    </div>
  )
}
