/* ── 內容的英文版 ──
   constants/index.ts 是原文；這裡只放要換掉的欄位，用 slug（作品）或順序（其他）對回去。
   專案名稱不翻，當品牌名。 */

export const WORK_EN: Record<string, { status: string; result?: string; description: string }> = {
  'build-the-cat-gunner': {
    status: 'Live',
    result: 'My first self-published Roblox game, after years of client work.',
    description:
      "Lead a squad of cats and fight your way through: roll dice to fuse guns from D up to XX, a boss every 10 stages, rebirth when you reach the end. The first game published under Alaner's Studio, launched October 2026 and still being updated.",
  },
  'tpcu-mcp': {
    status: 'Open source',
    result: 'Agora-AI, rethought: no backend, just an MCP server.',
    description:
      'Wraps the school system (timetable, attendance, grades, leave requests, work-study clock-ins) into 18 MCP tools, so MCP-capable AI apps like Claude Code and Claude Desktop can query and act straight from the chat. stdio transport, no extra backend; credentials stay in memory and never touch disk. Tools with side effects carry destructiveHint and ask the user first. Page flows and parsing rules carried over from Agora-AI, rewritten in TypeScript as a standalone project.',
  },
  'girls-band-shot': {
    status: 'Live',
    result: 'Three separate old projects merged into one and moved to the web.',
    description:
      'Type a line, find the frame. Merged three separate old projects into one web app; screenshots and GIFs are now generated on demand with ffmpeg plus an LRU cache.',
  },
  order: {
    status: 'Open source',
    result: 'Orders run on a state machine, with SSE for live progress.',
    description:
      'Scan a QR code, log in with LINE, order; each order pushes a Flex Message to the owner. Orders are modeled as a state machine with SSE for progress, and menu snapshots are stored so later menu edits never alter past orders.',
  },
  'alaner652-portfolio': {
    status: 'Live',
    result: "The site you're looking at: designed first, then built page by page from the mockups.",
    description:
      'This site itself. Next.js App Router, Tailwind CSS v4, posts in MDX. The design was settled on a canvas first (dark, few cards, one layout idea per page), then implemented from the mockups. Projects, experience and skills live in a single data file that the home, about and resume pages all read from.',
  },
  'agora-ai': {
    status: 'Paused',
    result: 'An undocumented school API, reverse engineered into 10 agent tools.',
    description:
      'Reverse engineered the undocumented school API and wrapped it into 10 agent tools, so you can just ask "what classes do I have this week". Deployed on a VM provided by the school. Paused for now while I rethink the scope.',
  },
  'easy-tpcu': {
    status: 'Retired',
    result: 'A by-product of analyzing the school system; later the starting point of Agora-AI.',
    description:
      'Logs into the school system, pulls attendance, charts it and posts to Discord. A by-product of analyzing the school system that later became the starting point of Agora-AI.',
  },
  'ave-mujica-bot': {
    status: 'Retired',
    result: 'The first thing I made that people actually used.',
    description:
      'OCR turns subtitles into a JSON index frame by frame, and a Discord bot looks up screenshots. The first thing I made that people actually used; 一句一幀 has since taken over.',
  },
  'foodie-ai': {
    status: 'Offline',
    result:
      'The architecture couldn\'t hold and the backend died, but I learned that "it runs" and "it holds up" are two different things.',
    description:
      'Semantic restaurant recommendations. I still think the idea works, but the architecture couldn\'t hold and the backend died long ago. The first time I understood that "it runs" and "it holds up" are two different things.',
  },
  'osu-map-manager': {
    status: 'Open source',
    result: 'Packaged as an exe so friends can run it without installing Python.',
    description:
      'A beatmap manager I wrote purely for myself, packaged as an exe so friends can run it without installing Python.',
  },
  'cooking-game': {
    status: 'Client work',
    result: 'A complete set of game systems and interaction logic in Luau.',
    description:
      'A cooking-themed Roblox game built during my freelance years, with game systems and interaction logic in Luau. The video is the demo from back then.',
  },
}

/** 照 JOURNEY 的順序 */
export const JOURNEY_EN: { track: string; title: string; detail: string }[] = [
  {
    track: 'Games',
    title: 'Opened Roblox for the first time',
    detail:
      "Playing at first. Then I found out games could be made, and that's where looking up English tutorials and YouTube began.",
  },
  {
    track: 'School change',
    title: 'Sports class, then a transfer',
    detail:
      'First semester in a sports class, transferred the second. I was deep into Roblox and spent most of my time there.',
  },
  {
    track: 'Games',
    title: 'Started making games and writing code',
    detail:
      'Roblox Studio and Lua: from editing maps to understanding functions, events and objects, until I finished a game of my own.',
  },
  {
    track: 'Freelance',
    title: 'People started paying me to write',
    detail:
      'First paid job in 2022. Later I worked regularly with developers around the world, all in English, on skill systems, combat feel and FPS frameworks.',
  },
  {
    track: 'Web',
    title: 'Started on the web',
    detail: 'Began learning front end and the web, the first things outside games.',
  },
  {
    track: 'Community',
    title: 'Went out to see how others work',
    detail:
      'Started going to meetups in different fields. That summer I went to a Flutter Meetup as a developer; I was the youngest person in the room.',
  },
  {
    track: 'Security',
    title: 'Slowed down, then found my first hole',
    detail:
      'Fewer events, more time alone digging in; security grew out of this year. Found my first vulnerability in the school system, reported it through HITCON ZeroDay, and the computing center brought me in. Started applying for internships too.',
  },
  {
    track: 'Now',
    title: "A year that hasn't started yet",
    detail:
      'The computing center work continues. Games, part-time work, startup ideas and self-study go on in parallel.',
  },
]

