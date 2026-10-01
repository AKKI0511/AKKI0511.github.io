# Akshat Joshi

Personal site. Astro, strict TypeScript, Markdown and MDX, static output, local fonts, custom CSS.

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4321`.

```sh
npm run check
npm run build
npm run format:check
npm test
```

`npm run format` formats the project. Build output goes to `dist/`. `SITE_URL` sets the origin for canonical URLs, RSS, the sitemap, and `llms.txt`. It defaults to `http://localhost:4321`, which also marks every page `noindex`.

Browser tests use Playwright Chromium. Install it once with `npx playwright install chromium`. Run tests after building. They start a preview on port 4322, and Astro allows one preview server at a time, so stop any other `astro preview` first.

To add writing, put a Markdown or MDX file in `src/content/writing/`. To add or change a project, edit `src/data/work.ts`. `AGENTS.md` covers the rest.
