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
        flowchart: { padding: 4, useMaxWidth: true },
        themeVariables: {
          background: 'transparent',
          primaryColor: '#FFFFFF',
          primaryBorderColor: '#D6C6A9',
          primaryTextColor: '#332D24',
          secondaryColor: '#FFFFFF',
          tertiaryColor: '#FFFFFF',
          lineColor: '#93835F',
          textColor: '#5F5849',
          edgeLabelBackground: '#F6F1E8',
          clusterBkg: 'transparent',
          clusterBorder: '#E7DEC9',
          titleColor: '#332D24',
          nodeBorder: '#D6C6A9',
          mainBkg: '#FFFFFF',
        },
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
          svg.style.height = 'auto'
          // kill any large background/cluster rect so only the nodes render as boxes
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
    <div className="border-line bg-panel-hi my-[1.5em] overflow-hidden rounded-[10px] border">
      <div ref={containerRef} className="flex min-h-20 justify-center overflow-x-auto p-[24px]" />
    </div>
  )
}
