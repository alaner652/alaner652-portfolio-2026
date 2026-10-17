import { Check } from 'lucide-react'

type Task = { title: string; completed: boolean }

type Props = {
  title?: string
  tasks: string
}

/** 文章裡的待辦清單：做完的是橘色實心小方框 + 勾勾 icon、沒做的是空心方框；做完的字亮、沒做的字暗。跟 Card 同一種框。 */
export function TaskList({ title, tasks }: Props) {
  // MDX 傳進來的是字串，格式錯了不該讓整個路由 500
  let items: Task[] = []
  try {
    const parsed: unknown = JSON.parse(tasks)
    if (Array.isArray(parsed)) items = parsed as Task[]
  } catch {
    return null
  }

  return (
    <aside className="mdx-card bg-surface border-accent my-[1.6em] rounded-r-sm border-l-2 px-5 py-4 md:px-6">
      {title && <h3 className="text-text mb-3 text-base font-bold">{title}</h3>}
      <ul className="m-0 list-none p-0">
        {items.map((task, i) => (
          <li key={i} className="mb-1.5 flex items-start gap-2.5 text-[0.95em] leading-[1.7]">
            <span
              className={`mt-[0.35em] flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${
                task.completed ? 'border-accent bg-accent text-on-accent' : 'border-border-strong'
              }`}
              aria-hidden="true"
            >
              {task.completed && <Check size={12} strokeWidth={3} />}
            </span>
            <span className={task.completed ? 'text-text' : 'text-text-2'}>
              <span className="sr-only">{task.completed ? '已完成：' : '未完成：'}</span>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
