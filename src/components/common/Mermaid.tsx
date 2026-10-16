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
          primaryColor: '#1E2227',
          primaryBorderColor: '#3A3F46',
          primaryTextColor: '#F2EFE9',
          secondaryColor: '#16191D',
          tertiaryColor: '#16191D',
          lineColor: '#A3A7AE',
          textColor: '#F2EFE9',
          edgeLabelBackground: '#0E1013',
          clusterBkg: 'transparent',
          clusterBorder: '#3A3F46',
          titleColor: '#F2EFE9',
          nodeBorder: '#3A3F46',
          mainBkg: '#1E2227',
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
    <div className="border-line bg-bg-deep my-[1.6em] overflow-hidden border-y">
      <div ref={containerRef} className="flex min-h-20 justify-center overflow-x-auto py-6" />
    </div>
  )
}
