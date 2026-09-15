# Minimalist Textured Landing Page Architecture

![Astro](https://img.shields.io/badge/Astro_v5-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

A high-performance static web application built with **Astro 5**, **Zod**, **pnpm**, **CSS Modules**, **Strict TypeScript**, and **Markdown Content Collections**, pre-configured for automated deployment on **Netlify**.

---

## 📋 Table of Contents / Índice de Secciones

1. [Tech Stack & Technical Highlights](#-tech-stack--technical-highlights)
2. [Directory Structure](#-directory-structure)
3. [Design System & Texture Implementation](#-design-system--texture-implementation)
4. [Content Collections Schema Validation (Zod)](#-content-collections-schema-validation-zod)
5. [Development & Build Commands](#-development--build-commands)
6. [Deployment Configuration (Netlify)](#-deployment-configuration-netlify)

---

## 🛠️ Tech Stack & Technical Highlights

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / SSG).
- **Deployment**: [Netlify](https://www.netlify.com/) zero-config static hosting via `netlify.toml`.
- **Schema Validation**: [Zod](https://zod.dev/) re-exported via `astro:content` for strict frontmatter runtime and build-time validation.
- **Package Manager**: `pnpm`.
- **Styling Architecture**: CSS Modules (`*.module.css`) for component-scoped styles and global CSS design tokens.
- **Type Safety**: Strict TypeScript configuration (`astro/tsconfigs/strict`) with full props validation and inferred Zod collection types.
- **Content Management**: File-based Markdown Content Collections using Astro's Content Layer API.
- **Texture System**: Native SVG noise overlay (`feTurbulence`) combined with a dynamic dot-matrix background grid.
- **Navigation & UX**: Responsive layout grid with mobile/tablet drawer navigation and smooth view transitions via Astro `<ClientRouter />`.
- **SEO & Semantics**: HTML5 semantic markup, OpenGraph tags, canonical links, and Schema.org structured data.

---

## 📁 Directory Structure

```text
centella-prod/
├── public/
│   ├── covers/            # SVG vector graphic placeholders for projects
│   └── favicon.svg        # Minimalist studio favicon
├── src/
│   ├── content/           # Content collection entries (.md)
│   │   ├── proyectos/     # Project showcase markdown files
│   │   └── servicios/     # Service offering markdown files
│   ├── components/        # Scoped UI components
│   │   ├── Header.astro & Header.module.css
│   │   ├── Footer.astro & Footer.module.css
│   │   ├── ProjectCard.astro & ProjectCard.module.css
│   │   ├── ServiceCard.astro & ServiceCard.module.css
│   │   └── SeoMeta.astro
│   ├── layouts/           # Structural layouts
│   │   ├── Layout.astro & Layout.module.css
│   ├── pages/             # File-based routing
│   │   ├── index.astro & index.module.css
│   │   ├── acerca-de.astro & acerca-de.module.css
│   │   ├── contacto.astro & contacto.module.css
│   │   ├── 404.astro
│   │   ├── proyectos/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro & proyecto.module.css
│   │   └── servicios/
│   │       ├── index.astro & servicios.module.css
│   ├── styles/            # Design tokens & global CSS resets
│   │   └── global.css
│   └── content.config.ts  # Zod schema definitions for content collections
├── netlify.toml           # Netlify build and publish directory configuration
├── astro.config.mjs       # Astro configuration
├── tsconfig.json          # TypeScript strict configuration
├── .gitignore             # Ignored directories and build artifacts
├── package.json           # Scripts and dependencies
└── pnpm-lock.yaml         # Dependency lockfile
```

---

## 🎨 Design System & Texture Implementation

The visual identity relies on a tactile mineral theme defined via CSS Custom Properties in `src/styles/global.css`:

```css
:root {
  --bg-canvas: #f8f7f4;
  --bg-card: #f1efea;
  --bg-card-hover: #eae7e0;
  --text-main: #141414;
  --text-muted: #5e5d59;
  --border-subtle: #e2ded5;
  --border-strong: #141414;
  --max-width: 1200px;
}
```

### Noise & Grid Overlays
- **Paper Grain Noise**: Rendered via a fixed pointer-events-none SVG overlay with fractally generated `feTurbulence`.
- **Dot Matrix Grid**: Generated using CSS `radial-gradient` repeat pattern to create a subtle blueprint background.

---

## 🗂️ Content Collections Schema Validation (Zod)

All Markdown frontmatter in `src/content/` is strictly validated at build time using **Zod** schemas in `src/content.config.ts`:

```typescript
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
```

---

## 🌐 Deployment Configuration (Netlify)

The repository includes a root `netlify.toml` file that specifies the build command, publish output directory, and security headers:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

To deploy on Netlify:
1. Connect your repository to Netlify.
2. Netlify will automatically detect `netlify.toml`, execute `pnpm build`, and publish `dist/`.

---

## 🚀 Development & Build Commands

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```
Serves the application locally at `http://localhost:4321`.

### Build Production Release
```bash
pnpm build
```
Generates zero-JavaScript static HTML/CSS entrypoints in the `dist/` folder.

### Preview Production Build
```bash
pnpm preview
```

### Run Type Checks
```bash
pnpm exec astro check
```
Verifies strict TypeScript and Zod schema compliance across all `.astro`, `.ts`, and Markdown collection files.
