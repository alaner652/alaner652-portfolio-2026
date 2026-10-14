import type { ProjectCategory, Tone } from '@/types'

/** 2026-10-14 起分類色盤退場：全站只剩墨色、一個橘色和中性灰底。
    Tone 型別和這兩張表留著讓資料不用改，但每個色調都對到同一組中性樣式；
    要強調的地方（進行中、現在、主張小標）各自明寫 amber，不走這裡。 */
export const TONE_CHIP: Record<Tone, string> = {
  orange: 'bg-panel-hi text-dim',
  gold: 'bg-panel-hi text-dim',
  green: 'bg-panel-hi text-dim',
  blue: 'bg-panel-hi text-dim',
  plum: 'bg-panel-hi text-dim',
}

export const TONE_INK: Record<Tone, string> = {
  orange: 'text-dim',
  gold: 'text-dim',
  green: 'text-dim',
  blue: 'text-dim',
  plum: 'text-dim',
}

const TONES: Tone[] = ['orange', 'gold', 'green', 'blue', 'plum']

/** 同一個標籤在列表頁和文章頁要拿到同一個顏色，所以從字串算，不隨機。 */
export function toneForTag(tag: string): Tone {
  let hash = 0
  for (const ch of tag) hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) % 9973
  return TONES[hash % TONES.length]
}

/** 專案分類的配色：資安紫、Web 藍、AI 綠、工具金、遊戲橘。
    篩選 chip 和排版式封面共用，同一個分類在哪裡都是同一個顏色。 */
export const CATEGORY_TONE: Record<ProjectCategory, Tone> = {
  資安: 'plum',
  Web: 'blue',
  AI: 'green',
  工具: 'gold',
  遊戲: 'orange',
}
