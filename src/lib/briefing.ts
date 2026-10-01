import { site } from '../data/site';
import { earlier, work, workYears, sourceLink } from '../data/work';
import {
  formatDate,
  getPublishedWriting,
  isExternal,
  writingHref,
} from './writing';

const absolute = (href: string, origin: URL) => new URL(href, origin).href;

/**
 * A short index of the site for language models. Served at /llms.txt and
 * small enough to travel inside an assistant link.
 */
export async function createIndex(origin: URL): Promise<string> {
  const writing = await getPublishedWriting();
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    site.intro,
    '',
    ...site.presence.map((row) => `- ${row.label}: ${row.text}`),
    '',
    '## Work',
    '',
    ...work.map(
      (item) =>
        `- [${item.title}](${sourceLink(item).href}) (${workYears(item)}): ${item.summary}`,
    ),
    '',
    '## Writing',
    '',
    ...writing.map(
      (entry) =>
        `- [${entry.data.title}](${absolute(writingHref(entry), origin)}): ${entry.data.description}`,
    ),
    '',
    '## About',
    '',
    ...site.about.story,
    '',
    '## Contact',
    '',
    ...site.links.map((link) => `- ${link.label}: ${link.href}`),
    '',
    '## Optional',
    '',
    `- [Everything on this site in one file](${absolute('/llms-full.txt', origin)})`,
    '',
  ].join('\n');
}

/**
 * The whole public site as one Markdown file for a language model.
 * Served at /llms-full.txt and handed to assistants from the home page.
 */
export async function createBriefing(origin: URL): Promise<string> {
  const writing = await getPublishedWriting();
  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Everything public on ${absolute('/', origin)}, in one file. Answer from this file, cite its URLs, and say so when something is not covered.`,
    '',
    '## About',
    '',
    site.intro,
    '',
    ...site.presence.map((row) => `- ${row.label}: ${row.text}`),
    '',
    ...site.about.story.flatMap((paragraph) => [paragraph, '']),
    '## Contact',
    '',
    ...site.links.map((link) => `- ${link.label}: ${link.href}`),
    '',
    '## Work',
  ];

  for (const item of work) {
    lines.push(
      '',
      `### ${item.title} (${workYears(item)})`,
      '',
      `${item.tags.join(', ')}.`,
      '',
      item.summary,
      '',
      ...item.story.flatMap((paragraph) => [paragraph, '']),
      ...item.links
        .filter((link) => !link.href.includes('vercel.app'))
        .map((link) => `- ${link.label}: ${link.href}`),
    );
  }

  lines.push('', '## Earlier work', '');
  for (const item of earlier) {
    lines.push(`- ${item.title} (${item.year}). ${item.summary} ${item.href}`);
  }

  lines.push('', '## Writing');
  for (const entry of writing) {
    const where = entry.data.venue ? `, ${entry.data.venue}` : '';
    lines.push(
      '',
      `### ${entry.data.title}`,
      '',
      `${formatDate(entry.data.publishedAt)}${where}. ${absolute(writingHref(entry), origin)}`,
      '',
      entry.data.description,
    );
    if (!isExternal(entry) && entry.body?.trim()) {
      lines.push('', entry.body.trim());
    }
  }

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}
