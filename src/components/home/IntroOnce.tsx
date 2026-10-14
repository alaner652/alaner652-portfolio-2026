'use client'

import { useLayoutEffect, useRef } from 'react'

/** sessionStorage 的鍵；layout.tsx 的開頁腳本也讀同一把 */
const KEY = 'intro'

/** 首頁的開頁動畫（名字打字、主張打字、畫線、淡入）一個分頁只演一次。
    第一次看到 Hero 就記下來；之後再回首頁，掛上 <html data-intro="done">，
    globals.css 看到它就把那幾個動畫關掉，字直接全在。
    硬重新整理的情況由 layout.tsx 裡 body 最前面的腳本在第一次繪製前處理；
    這裡負責站內切頁（那時候 HTML 不是伺服器送的，腳本不會跑）。
    useLayoutEffect 在繪製前跑，所以不會先閃一下動畫再切掉。
    seen 用 ref 記住「這次掛載時讀到的值」：dev 的 Strict Mode 會把 effect 跑兩遍，
    第二遍不能把第一遍剛寫進去的記號當成「看過」，不然開發時動畫永遠不會演。 */
export function IntroOnce() {
  const seen = useRef<boolean | null>(null)

  useLayoutEffect(() => {
    try {
      if (seen.current === null) seen.current = sessionStorage.getItem(KEY) !== null
      if (seen.current) {
        document.documentElement.dataset.intro = 'done'
      } else {
        sessionStorage.setItem(KEY, '1')
      }
    } catch {
      // 無痕模式或被擋：每次都演，沒關係
    }
  }, [])

  return null
}
