import { Eyebrow } from '@/components/common/Eyebrow'

interface PageHeaderProps {
  eyebrow: string
  title: string
  note?: string
  /** 標題底下的按鈕列（/hire 的寄信）。多數內頁不用。 */
  actions?: React.ReactNode
}

/** 內頁（/about、/projects、/blog）共用的頁首：小字分類 + 一行大標 + 可選的一句補充。
    首頁的區塊標題是 SectionLabel（h2），這裡是整頁的 h1，兩者不要混用。 */
export function PageHeader({ eyebrow, title, note, actions }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-270 px-6 pt-14 pb-10 md:pt-20 md:pb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-h1 mt-3 font-medium tracking-[-0.015em]">{title}</h1>
      {note && <p className="text-dim text-lead mt-4 max-w-[52ch] leading-[1.65]">{note}</p>}
      {actions && <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">{actions}</div>}
    </div>
  )
}
