import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const origin = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: origin,
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [mdx()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
  vite: { build: { sourcemap: false } },
});
