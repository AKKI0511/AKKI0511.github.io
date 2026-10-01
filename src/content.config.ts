import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    kind: z.enum(['essay', 'note']),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    example: z.boolean().default(false),
    // Writing published elsewhere. Listed here, linked out, and given no local route.
    url: z.url().optional(),
    venue: z.string().optional(),
  }),
});

export const collections = { writing };