/** 照 OFFERS 的順序。verb 是首頁 80px 的大字，後面會接一個橘色句點 */
export const OFFERS_EN: { verb: string; label: string; description: string }[] = [
  {
    verb: 'Build',
    label: 'End-to-end delivery',
    description:
      'Front end, back end, deployment and ops, all by one person. 一句一幀 and the breakfast-shop ordering system were built this way.',
  },
  {
    verb: 'Defend',
    label: "Attacker's view",
    description:
      'Look at my own work the way an attacker would. Found an IDOR in a school system, disclosed it responsibly, and was invited into the computing center to fix it.',
  },
  {
    verb: 'Figure it out',
    label: 'Reverse engineering and automation',
    description:
      "Turn undocumented systems into usable APIs and tools. That's where Agora-AI came from.",
  },
]

export const ABOUT_WHO_EN =
  "small R, alaner652 online. Taught myself Roblox Studio in middle school; in 2022 people started paying me to write games. Later I built my own products, front end, back end and deployment all by myself. In 2026 I reported a vulnerability in the school's administrative system, the computing center brought me in, and now I do authorized security work and internal automation there."

export const ABOUT_WORDS_EN = {
  lead: 'What I like keeps changing: games first, then the web, now security. No one at home works in tech and there was no cram school; every step was looked up and figured out alone. The lines below were actually learned along the way, not made up.',
  lines: [
    {
      text: 'If the answer can be found, it can be built.',
      from: 'Opening Roblox Studio for the first time',
    },
    { text: "Building it doesn't mean anyone wants it.", from: 'Roblox freelance work' },
    {
      text: '"It runs" and "it holds up" are two different things.',
      from: 'After the Foodie AI backend died',
    },
    {
      text: "Seeing the problem doesn't mean you have permission to touch it.",
      from: 'The university computing center',
    },
  ],
}

export const HIRE_EN = {
  lead: 'Web products, Roblox games, LINE bots, internal automation, and authorized security testing. One person from brief to launch, so nothing gets lost between three people.',
  services: [
    {
      label: 'Web products',
      description:
        'Ordering, booking, admin panels, event pages: things that actually go live for real users. Front end, back end, database, deployment and domain, all included. You get a working URL, not a folder of code.',
      deliverable: 'A working URL, not a bundle of code',
    },
    {
      label: 'Game development',
      description:
        "Roblox games with full systems in Luau: skills, combat, hit feel, FPS frameworks, progression and inventory. Freelancing since 2022, and I shipped my own game in 2026. I can take the whole game or just the system you're missing.",
      deliverable: 'A playable game, or a system module that fits your project',
    },
    {
      label: 'LINE bots and automation',
      description:
        'LINE official accounts, Flex Message pushes, Discord bots, scheduled notifications. Turn the thing someone does by hand every day into a script, or plug it into your existing workflow.',
      deliverable: 'A running bot or script',
    },
    {
      label: 'Reverse engineering and integration',
      description:
        'Legacy systems with no docs, services with a web UI but no API: figure them out, wrap them into a usable API, then connect them to something new.',
      deliverable: 'A callable API',
    },
    {
      label: 'Security testing',
      description:
        'Vulnerability testing on web apps within written authorization (IDOR, XSS, CSRF, permission design), delivered as a report you can actually read, and fixed together if you want. Authorized work only.',
      deliverable: 'A readable report plus fix recommendations',
    },
  ],
  /** 第五項的例子不是作品，顯示用 */
  securityExample: 'Security work on a university system',
  steps: [
    {
      label: 'Talk',
      description:
        "Email me what you want to build, who it's for, and roughly when. No spec needed. I reply within a day or two and confirm whether I can do it.",
    },
    {
      label: 'Quote',
      description:
        'Quoted per project, not hourly. Scope and deliverables in writing; extras are quoted separately, and the price never changes midway.',
    },
    {
      label: 'Build',
      description:
        "A usable version first so you can try it, then we add to it. You see progress as it happens; I won't vanish for two weeks and hand over a bundle.",
    },
    {
      label: 'Handover and support',
      description:
        "The source code is yours. I'll show you how to deploy, manage the domain and edit text and images until you can do it yourself. Issues after launch are handled for an agreed period.",
    },
  ],
  notes: [
    {
      q: "What don't you take?",
      a: "Pure visual design, native iOS / Android apps, and 24/7 on-call operations. I'm not good at those and will point you to someone else.",
    },
    {
      q: 'How long does it take?',
      a: 'Depends on scope. A LINE bot or a single-page event site usually takes one to two weeks; something the size of the ordering system, one to two months. The timeline comes with the quote.',
    },
    {
      q: 'Who owns the result?',
      a: "You do. Source code, domain and accounts are all in your name. I only keep the right to show it in my portfolio, and I'll ask first.",
    },
    {
      q: 'What does security testing require?',
      a: "Written authorization from the system owner, with scope and time window spelled out. Without it I don't touch anything. That's the line.",
    },
  ],
}

/** 照 SKILLS 的順序 */
export const SKILLS_EN_LABELS = [
  'Languages',
  'Backend and data',
  'Frontend',
  'Infrastructure',
  'Security',
]
export const SKILL_ITEMS_EN: Record<string, string> = { 負責任揭露: 'Responsible disclosure' }

export const EDUCATION_EN = [
  {
    period: '2023 — 2028 (expected)',
    school: 'Taipei City University of Science and Technology',
    program: 'Computer Science and Information Engineering, five-year program',
    note: 'Currently in year four. Also preparing for the 116 special-talent admission.',
  },
]
