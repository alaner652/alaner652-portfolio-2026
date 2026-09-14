import { Eyebrow } from '@/components/common/Eyebrow'

interface PageHeaderProps {
  eyebrow: string
  title: string
  note?: string
}

/** 內頁（/about、/projects、/blog）共用的頁首：小字分類 + 一行大標 + 可選的一句補充。
    首頁的區塊標題是 SectionLabel（h2），這裡是整頁的 h1，兩者不要混用。 */
export function PageHeader({ eyebrow, title, note }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-270 px-6 pt-14 pb-10 md:pt-20 md:pb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display mt-3 text-h1 font-medium tracking-[-0.015em]">{title}</h1>
      {note && <p className="text-dim mt-4 max-w-[52ch] text-lead leading-[1.65]">{note}</p>}
    </div>
  )
}
