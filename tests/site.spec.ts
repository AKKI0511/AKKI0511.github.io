import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { work } from '../src/data/work';

const article = '/writing/a-place-for-unfinished-thinking/';
const pages = ['/', '/work/', '/writing/', '/404.html'];

test('every page is readable and accessible from 320px to wide desktop', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440, 1728]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} overflows at ${width}px`,
      ).toBe(true);
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(result.violations, `${path} at ${width}px`).toEqual([]);
      }
    }
  }
});

test('projects open in place and only the live dot reacts to hover', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('details.work')).toHaveCount(work.length);
  const first = page.locator('details.work').first();
  await expect(first.locator('.tags')).toBeVisible();
  await expect(first.locator('.detail')).toBeHidden();
  await first.locator('summary').click();
  await expect(first.locator('.detail')).toBeVisible();
  for (const path of pages) {
    await page.goto(path);
    const hover = await page.evaluate(async () => {
      const chunks: string[] = [];
      for (const el of document.querySelectorAll('style'))
        chunks.push(el.textContent ?? '');
      for (const link of document.querySelectorAll<HTMLLinkElement>(
        'link[rel="stylesheet"]',
      )) {
        chunks.push(await (await fetch(link.href)).text());
      }
      return (
        chunks
          .join('\n')
          .match(/[^{}]*:hover[^{]*\{[^}]*\}/g)
          ?.map((rule) => rule.trim()) ?? []
      );
    });
    if (path === '/') {
      expect(hover, path).toHaveLength(1);
      expect(hover[0]).toContain('.ping');
      expect(hover[0]).toContain(':hover');
    } else {
      expect(hover, path).toEqual([]);
    }
  }
});

test('tags hold one line on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const lines = await page
    .locator('.work .tags')
    .evaluateAll((els) =>
      els.map(
        (el) =>
          el.getBoundingClientRect().height /
          parseFloat(getComputedStyle(el).lineHeight),
      ),
    );
  for (const count of lines) expect(count).toBeLessThan(1.5);
});

test('keyboard reaches projects and the live dot with visible focus', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content')).toBeFocused();
  await page.locator('details.work summary').first().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details.work').first()).toHaveAttribute(
    'open',
    '',
  );
  const dot = page.getByRole('button', { name: 'Ping Akshat' });
  await dot.focus();
  expect(await dot.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    'solid',
  );
  await page.keyboard.press('Enter');
  await expect(page.locator('#ping')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#ping')).toBeHidden();
});

test('without scripts, projects and the ping still open by touch', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    hasTouch: true,
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await page.locator('details.work summary').first().tap();
  await expect(page.locator('.detail').first()).toBeVisible();
  await page.getByRole('button', { name: 'Ping Akshat' }).tap();
  await expect(page.locator('#ping')).toBeVisible();
  await expect(page.locator('#ping .copy')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Ask Grok' })).toBeVisible();
  await context.close();
});

test('the ping hands the site to an assistant and copies it exactly', async ({
  page,
  context,
  request,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Ping Akshat' }).click();
  const file = await (await request.get('/llms-full.txt')).text();
  const index = await (await request.get('/llms.txt')).text();
  for (const name of ['Grok', 'ChatGPT', 'Claude']) {
    const href = await page
      .getByRole('link', { name: `Ask ${name}` })
      .getAttribute('href');
    const prompt = decodeURIComponent(href!.split('?q=')[1]);
    expect(prompt).toContain(index.trim());
    expect(prompt).toContain(
      'Introduce Akshat to me like a mutual friend who knows both of us.',
    );
    expect(prompt).not.toContain('vercel.app');
  }
  const requests: string[] = [];
  page.on('request', (req) => requests.push(req.url()));
  await page.getByRole('button', { name: 'Copy full profile' }).click();
  await expect(page.locator('#ping .copy')).toHaveText('Copied');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  // Some system clipboards rewrite line endings to CRLF.
  expect(copied.replaceAll('\r\n', '\n')).toBe(file);
  expect(requests).toEqual([]);
  for (const item of work) expect(file).toContain(`### ${item.title}`);
  expect(file).toContain('github.com/AKKI0511/living-matter');
  expect(file).not.toContain('vercel.app');
  expect(file).not.toContain('A place for unfinished thinking');
  expect(index).not.toContain('vercel.app');
  expect(index).toContain('akki0511.github.io/AgentConnect');
  expect(await (await request.get('/llms.txt')).text()).toContain(
    '/llms-full.txt',
  );
});

test('drafts and the layout sample stay off the site', async ({
  request,
  page,
}) => {
  expect((await request.get('/writing/unpublished-draft/')).status()).toBe(404);
  expect((await request.get(article)).status()).toBe(404);
  expect(
    (
      await request.get('/writing/agentconnect-decentralized-collaboration/')
    ).status(),
  ).toBe(404);
  const rss = await (await request.get('/rss.xml')).text();
  expect(rss).toContain('readytensor.ai');
  expect(rss).not.toContain('unfinished-thinking');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/work/');
  expect(sitemap).not.toContain('unfinished-thinking');
  await page.goto('/');
  await expect(page.getByText('A place for unfinished thinking')).toHaveCount(
    0,
  );
});

test('same-site links resolve', async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const urls = await page
      .locator('a[href], link[rel="icon"], link[rel="alternate"]')
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute('href') ?? ''),
      );
    for (const url of urls)
      if (url.startsWith('/') && !url.startsWith('//')) destinations.add(url);
  }
  for (const url of destinations)
    expect((await request.get(url)).ok(), url).toBe(true);
});
