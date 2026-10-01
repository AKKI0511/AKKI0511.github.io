# AGENTS.md

Akshat Joshi’s personal site. It shows his projects, his writing, and a short account of who he is. Static Astro, strict TypeScript, Markdown and MDX, custom CSS, local fonts. Keep it dark, quiet, and short.

## Where things live

- `src/data/site.ts` has identity, presence rows, profile links, the About story, page titles, and every interface string.
- `src/data/work.ts` has projects (`work`) and older projects (`earlier`). `workYears` and `isActive` format dates.
- `src/content/writing/` has articles in Markdown or MDX, validated by `src/content.config.ts`.
- `src/lib/writing.ts` is the only publication filter. Use `getWriting`, `getHostedWriting`, and `getPublishedWriting`.
- `src/lib/briefing.ts` builds `/llms.txt` (`createIndex`) and `/llms-full.txt` (`createBriefing`) from the same data. `src/lib/ask.ts` builds assistant links.
- `src/components/` has `WorkRow`, `WritingRow`, `Ping` (the Now dot and its popover), and `ReadingDock` (the floating control on articles).
- `src/pages/` has `/`, `/work/`, `/writing/`, `/writing/[id]/`, `/llms.txt`, `/llms-full.txt`, RSS, sitemap, robots, and 404.
- `src/styles/tokens.css` is the design system. `global.css` has the base, the `.index` grid, `.signal`, and `.glass`. `prose.css` styles articles.
- `public/social-v2.png` is the link preview image. Regenerate it when the name, intro, or Now row changes. Change the filename when the image itself changes so caches pick up the new file.

## Page structure

The home page has one order. Name, one sentence, presence rows, links, Work, Writing, About. There is no navigation bar. `/work/` and `/writing/` hold the full lists. The home page shows all of `work` (AgentConnect, Living Matter, QuantTradeAI, SoundSight, SmallBizPal, in that order) and the newest five writing entries, and links to the full pages when more exist.

Every page uses the `.index` grid. A left margin column holds labels (`.hang`), and one reading column holds everything else. From 1100px up, an equal empty margin on the right centres the reading column. Below 760px the grid collapses to one column.

A project row has two levels. Collapsed, it shows the title, the year range, and domain tags. Opened with native `<details>`, it shows the one-line summary, the story, and links. Links go to the real thing. Tags must fit one line at 390px; the tests enforce it.

## Content rules

- Write in Akshat’s voice. Keep it short, direct, and conversational. No slogans, em dashes, emoji, or colons used for effect in prose.
- A project `summary` is one line that sells it. A `story` is an array of paragraphs. Each string is its own block in the open row, so add another string to break. Keep it conversational. No resume metrics, throughput numbers, or architecture diagrams in prose. Assume the reader has never heard of the domain.
- AgentConnect copy describes the Team runtime (v0.5): independently built agents joining as peers, a directory, messaging, outstanding work, and shared conversation history. Do not describe the old Agent / Registry / Hub chain.
- Verosek is a layer between apps and AI agents that routes, scans, and audits requests. It is not only a gateway between agents and tools.
- `tags` name the domain for a cold reader. Two to three short tags.
- Dates are honest. `end: 'now'` renders `2025–` for maintained work. A finished range renders `2025–26`.
- Never invent biography, results, affiliations, dates, metrics, or URLs. Never name private repositories. Never publish a phone number.
- Writing frontmatter supports `title`, `description`, `publishedAt`, `updatedAt`, `kind`, `draft`, `featured`, `tags`, `example`, `url`, and `venue`. Entries with `url` are published elsewhere and get no local page. Drafts appear nowhere. Examples render with a notice, are `noindex`, and stay out of RSS, the sitemap, and the exported files. Keep article IDs stable.

## Visual rules

- Colour. Carbon background, bone text in three steps, one line tone, one raised tone. `--signal` (vermilion) appears only on the Now dot and the favicon.
- Type. Atkinson Hyperlegible Next for text and Atkinson Hyperlegible Mono for labels, years, and tags. No other families.
- No hover styles except a 2px vermilion hairline on the Now dot, and only for fine pointers. A test fails on any other `:hover` rule. Links are underlined. Focus is a 2px bone outline.
- Profile links are words. No brand icons next to GitHub, X, LinkedIn, or Email. NN/g (June 2025) still asks for a visible text label if you use an icon at all; Baymard’s August 2025 EAA note treats extra marks as non-text that needs an alternative. The words are already the links, so the marks go. Grok’s chrome is the same move: text and pills, not icon-plus-label rows.
- `.glass` is only for controls that float above content, which are the Now popover, the reading dock, and its contents sheet.
- No cards, badges, gradients, decorative icons, or scroll effects.
- Remove before adding. A new element must explain a project, link to one, or give context a visitor needs.

## Behaviour

- `Ping` renders the Now dot as a button that opens a native popover with no script. The popover offers assistant links carrying the site index, a copy action for the full file, and an email link. Only the copy action needs JavaScript and it hides without it. Keep the dot looking like a plain status mark; do not add a pointer cursor, label, or animation at rest. A 2px signal ring on hover is the only tell, and only on fine pointers.
- `ReadingDock` is a glass bar at the bottom of articles with home, contents, and top. It hides while the reader scrolls down and returns on scroll up or near the end. Without JavaScript it stays visible and contents still opens.
- Motion is limited to short popover transitions, the dot's single ping on open, and the Now-dot hover ring. Everything respects reduced motion.

## Validation

Run `npm run check`, `npm run build`, `npm run format:check`, then `npm test`. Astro allows one preview server at a time, so stop other `astro preview` processes before testing. The tests cover accessibility at 390 and 1440, overflow from 320 to 1728, hover limited to the Now dot, one-line tags, keyboard access to projects and the Now dot, touch without JavaScript, the briefing copy, the reading dock, publication filtering, and links.

After visual changes, look at the home page, an opened project, the Now popover, `/work/`, `/writing/`, and an article with its dock at 390px and 1440px. A passing build is not a visual check.
