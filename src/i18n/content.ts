import {
  ABOUT_WHO,
  ABOUT_WORDS,
  EDUCATION,
  HIRE,
  JOURNEY,
  OFFERS,
  SKILLS,
  WORK_ITEMS,
} from '@/constants'
import type { Locale } from '@/i18n/config'
import {
  ABOUT_WHO_EN,
  ABOUT_WORDS_EN,
  EDUCATION_EN,
  HIRE_EN,
  JOURNEY_EN,
  OFFERS_EN,
  SKILL_ITEMS_EN,
  SKILLS_EN_LABELS,
  WORK_EN,
} from '@/i18n/content.en'
import { getLocale } from '@/i18n/server'

const ZH = {
  WORK_ITEMS,
  JOURNEY,
  OFFERS,
  HIRE,
  ABOUT_WHO,
  ABOUT_WORDS,
  SKILLS,
  EDUCATION,
}

/** 英文版：原文合併 content.en.ts 的覆蓋。連結、圖片、slug、專案名都不變。 */
const EN: typeof ZH = {
  WORK_ITEMS: WORK_ITEMS.map((w) => ({ ...w, ...(WORK_EN[w.slug] ?? {}) })),
  JOURNEY: JOURNEY.map((j, i) => ({ ...j, ...(JOURNEY_EN[i] ?? {}) })),
  OFFERS: OFFERS.map((o, i) => ({ ...o, ...(OFFERS_EN[i] ?? {}) })),
  HIRE: {
    ...HIRE,
    lead: HIRE_EN.lead,
    services: HIRE.services.map((s, i) => ({
      ...s,
      ...(HIRE_EN.services[i] ?? {}),
      // 最後一項的例子不是作品，換成英文說法；其餘例子是專案名，不翻
      examples: s.examples?.map((e) =>
        WORK_ITEMS.some((w) => w.title === e) ? e : HIRE_EN.securityExample
      ),
    })),
    steps: HIRE.steps.map((s, i) => ({ ...s, ...(HIRE_EN.steps[i] ?? {}) })),
    notes: HIRE.notes.map((n, i) => ({ ...n, ...(HIRE_EN.notes[i] ?? {}) })),
  },
  ABOUT_WHO: ABOUT_WHO_EN,
  ABOUT_WORDS: ABOUT_WORDS_EN,
  SKILLS: SKILLS.map((g, i) => ({
    label: SKILLS_EN_LABELS[i] ?? g.label,
    items: g.items.map((x) => SKILL_ITEMS_EN[x] ?? x),
  })),
  EDUCATION: EDUCATION_EN,
}

/** 目前語系的內容。server component 不帶參數就讀請求的語系；要指定就傳 locale。 */
export function content(locale: Locale = getLocale()) {
  return locale === 'en' ? EN : ZH
}
