import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'

export function Philosophy() {
  return (
    <section className="py-[96px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <Eyebrow>Philosophy</Eyebrow>
          <blockquote className="font-display mt-[12px] max-w-[20ch] text-[clamp(1.7rem,4.4vw,3rem)] leading-[1.18] font-medium tracking-[-0.02em]">
            Build for the <em className="text-amber not-italic">adversary</em>. Ship for the user.
          </blockquote>
          <p className="text-dim mt-[26px] max-w-[48ch] text-[1.05rem]">
            安全導向的工程實踐從威脅模型開始，而不是功能清單。最值得解決的問題，永遠藏在系統假設最薄弱的邊界上。
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
