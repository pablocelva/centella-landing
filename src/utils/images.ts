import type { ImageMetadata } from 'astro';

const localCovers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/covers/*.{jpeg,jpg,png,webp,avif}',
  { eager: true }
);

/**
 * Resuelve rutas de portadas (ej. "/covers/archivo.jpg" o "archivo.jpg")
 * hacia el objeto ImageMetadata de src/assets/covers para optimizarlas con <Image />.
 */
export function resolveCoverImage(imagePath?: string): ImageMetadata | undefined {
  if (!imagePath) return undefined;
  const fileName = imagePath.split('/').pop();
  if (!fileName) return undefined;
  const assetKey = `/src/assets/covers/${fileName}`;
  return localCovers[assetKey]?.default;
}
