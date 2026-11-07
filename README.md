# Estudio Centella — Sitio Web y Catálogo Discográfico

![Astro](https://img.shields.io/badge/Astro_v7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)

Aplicación web estática de alto rendimiento para **Estudio Centella** (producción musical, mezcla y consultoría artística en Santiago, Chile), construida con **Astro 7**, **Zod**, **pnpm**, **CSS Modules**, **TypeScript estricto** y **Content Collections**, preconfigurada para despliegue continuo en **Netlify**.

---

## Índice de Secciones

1. [Stack Tecnológico y Arquitectura](#stack-tecnológico-y-arquitectura)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Sistema de Diseño y Textura Visual](#sistema-de-diseño-y-textura-visual)
4. [Colecciones de Contenido y Validación (Zod)](#colecciones-de-contenido-y-validación-zod)
5. [Optimizaciones de Rendimiento](#optimizaciones-de-rendimiento)
6. [Despliegue en Netlify](#despliegue-en-netlify)
7. [Comandos de Desarrollo y Build](#comandos-de-desarrollo-y-build)

---

## Stack Tecnológico y Arquitectura

- **Framework**: [Astro 7](https://astro.build/) (`7.4.x`, Static Site Generation / SSG).
- **Entorno de Ejecución**: Node.js `v24.22.2` LTS en desarrollo local y `NODE_VERSION = "24"` en Netlify (mínimo exigido por Astro 7: `>= 22.23.4`).
- **Gestor de Paquetes**: `pnpm`.
- **Validación de Esquemas**: [Zod](https://zod.dev/) importado desde `astro/zod` mediante Content Layer API (`glob` loader).
- **Estilos**: CSS Modules (`*.module.css`) con alcance aislado por componente y variables globales de diseño en `src/styles/global.css`.
- **Tipado Estricto**: Configuración `astro/tsconfigs/strict` verificada con `@astrojs/check`.
- **Navegación y Persistencia**: Enrutamiento cliente con View Transitions (`<ClientRouter />`), precarga inteligente de rutas (`prefetch`) y sintetizador ambiental generativo con Web Audio API persistente entre páginas (`transition:persist`).
- **SEO y Accesibilidad**: HTML5 semántico, metadatos OpenGraph/Twitter, URLs canónicas, datos estructurados Schema.org y soporte para modos de alto contraste (`forced-colors`) y movimiento reducido (`prefers-reduced-motion`).

---

## Estructura del Proyecto

```text
centella-prod/
├── public/
│   ├── covers/            # Placeholders vectoriales SVG (OpenGraph por defecto)
│   └── favicon.svg        # Favicon del estudio
├── src/
│   ├── assets/
│   │   └── covers/        # Carátulas e imágenes de estudio procesadas por astro:assets
│   ├── components/        # Componentes UI con CSS Modules
│   │   ├── AmbientAudio.astro & AmbientAudio.module.css
│   │   ├── Footer.astro & Footer.module.css
│   │   ├── Header.astro & Header.module.css
│   │   ├── ProjectCard.astro & ProjectCard.module.css
│   │   ├── ProjectFilter.astro & ProjectFilter.module.css
│   │   ├── ProjectGridCard.astro & ProjectGridCard.module.css
│   │   ├── ProjectsCarousel.astro & ProjectsCarousel.module.css
│   │   ├── SeoMeta.astro
│   │   └── ServiceCard.astro & ServiceCard.module.css
│   ├── content/           # Entradas Markdown validadas en build
│   │   ├── proyectos/     # Fichas del catálogo discográfico (.md)
│   │   └── servicios/     # Servicios, planes y modalidades (.md)
│   ├── layouts/
│   │   └── Layout.astro & Layout.module.css
│   ├── pages/             # Rutas estáticas basadas en archivos
│   │   ├── index.astro & index.module.css
│   │   ├── acerca-de.astro & acerca-de.module.css
│   │   ├── contacto.astro & contacto.module.css
│   │   ├── 404.astro
│   │   ├── proyectos/
│   │   │   ├── index.astro & proyectos.module.css
│   │   │   └── [slug].astro & proyecto.module.css
│   │   └── servicios/
│   │       ├── index.astro & servicios.module.css
│   │       └── [slug].astro & servicio.module.css
│   ├── styles/
│   │   └── global.css     # Tokens de diseño, reset, textura y View Transitions
│   ├── utils/
│   │   └── images.ts      # Resolución de portadas hacia ImageMetadata (astro:assets)
│   └── content.config.ts  # Esquemas Zod para proyectos y servicios
├── astro.config.mjs       # Configuración de Astro y prefetching
├── netlify.toml           # Configuración de build, Node 24, seguridad y caché
├── tsconfig.json          # Configuración TypeScript estricta
├── package.json           # Scripts y dependencias
└── pnpm-lock.yaml         # Lockfile de dependencias
```

---

## Sistema de Diseño y Textura Visual

La identidad visual emplea una paleta editorial cálida y minimalista definida con propiedades personalizadas CSS en `src/styles/global.css`:

```css
:root {
  --bg-canvas: #f8f7f4;
  --bg-card: #f1efea;
  --bg-card-hover: #eae7e0;
  --bg-dark: #161616;
  --text-main: #141414;
  --text-muted: #5e5d59;
  --text-light: #96938a;
  --text-inverse: #f8f7f4;
  --border-subtle: #e2ded5;
  --border-strong: #141414;
  --accent-stone: #d4cfc3;
  --max-width: 1200px;
}
```

- **Grano de Papel (`body::before`)**: Superposición fija (`pointer-events: none`) con filtro SVG `feTurbulence` repetido en mosaicos de `160x160px`.
- **Retícula de Puntos (`body::after`)**: Patrón sutil de `24x24px` generado con `radial-gradient`.
- **Tipografías de Sistema**: Pilas nativas `sans-serif`, `serif` y `monospace` sin descarga de fuentes externas que bloqueen el primer pintado.

---

## Colecciones de Contenido y Validación (Zod)

Todo el frontmatter en `src/content/` se valida en tiempo de compilación mediante `src/content.config.ts` usando `astro/zod` y `glob`:

- **`proyectos` (`src/content/proyectos/*.md`)**:
  - Campos principales: `title`, `artist`, `year`, `category`, `coverImage`, `description`, `serviceBadges`, `streamingLinks`, `specs`, `featured`, `order`.
  - Las rutas declaradas en `coverImage` (ej. `"/covers/archivo.jpg"`) se resuelven automáticamente hacia `src/assets/covers/` mediante `resolveCoverImage()` en `src/utils/images.ts`.
- **`servicios` (`src/content/servicios/*.md`)**:
  - Campos principales: `title`, `number`, `summary`, `details`, `tagline`, `active`, `order`, `image`, `note` y arreglo opcional `plans`.
  - Cada modalidad en `plans` soporta `name`, `sessions`, `subtitle`, `description`, `details` (distribución de sesiones), `profile` (perfil del proyecto), `requirements` (requerimientos técnicos) y campos tarifarios (`basePrice`, `basePriceLabel`, `promoMixPrice`, `totalPromoPrice`, `bulkPrice`, `bulkLabel`, `highlight`).

---

## Optimizaciones de Rendimiento

El proyecto incorpora optimizaciones específicas de carga, decodificación de medios, uso del hilo principal y composición gráfica (incluyendo ajustes específicos para motores **WebKit / Safari en macOS**):

### 1. Compresión y Dimensionamiento de Imágenes (`astro:assets` + WebP)
- Las carátulas e imágenes locales ubicadas en `src/assets/covers/` se procesan en tiempo de compilación con el componente `<Image />` de Astro y Sharp, generando variantes **WebP** ajustadas exactamente al tamaño de visualización Retina 2x (`440x440` en carrusel, `520x520` en catálogo, `760x760` en detalle de proyecto y `900x675` en detalle de servicio).
- Esta conversión redujo el peso total de portadas en el inicio de **~6.6 MB a ~257 KB** (~96% de ahorro; por ejemplo, portadas individuales de `3.83 MB` y `1.43 MB` pasaron a `29 KB` y `23 KB`).
- Las fotografías externas de las tarjetas de servicios en el inicio utilizan parámetros ajustados (`w=760&q=75&auto=format`) junto con `<link rel="preconnect" href="https://images.unsplash.com" crossorigin />` para adelantar la negociación DNS/TLS.

### 2. Priorización de Carga y Estabilidad de Layout (LCP y CLS)
- **Prioridad alta en elementos LCP**: La imagen principal sobre el pliegue en fichas de proyecto, páginas de servicio y primer ítem del catálogo utiliza `loading="eager"` y `fetchpriority="high"`.
- **Despriorización fuera de pantalla**: Los grupos clonados y diapositivas inicialmente ocultas del carrusel horizontal usan `loading="lazy"` y `fetchpriority="low"` para no competir por ancho de banda con la navegación ni el documento principal.
- Todas las imágenes declaran atributos `width` y `height` explícitos para reservar proporción y evitar saltos de diseño (CLS = 0).

### 3. Fluidez de View Transitions y Renderizado en Safari (macOS)
- **Textura SVG en mosaico ligero**: El filtro `feTurbulence` de `body::before` se limita a `numOctaves='1'` con `background-size: 160px 160px` y `background-repeat: repeat`, evitando que WebKit recalcule ruido fractal por CPU sobre millones de píxeles en pantallas Retina durante las capturas de transición.
- **Capa única de transición**: Se eliminó la doble animación simultánea entre `root` y `<main>` dejando una única transición rápida de opacidad (`120ms` salida / `150ms` entrada) sobre `root`, evitando desplazamientos verticales del encabezado fijo y reduciendo la latencia percibida entre páginas.

### 4. Hilo Principal Despejado y Ciclo de Vida de Scripts
- **Delegación única sin fuga de eventos**: Los scripts interactivos (`Header.astro`, `ProjectFilter.astro`, `ProjectsCarousel.astro` y `AmbientAudio.astro`) registran sus listeners globales una sola vez mediante banderas en `window`, evitando acumulación de eventos o clonación repetida de nodos DOM al navegar con `<ClientRouter />`.
- **Cero *layout thrashing* en el carrusel**: El ancho del grupo en `ProjectsCarousel.astro` se almacena en caché mediante `ResizeObserver` en lugar de consultar `offsetWidth` en cada cuadro a `60fps`.
- **Pausa inteligente**: El bucle `requestAnimationFrame` del carrusel se detiene automáticamente al salir del viewport (`IntersectionObserver`) y se cancela de inmediato en el evento `astro:before-preparation` apenas el usuario hace clic en un enlace, liberando el hilo principal antes de iniciar la transición de página.

### 5. Precarga de Rutas y Caché Inmutable en CDN
- **Prefetching nativo**: Activado globalmente en `astro.config.mjs` (`prefetchAll: true`, `defaultStrategy: 'hover'`) y reforzado con `data-astro-prefetch="viewport"` en los 5 enlaces principales del encabezado para que el cambio entre secciones principales sea instantáneo en todos los navegadores (incluido Safari).
- **Caché de larga duración**: Todos los recursos compilados con hash bajo `/_astro/*` (CSS, JS e imágenes WebP) se sirven con `Cache-Control: public, max-age=31536000, immutable`.

---

## Despliegue en Netlify

El archivo `netlify.toml` define la versión requerida de Node.js para Astro 7, las cabeceras de seguridad y la política de caché para activos estáticos:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "24"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Comandos de Desarrollo y Build

### Instalar dependencias
```bash
pnpm install
```

### Servidor de desarrollo local
```bash
pnpm dev
```
Disponible en `http://localhost:4321`.

### Verificar tipos y esquemas de contenido
```bash
pnpm astro check
```
Valida TypeScript estricto, plantillas `.astro` y el frontmatter de todas las colecciones Markdown.

### Compilar versión de producción
```bash
pnpm build
```
Genera las rutas estáticas y las imágenes WebP optimizadas dentro de `dist/`.

### Previsualizar el build de producción
```bash
pnpm preview
```
