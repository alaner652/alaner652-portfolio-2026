/* ── 內容的英文版 ──
   constants/index.ts 是原文；這裡只放要換掉的欄位，用 slug（作品）或順序（其他）對回去。
   專案名稱不翻，當品牌名。 */

export const WORK_EN: Record<
  string,
  { status: string; result?: string; description: string; highlights?: string[]; lessons?: string[] }
> = {
  labslot: {
    status: 'Live on campus',
    result:
      'A computer-lab booking system for a school, running on its own server, without changing a line of the school’s existing systems.',
    description:
      'Staff sign in with their school account, see each computer lab’s week (scheduled classes and periods already booked), request periods, and an administrator approves. Timetables and roles are read from the school database, read-only; requests and the audit log live in LabSlot’s own SQLite. Frontend and backend ship as one jar, deployed with Docker on the school’s Ubuntu server. Every choice started with one question: will this hold up when nobody is watching it?',
  },
  testa: {
    status: 'Pre-launch',
    result:
      'An online exam system for a school’s admission exam: deployed on the school’s VM, and verified on production images with 300 candidates at once and a full exam with no Internet.',
    description:
      'Teachers write questions, an exam officer schedules the exam and prints login slips, and candidates sit it in a computer lab with a candidate number and login code. Choice and fill-in questions grade themselves; essays are graded anonymously by one or more teachers. Timing, submission and grading happen only on the server, and papers sent to candidates never contain answers. Everything runs on one VM inside the school and works with or without the Internet; an optional AI import turns old papers into questions with a small local model, keeping only the answers the paper itself holds. Next comes a rehearsal in a real lab.',
  },
  'build-the-cat-gunner': {
    status: 'Live',
    result: 'My first self-published Roblox game, after years of client work.',
    description:
      "Lead a squad of cats and fight your way through: roll dice to fuse guns from D up to XX, a boss every 10 stages, rebirth when you reach the end. The first game published under Alaner's Studio, launched October 2026.",
  },
  'tpcu-mcp': {
    status: 'Open source',
    result: 'Agora-AI, rethought: no backend, just an MCP server.',
    description:
      'Wraps the school system (timetable, attendance, grades, leave requests, work-study clock-ins) into 18 MCP tools, so MCP-capable AI apps like Claude Code and Claude Desktop can query and act straight from the chat. stdio transport, no extra backend; credentials stay in memory and never touch disk. Tools with side effects carry destructiveHint and ask the user first. Page flows and parsing rules carried over from Agora-AI, rewritten in TypeScript as a standalone project.',
  },
  'taipei-codefest': {
    status: 'Hackathon award',
    result:
      'Town Pass has so many services that most people struggle to find their way, let alone people with disabilities or older residents; so we built more than an agent and made the service usable. Honorable Mention, Taipei CodeFest 2026.',
    description:
      'An accessible assistant inside Town Pass: say a sentence or tap a suggestion to find accessible toilets or parking, or head to a Town Pass service with the details it already knows; nothing opens until the user confirms, and nothing is submitted for them. Beyond the agent we added accessibility itself: screen-reader support, larger text, haptic and voice feedback. The model runs on the phone, so conversations never reach the cloud. My first hackathon, team of five; I handled the pitch, the agent design and tool integration, starting from the MVP and wrapping Town Pass services and open data into 16 read-only tools.',
    highlights: [
      'I wrote the MVP: Town Pass services wrapped as read-only MCP tools and hooked up to Claude to prove the idea; once it worked, I switched to direct function calls so it could run in the browser and on the phone.',
      'After talking with a mentor we changed how services are connected, to lower the cost of maintaining them: every service and open dataset is a read-only tool, and timeouts, caching and format checks go through one loading layer.',
      'The model never touches URLs or location: URLs come only from a list in the code, and coordinates are used in the browser just for distance.',
      'Read-only by design: queries show directly, other actions wait for the user to confirm, and pages that submit, pay or show personal data are links only.',
      'Proposed a shared service tool registry, where a model on the host parses pages or API docs into tools step by step, so new services need no hand wiring. The team refactored in that direction and a teammate built it.',
    ],
    lessons: [
      'Teamwork is a skill of its own. I used to build alone end to end; this time much of the effort went into aligning and merging.',
      'AI speeds things up but widens gaps in understanding: without low-level experience it is hard to tell a right answer from one that merely runs.',
      'Building it is far from shipping it: Android only, some services still on demo data, and an architecture that feels patched together.',
    ],
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
  soullike: {
    status: 'Playable prototype',
    result:
      'A soulslike boss fight you can play start to finish: combos, blocks, executions, and an enemy that reads your moves.',
    description:
      'A soulslike action game on Roblox that tries to recreate how Souls combat feels as closely as possible; a lot of the time went into studying what each game in the series does and how its numbers work. Five-hit light combo, heavy attack, block, roll i-frames, backstabs and executions; the enemy has a posture bar and staggers when it breaks. Hit timing comes from keyframe markers on the animations, not hand-typed numbers. The enemy notices you by sight, hearing and line of sight, and delays its swings to break your rhythm. Player and enemy share one data-driven state machine, and damage, i-frame and hyper-armor windows are all computed on the server. A faithful recreation is still a long way off: some moves don’t even have animations to build them with yet. Solo, AI-assisted.',
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
      "Playing at first. Then I found out games could be made, and that's where looking up English tutorials and YouTube began. In 2020 I spent the first semester in a sports class and transferred the second. I was deep into Roblox and spent most of my time there.",
  },
  {
    track: 'Games',
    title: 'Started making games and writing code',
    detail:
      'Roblox Studio and Lua: from editing maps to understanding functions, events and objects, until I finished a game of my own.',
  },
  {
    track: 'Freelance',
    title: 'From Robux to paid commissions',
    detail:
      'Started taking commissions in 2022, paid in Robux at first, plus some unpaid collaborations. Later I worked regularly with developers around the world, all in English, on skill systems, combat feel and FPS frameworks; paid work started in 2024. In 2023 I also began learning front end and the web, the first things outside games.',
  },
  {
    track: 'Games',
    title: 'Joined CubexStudios',
    detail:
      "Started writing game scripts with CubexStudios, and later became co-founder and lead scripter. Since 2026 we've been building the studio's own games.",
  },
  {
    track: 'Community',
    title: 'Went out to see how others work',
    detail:
      'Started going to meetups in different fields. That summer I went to a Flutter Meetup as a developer; I was the youngest person in the room.',
  },
  {
    track: 'Security',
    title: 'Slowed down; security took root',
    detail:
      'Fewer events, more time alone digging in; security grew out of this year. Started applying for internships too.',
  },
  {
    track: 'Now',
    title: "A year that hasn't started yet",
    detail:
      "Between April and June I found vulnerabilities in the school system and reported them through HITCON ZeroDay; the computing center brought me in, and I'm still there. In games I'm no longer just the scripter: I'm building the studio's own games with CubexStudios, and I shipped Build The Cat Gunner myself, handling design, UI, balancing, ads and post-launch data. I also built two systems for the school: LabSlot, a computer-lab booking system, and Testa, an online exam system for its admission exam. Part-time work, startup ideas and self-study go on in parallel.",
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
  "small R, alaner652 online. Taught myself Roblox Studio in middle school; in 2022 I started taking Roblox commissions, paid in Robux at first and in cash from 2024. Later I built my own products, front end, back end and deployment all by myself. In 2026 I reported a vulnerability in the school's administrative system, the computing center brought me in, and now I do authorized security work and internal automation there."

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
  lead: 'Roblox scripter focused on combat systems: combos, skills, hit feel and FPS frameworks, and whole games too. Commissions since 2022, paid work since 2024, and now co-founder and lead scripter at CubexStudios.',
  studio:
    'Started scripting for CubexStudios in 2024, including a commissioned sword combat system (Sword System). Later became co-founder and lead scripter; since 2026 we build the studio’s own games.',
  services: [
    {
      label: 'Combat systems',
      description:
        'Combos, skills, blocking and dodging, executions, hit feel (camera shake, hit stun, effect timing), plus FPS frameworks. Damage and hit detection run on the server; the client only says "I swung", so exploits can\'t change the outcome. It\'s the part clients mention most in their reviews.',
      deliverable: 'A combat module that drops into your project',
    },
    {
      label: 'Game systems',
      description:
        'Progression, inventory, gacha and merging, bosses, leaderboards, daily quests, saving. Saves use session-locked ProfileStore, and every remote checks rate limit, types, ownership and balance before it writes anything.',
      deliverable: 'A system module ready to plug in',
    },
    {
      label: 'A whole game',
      description:
        'From design, systems and UI to tuning with live data after launch. Build The Cat Gunner went from first commit to published by one person (AI-assisted). Or I take just the piece you’re missing.',
      deliverable: 'A game ready to publish',
    },
  ],
  servicesNote:
    'Strict Luau in a real editor, automated tests with Lune, synced into Studio with Rojo; tunable numbers live in config.',
  steps: [
    {
      label: 'Talk',
      description:
        "Message me on Discord with the system you need, what kind of game it's for and roughly when. Reference videos help; no spec needed.",
    },
    {
      label: 'Quote',
      description:
        'Quoted per project, paid via PayPal. Scope and deliverables agreed up front; extras are quoted separately, and the price never changes midway.',
    },
    {
      label: 'Build',
      description:
        "A working version first, recorded so you can see it, then we add to it. You get updates as it moves; I won't vanish for two weeks and hand over a bundle.",
    },
    {
      label: 'Handover',
      description:
        'The code is yours: as a Rojo project or dropped straight into your place. Numbers live in config and I’ll show you how to tune them. Issues after handover are covered for an agreed period.',
    },
  ],
  notes: [
    {
      q: 'Can we work in English?',
      a: 'Yes. Most developers I’ve worked with are overseas, and it has always been in English.',
    },
    {
      q: 'How long does it take?',
      a: "Depends on scope. The timeline comes with the quote, and I won't promise what I can't deliver.",
    },
    {
      q: 'Who owns the result?',
      a: 'You do. I only keep the right to show it in my portfolio, and I’ll ask first; confidential work stays out.',
    },
    {
      q: 'Do you take work outside Roblox?',
      a: 'Yes. Web products, LINE bots, automation, system integration and authorized security testing; the cases are in my portfolio.',
    },
  ],
}

/** 照 SKILLS 的順序 */
export const SKILLS_EN_LABELS = [
  'Languages',
  'Game development',
  'Backend and services',
  'Frontend',
  'Infrastructure',
  'Tools and AI',
]
export const SKILL_ITEMS_EN: Record<string, string> = {}

export const EDUCATION_EN = [
  {
    period: '2023 — 2028 (expected)',
    school: 'Taipei City University of Science and Technology',
    program: 'Computer Science and Information Engineering, five-year program',
    note: 'Currently in year four. Also preparing for the 116 special-talent admission.',
  },
]
