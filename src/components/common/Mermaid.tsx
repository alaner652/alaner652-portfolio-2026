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
        themeVariables: {
          background: '#14171E',
          primaryColor: '#1A1E27',
          primaryBorderColor: '#262B35',
          primaryTextColor: '#E9EAED',
          secondaryColor: '#14171E',
          tertiaryColor: '#14171E',
          lineColor: '#5E6470',
          textColor: '#9AA0AD',
          edgeLabelBackground: '#14171E',
          clusterBkg: '#14171E',
          titleColor: '#E9EAED',
        },
      })

      const el = document.createElement('pre')
      el.className = 'mermaid'
      el.textContent = chart.trim()
      container.replaceChildren(el)

      mermaid.run({ nodes: [el] }).catch((err) => {
        console.error('[Mermaid]', err)
      })
    })

    return () => {
      active = false
    }
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto flex justify-center rounded-[10px] border border-line-soft bg-panel p-4 min-h-20"
    />
  )
}
