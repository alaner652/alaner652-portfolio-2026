import { OFFERS } from '@/constants'

/** 三個動詞：做出來、守得住、摸清楚。80px 黑體加一個橘色句點，底下一句說明。三欄，手機疊成一欄。 */
export function Caps() {
  return (
    <section className="wrap pt-22 md:pt-36" aria-label="我能做什麼">
      <ul className="grid gap-9 md:grid-cols-3 md:gap-10">
        {OFFERS.map((offer) => (
          <li key={offer.verb} className="flex flex-col gap-2.5 md:gap-3.5">
            <h3 className="text-text text-[56px] leading-none font-black tracking-[-0.05em] md:text-[clamp(56px,5.5vw,80px)]">
              {offer.verb}
              <span className="text-accent">.</span>
            </h3>
            <p className="text-text-body text-[15px] leading-[1.8] md:text-[17px]">
              {offer.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
