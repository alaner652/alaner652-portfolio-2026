interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
}

/** 以前是捲到才淡入；全站拿掉動畫後只是一個普通的 div，留著是因為文章 MDX 裡還有人用。 */
export function RevealWrapper({ children, className }: RevealWrapperProps) {
  return <div className={className}>{children}</div>
}
