import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    year: z.string(),
    category: z.string(),
    coverImage: z.string(),
    description: z.string(),
    serviceBadges: z.array(z.object({
      slug: z.string(),
      label: z.string()
    })),
    streamingLinks: z.array(z.object({
      platform: z.string(),
      url: z.string()
    })),
    specs: z.array(z.object({
      label: z.string(),
      value: z.string()
    })),
    featured: z.boolean().default(true),
    order: z.number().default(1)
  })
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    title: z.string(),
    number: z.string(),
    summary: z.string(),
    details: z.array(z.string()),
    tagline: z.string(),
    active: z.boolean().default(true),
    order: z.number().default(1)
  })
});

export const collections = {
  proyectos,
  servicios
};
