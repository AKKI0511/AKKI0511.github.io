import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writing'>;

/** Every non-draft entry, newest first. The single publication filter. */
export async function getWriting(): Promise<WritingEntry[]> {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

/** Entries that get a page on this site. External writing only links out. */
export async function getHostedWriting(): Promise<WritingEntry[]> {
  return (await getWriting()).filter(({ data }) => !data.url);
}

/** Entries fit for feeds, sitemaps, and machine-readable exports. */
export async function getPublishedWriting(): Promise<WritingEntry[]> {
  return (await getWriting()).filter(({ data }) => !data.example);
}

export function isExternal(entry: WritingEntry): boolean {
  return Boolean(entry.data.url);
}

export function writingHref(entry: WritingEntry): string {
  return entry.data.url ?? `/writing/${entry.id}/`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatMonth(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '')
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
