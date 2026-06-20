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
        theme: 'dark',
        themeVariables: {
          background: '#14171E',
          primaryColor: '#1E2330',
          primaryBorderColor: '#2E3545',
          primaryTextColor: '#E9EAED',
          secondaryColor: '#1A1E27',
          tertiaryColor: '#1A1E27',
          lineColor: '#5E6470',
          textColor: '#9AA0AD',
          edgeLabelBackground: '#14171E',
          clusterBkg: '#1A1E27',
          clusterBorder: '#2E3545',
          titleColor: '#E9EAED',
          nodeBorder: '#2E3545',
          mainBkg: '#1E2330',
        },
      })

      const el = document.createElement('pre')
      el.className = 'mermaid'
      el.textContent = chart.trim()
      container.replaceChildren(el)

      mermaid.run({ nodes: [el] }).then(() => {
        if (!active) return
        const svg = container.querySelector('svg')
        if (!svg) return
        svg.style.background = 'transparent'
        svg.querySelectorAll('rect').forEach((rect) => {
          const w = parseFloat(rect.getAttribute('width') ?? '0')
          const h = parseFloat(rect.getAttribute('height') ?? '0')
          if (w > 50 && h > 50 && !rect.closest('.node')) {
            rect.setAttribute('fill', 'transparent')
          }
        })
      }).catch((err) => {
        console.error('[Mermaid]', err)
      })
    })

    return () => {
      active = false
    }
  }, [chart])

  return (
    <div className="border-line my-[1.5em] overflow-hidden rounded-[10px] border">
      <div
        className="border-line-soft flex items-center gap-3 border-b bg-black/18 px-3.5 py-2.5"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="block h-2.75 w-2.75 rounded-full bg-[#FF5F56]" />
          <span className="block h-2.75 w-2.75 rounded-full bg-[#FFBD2E]" />
          <span className="block h-2.75 w-2.75 rounded-full bg-[#27C93F]" />
        </div>
      </div>
      <div ref={containerRef} className="min-h-20 overflow-x-auto p-4" />
    </div>
  )
}
