import type { APIContext } from 'astro';
import { createBriefing } from '../lib/briefing';

export async function GET({ site }: APIContext) {
  return new Response(await createBriefing(site!), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
