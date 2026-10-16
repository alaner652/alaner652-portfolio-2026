'use client'

import { BUTTON_SECONDARY } from '@/lib/button'

/** 履歷頁的「列印 / 存成 PDF」：叫出瀏覽器列印對話框，那裡可以另存 PDF。列印時自己藏起來。 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`${BUTTON_SECONDARY} min-h-11 cursor-pointer px-5 text-sm print:hidden`}
    >
      列印 / 存成 PDF ↓
    </button>
  )
}
