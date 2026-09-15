import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://centella-estudio.example.com',
  compressHTML: true,
  scopedStyleStrategy: 'attribute'
});

