import type { Tone } from '@/types'

/** Tailwind 只掃得到完整的字面量 class，所以這些對照表必須整串寫死，不能用字串拼接。 */
export const TONE_CHIP: Record<Tone, string> = {
  orange: 'bg-orange-tint text-orange-ink',
  gold: 'bg-gold-tint text-gold-ink',
  green: 'bg-green-tint text-green-ink',
  blue: 'bg-blue-tint text-blue-ink',
  plum: 'bg-plum-tint text-plum-ink',
}

export const TONE_INK: Record<Tone, string> = {
  orange: 'text-orange-ink',
  gold: 'text-gold-ink',
  green: 'text-green-ink',
  blue: 'text-blue-ink',
  plum: 'text-plum-ink',
}

const TONES: Tone[] = ['orange', 'gold', 'green', 'blue', 'plum']

/** 同一個標籤在列表頁和文章頁要拿到同一個顏色，所以從字串算，不隨機。 */
export function toneForTag(tag: string): Tone {
  let hash = 0
  for (const ch of tag) hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) % 9973
  return TONES[hash % TONES.length]
}
