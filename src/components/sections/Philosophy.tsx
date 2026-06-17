import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'

export function Philosophy() {
  return (
    <section className="py-[96px]">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <Eyebrow>Philosophy</Eyebrow>
          <blockquote className="font-display font-medium text-[clamp(1.7rem,4.4vw,3rem)] leading-[1.18] tracking-[-0.02em] max-w-[20ch] mt-[12px]">
            Build for the <em className="not-italic text-amber">adversary</em>. Ship for the user.
          </blockquote>
          <p className="mt-[26px] text-dim max-w-[48ch] text-[1.05rem]">
            安全導向的工程實踐從威脅模型開始，而不是功能清單。最值得解決的問題，永遠藏在系統假設最薄弱的邊界上。
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
