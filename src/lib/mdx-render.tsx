import { isValidElement, type ReactNode } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { PluggableList } from 'unified'

import { Card } from '@/components/common/Card'
import { Columns } from '@/components/common/Columns'
import { Decision } from '@/components/common/Decision'
import { Eyebrow } from '@/components/common/Eyebrow'
import { MacWindow } from '@/components/common/MacWindow'
import { Mermaid } from '@/components/common/Mermaid'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { TaskList } from '@/components/common/TaskList'

/* MDX 的渲染設定，部落格文章和作品案例共用一份：同一套元件、同一套程式碼區塊樣式。
   新的 MDX 元件加在 mdxComponents，兩邊就都能用。 */

/** 程式碼區塊：mermaid 交給 Mermaid；其他的每行包一個 span 讓 CSS 畫行號，外面套 MacWindow（語言 + 複製）。 */
export function Pre({ children }: { children: ReactNode }) {
  if (isValidElement(children)) {
    const { className, children: code } = children.props as {
      className?: string
      children?: unknown
    }
    if (className === 'language-mermaid' && typeof code === 'string') {
      return <Mermaid chart={code} />
    }
    const lang =
      typeof className === 'string' && className.startsWith('language-')
        ? className.slice(9)
        : undefined
    const body =
      typeof code === 'string' ? (
        <code className={className}>
          {code
            .replace(/\n$/, '')
            .split('\n')
            .map((line, i) => (
              <span key={i} className="code-line">
                {line}
                {'\n'}
              </span>
            ))}
        </code>
      ) : (
        children
      )
    return (
      <MacWindow title={lang}>
        <pre>{body}</pre>
      </MacWindow>
    )
  }
  return <pre>{children}</pre>
}

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // 標題自動產生 id 並掛上錨點，長文才能建目錄與深連結
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'heading-anchor' } }],
    ] as PluggableList,
  },
}

export const mdxComponents = {
  TaskList,
  Mermaid,
  MacWindow,
  pre: Pre,
  Card,
  Columns,
  Decision,
  Eyebrow,
  MetricChip,
  RevealWrapper,
}
