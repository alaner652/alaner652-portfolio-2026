import Image from 'next/image'

import { cn } from '@/lib/utils'

interface PhotoProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** 圖的框，預設 4:3；要撐滿格子就給 h-full */
  frameClassName?: string
}

/** 一張乾淨的相片：圓角、細框、滿版，跟首頁 Bento 的相片格同一種作法。不斜、不貼膠帶、不寫字。 */
export function Photo({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  frameClassName,
}: PhotoProps) {
  return (
    <div
      className={cn(
        'bg-panel-hi border-line-soft rounded-card relative aspect-4/3 overflow-hidden border',
        frameClassName,
        className
      )}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  )
}
