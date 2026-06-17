import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'

export function Philosophy() {
  return (
    <section className="py-[96px]">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealWrapper>
          <Eyebrow>Philosophy</Eyebrow>
          <blockquote className="font-display font-medium text-[clamp(1.7rem,4.4vw,3rem)] leading-[1.18] tracking-[-0.02em] max-w-[20ch] mt-[12px]">
            Technology should reduce <em className="not-italic text-amber">friction</em>, not create it.
          </blockquote>
          <p className="mt-[26px] text-dim max-w-[48ch] text-[1.05rem]">
            The best software is often invisible — it simply helps people accomplish what they already wanted to do.
          </p>
        </RevealWrapper>
      </div>
    </section>
  )
}
