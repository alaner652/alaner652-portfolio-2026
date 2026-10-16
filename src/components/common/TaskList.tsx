type Task = { title: string; completed: boolean }

type Props = {
  title?: string
  tasks: string
}

/** 文章裡的待辦清單：mono 的 [✓] / [ ]，做完的字亮、沒做的字暗。跟 Card 同一種框。 */
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
              className={`shrink-0 pt-0.5 font-mono text-[0.8em] ${task.completed ? 'text-accent' : 'text-text-3'}`}
              aria-hidden="true"
            >
              {task.completed ? '[✓]' : '[ ]'}
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
