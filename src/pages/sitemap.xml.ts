import type { APIContext } from 'astro';
import { getPublishedWriting, isExternal, writingHref } from '../lib/writing';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export async function GET({ site }: APIContext) {
  const hosted = (await getPublishedWriting()).filter(
    (entry) => !isExternal(entry),
  );
  const paths = ['/', '/work/', '/writing/', ...hosted.map(writingHref)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
