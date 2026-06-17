# small R — Personal Site

A single-page personal brand site for **alaner652 (small R)** — an 18-year-old full-stack engineer and security tinkerer in Taipei.

Positioning: **Engineer → Founder, in progress.** The site is built to show evidence, not vision — concrete work (security disclosures, shipped products, real metrics) over abstract claims.

- **Live:** <https://alaner652.com>
- **GitHub:** <https://github.com/alaner652>
- **Featured project (linked from the site):** [Agora-AI](https://github.com/alaner652/Agora-AI)

---

## Tech

Plain **HTML + CSS + vanilla JS** in a single self-contained file. No framework, no build step, no dependencies except Google Fonts (Space Grotesk · JetBrains Mono · Inter) loaded over CDN.

> Migrating to Next.js later? See `CLAUDE.md` → *Current state & stack*. Port the markup and lift the `:root` tokens into a global stylesheet — don't redesign.

## Run locally

It's one file, so just open it:

```bash
open index.html        # macOS
# or double-click index.html
```

To serve it (correct relative paths, live preview):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
.
├── index.html     # the whole site: markup + <style> + <script>
├── CLAUDE.md      # design system + content rules for Claude Code (read first)
└── README.md      # this file
```

Everything lives in `index.html`:

- **Design tokens** — the `:root` block at the top of `<style>` (colors + fonts). Single source of truth.
- **Signature element** — the live status panel (`.panel`) in the hero: boot-reveal rows, live GMT+8 clock, LIVE pill.
- **Sections** — `#about`, `#mindoyo`, `#work`, `#experience`, `#writing`, `#now`, philosophy, footer.

## Editing quick-reference

| Want to change… | Where |
|---|---|
| Hero status rows (Building / Researching / …) | `.rows` inside `.panel` |
| At-a-glance numbers | `.stats` strip below the CTAs |
| Featured work + metric chips | `.work-grid` → `.card` / `.metric` |
| Experience entries | `.xp` rows |
| Colors / fonts | `:root` variables |

Keep the bilingual split: **English** for chrome/titles/labels, **Traditional Chinese** for prose. Full conventions and guardrails are in `CLAUDE.md`.

## Deploy

Static site — host anywhere. Drop-in options:

- **Vercel / Cloudflare Pages / Netlify** — connect the repo, framework preset *Other*, no build command, output dir `.`
- **GitHub Pages** — Settings → Pages → deploy from branch root

## Roadmap

- [ ] Agora-AI case study page (highest value for the 百川 application)
- [ ] Replace placeholder "Latest writing" with the real first post; wire up Writing topics
- [ ] Fill correct dates in Experience
- [ ] Refresh Agora-AI metrics as they change
- [ ] OG image + meta, favicon, sitemap

## Notes

Design and content shaped with Claude. Conventions that should survive future edits live in **`CLAUDE.md`** — read it before making changes.

Public page about real security work: never publish exploitable detail (endpoints, payloads, live vulnerabilities). Vulnerability *classes* as competency, framed as authorized / responsible / remediated, only. See `CLAUDE.md` → *Safety guardrail*.