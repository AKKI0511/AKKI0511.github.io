import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPublishedWriting, writingHref } from '../lib/writing';

export async function GET(context: APIContext) {
  return rss({
    title: `${site.name} · Writing`,
    description: site.description,
    site: context.site!,
    items: (await getPublishedWriting()).map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: writingHref(entry),
    })),
  });
}
