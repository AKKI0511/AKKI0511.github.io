import type { APIContext } from 'astro';
import { createIndex } from '../lib/briefing';

export async function GET({ site }: APIContext) {
  return new Response(await createIndex(site!), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
