'use client'

import { FileDown } from 'lucide-react'

interface ResumeExportProps {
  name: string
  nameZh: string
  title: string
  url: string
  github: string
  location: string
}

/**
 * One-click resume export. Serializes the rendered resume into a Word-compatible
 * .doc (HTML-in-Word), which Google Docs / Word import directly — no backend or
 * OAuth needed. Captures what's on screen: the prose body plus a header built
 * from props, with section icons stripped so they don't leak into the document.
 */
export function ResumeExport({ name, nameZh, title, url, github, location }: ResumeExportProps) {
  function handleExport() {
    const prose = document.querySelector('.prose-portfolio')
    if (!prose) return

    const clone = prose.cloneNode(true) as HTMLElement
    clone.querySelectorAll('svg').forEach((el) => el.remove())
    const body = clone.innerHTML

    const stripProtocol = (u: string) => u.replace(/^https?:\/\//, '')

    const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${name} — Resume</title><style>
@page { margin: 1in; }
body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #111; line-height: 1.45; }
h1 { font-size: 22pt; font-weight: 700; margin: 0 0 2pt; }
.zh { font-size: 12pt; font-weight: 400; color: #666; margin-left: 6pt; }
.subtitle { font-size: 11pt; color: #444; margin: 0 0 3pt; }
.contact { font-size: 9.5pt; color: #555; margin: 0 0 6pt; }
h2 { font-size: 13pt; font-weight: 700; margin: 18pt 0 6pt; padding-bottom: 3pt; border-bottom: 1px solid #ccc; }
p { margin: 4pt 0; }
ul { margin: 4pt 0; padding-left: 18pt; }
li { margin: 2pt 0; }
strong { font-weight: 700; }
hr { display: none; }
</style></head><body>
<h1>${name}<span class="zh">${nameZh}</span></h1>
<p class="subtitle">${title}</p>
<p class="contact">${stripProtocol(url)} · ${stripProtocol(github)} · ${location}</p>
${body}
</body></html>`

    const blob = new Blob(['﻿', html], { type: 'application/msword' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${name.replace(/\s+/g, '-')}-Resume.doc`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      title="下載 .doc，上傳 Google Drive 即可用 Google Docs 開啟編輯"
      className="hover:text-amber flex cursor-pointer items-center gap-[6px] font-mono text-[0.78rem] transition-colors duration-[180ms]"
    >
      <FileDown size={13} />
      google docs
    </button>
  )
}
