'use client'

import { useEffect, useRef } from 'react'

export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !chart?.trim()) return

    let active = true

    import('mermaid').then(({ default: mermaid }) => {
      if (!active) return

      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        fontFamily: 'var(--font-body)',
        // 節點內留白大一點、層與層之間拉開，線用平滑曲線，不要直角折線
        flowchart: {
          padding: 14,
          useMaxWidth: true,
          nodeSpacing: 36,
          rankSpacing: 44,
          curve: 'basis',
        },
        themeVariables: {
          background: 'transparent',
          primaryColor: '#16191D',
          primaryBorderColor: '#2E3339',
          primaryTextColor: '#F2EFE9',
          secondaryColor: '#16191D',
          tertiaryColor: '#16191D',
          lineColor: '#5A606A',
          textColor: '#F2EFE9',
          edgeLabelBackground: '#0A0B0D',
          clusterBkg: 'transparent',
          clusterBorder: '#3A3F46',
          titleColor: '#F2EFE9',
          nodeBorder: '#2E3339',
          mainBkg: '#16191D',
        },
        // 細節交給 CSS：線細一點、箭頭小一點、邊上的字用 mono 小字，跟網站其他標註同一套
        themeCSS: `
          .flowchart-link { stroke-width: 1.5px; }
          marker path { fill: #5A606A; stroke: none; }
          .edgeLabel, .edgeLabel p, .edgeLabel span {
            font-family: var(--font-mono) !important; font-size: 11px; color: #A3A7AE; background: #0A0B0D;
          }
          .labelBkg { background: #0A0B0D !important; }
          .nodeLabel, .nodeLabel p { color: #F2EFE9; font-size: 14px; }
        `,
      })

      const el = document.createElement('pre')
      el.className = 'mermaid'
      el.textContent = chart.trim()
      container.replaceChildren(el)

      mermaid
        .run({ nodes: [el] })
        .then(() => {
          if (!active) return
          const svg = container.querySelector('svg')
          if (!svg) return
          svg.style.background = 'transparent'
          svg.style.maxWidth = '100%'
          // 置中：block + 左右 auto。比框寬時 maxWidth 100% 會把它縮進框裡，不會溢出
          svg.style.display = 'block'
          svg.style.marginInline = 'auto'
          // mermaid 給的 width 是 100%，block 之後會被撐到整個框寬、字放超大；改成 viewBox 的原始寬度
          const natural = svg.viewBox.baseVal?.width
          if (natural) svg.style.width = `${natural}px`
          svg.style.height = 'auto'
          // kill any large background/cluster rect so only the nodes render as boxes
          // 節點改圓角：mermaid 的 rect 預設是直角，rx/ry 用屬性寫，Safari 也吃得到
          svg.querySelectorAll('.node rect').forEach((rect) => {
            rect.setAttribute('rx', '10')
            rect.setAttribute('ry', '10')
          })
          // 第一個節點（流程的起點）用橘色細框標出來
          const first = svg.querySelector('.node rect')
          if (first instanceof SVGElement) first.style.stroke = '#FF8648' // mermaid 用 style 上色，屬性蓋不過
          svg.querySelectorAll('rect').forEach((rect) => {
            const w = parseFloat(rect.getAttribute('width') ?? '0')
            const h = parseFloat(rect.getAttribute('height') ?? '0')
            if (w > 60 && h > 60 && !rect.closest('.node')) {
              rect.setAttribute('fill', 'transparent')
              rect.setAttribute('stroke', 'transparent')
            }
          })
        })
        .catch((err) => {
          console.error('[Mermaid]', err)
        })
    })

    return () => {
      active = false
    }
  }, [chart])

  return (
    // 跟程式碼區塊同一種框：圓角邊框、左右留白，圖只在框內縮放或捲動，不會貼邊或跑出文字欄。
    // 不用 flex justify-center：圖比框寬時左半邊會被切掉、捲不回去；置中改在 svg 上做（見上面）
    <div className="border-border bg-bg-deep my-[1.6em] max-w-full overflow-hidden rounded-xl border">
      <div
        ref={containerRef}
        className="min-h-20 overflow-x-auto px-4 py-6 [scrollbar-width:thin] md:px-6"
      />
    </div>
  )
}
