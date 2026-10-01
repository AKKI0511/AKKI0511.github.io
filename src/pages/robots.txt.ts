import type { APIContext } from 'astro';

export function GET({ site }: APIContext) {
  const local = !site || ['localhost', '127.0.0.1'].includes(site.hostname);
  return new Response(
    local
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
