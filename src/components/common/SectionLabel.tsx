interface SectionLabelProps {
  title: string
  note?: string
  className?: string
}

export function SectionLabel({ title, note, className }: SectionLabelProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-h2 font-medium tracking-[-0.015em]">
        {title}
      </h2>
      {note && <p className="text-faint mt-2 text-sm leading-[1.6]">{note}</p>}
    </div>
  )
}
