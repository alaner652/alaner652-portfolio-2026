type Task = { title: string; completed: boolean }

type Props = {
  title?: string
  tasks: string
}

export function TaskList({ title, tasks }: Props) {
  const items: Task[] = JSON.parse(tasks)
  return (
    <div className="mdx-card bg-panel border-line-soft mb-5 rounded-[10px] border px-6 py-5">
      {title && <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>{title}</h3>}
      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        {items.map((task, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{
              color: task.completed ? 'var(--color-live)' : 'var(--color-faint)',
              flexShrink: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82em',
              paddingTop: '0.2em',
            }}>
              {task.completed ? '[✓]' : '[ ]'}
            </span>
            <span style={{ color: 'var(--color-dim)', lineHeight: 1.65 }}>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
