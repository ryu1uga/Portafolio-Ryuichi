# Portafolio — Ryuichi Oshiro Ugamoto

Sitio personal hecho con Astro y React. Tres idiomas, cada uno en su propia URL:

| Idioma | Ruta |
|---|---|
| Español | `/` |
| English | `/en/` |
| 日本語 | `/ja/` |

React se usa solo para escribir la página como componente: se renderiza en build. El único JavaScript que llega al navegador es un script pequeño (tema claro/oscuro, sección activa, aparición al hacer scroll, parallax del cuadro, copiar correo y relojes Lima/Tokio) más dos inline que recuerdan idioma y tema. Sin JS la página se ve completa.

## Diseño

Identidad nikkei en clave editorial: tinta sobre carbón (tema oscuro por defecto) o sobre papel washi (tema claro, también sigue la preferencia del sistema). Tipografías Shippori Mincho (títulos), IBM Plex Sans JP (texto) y IBM Plex Mono (metadatos). El hero lleva un cuadro sumi-e de la Costa Verde bajo la garúa con la firma en kanji y el sello; el bloque de contacto, una pincelada bermellón. Ambas imágenes se generaron con Higgsfield y viven en `public/art/`.

## Comandos

```bash
npm install
npm run dev      # servidor local en http://localhost:4321/Portafolio-Ryuichi/
npm run build    # genera dist/
npm run preview  # sirve dist/ para revisar
```

## Dónde editar

- `src/content/site.ts`: todo el texto en los tres idiomas (ES / EN / JA), incluidos título y descripción de la página. Es el único archivo que hay que tocar para cambiar contenido.
- `src/styles/global.css`: colores, tipografías y layout.
- `src/components/Portfolio.tsx`: estructura de la página y selector de idioma.
- `src/styles/motion.css`: todas las animaciones y transiciones (telón de entrada, hero, cinta del stack, aparición con scroll, cambio de tema e idioma). Los tiempos se ajustan aquí.
- `src/scripts/motion.ts`: lo que necesita JS (trazo de pincel del puntero, inclinación de tarjetas, progreso de scroll, cinta). Sin JS o con "reducir movimiento" activado, la página se ve completa y quieta.
- `src/layouts/Base.astro`: `<head>` (metadatos, Open Graph, hreflang, fuentes) y el script que recuerda el idioma.
- `src/pages/index.astro` y `src/pages/[lang]/index.astro`: una página por idioma.
- `src/lib/paths.ts`: rutas con `base` y URLs absolutas. Cualquier enlace o asset interno pasa por `withBase()`.
- `public/ryuichi.webp`: foto del hero (400 px). `public/ryuichi-og.jpg`: imagen para Open Graph (800 px).
- `public/art/sumi.webp` y `public/art/stroke.webp`: cuadro del hero y pincelada del bloque de contacto.
- `public/sitemap.xml` y `public/robots.txt`: estáticos; si cambian las rutas, actualizarlos a mano.

## Despliegue

GitHub Pages desde `.github/workflows/deploy.yml`: cada push a `main` compila y publica en
`https://ryu1uga.github.io/Portafolio-Ryuichi/`. Solo hay que activarlo una vez en el repo:
**Settings > Pages > Build and deployment > Source: GitHub Actions**.

`site` y `base` viven en `astro.config.mjs`. Si el repo cambia de nombre o se pasa a un dominio propio, ajustar ahí (y en `sitemap.xml` / `robots.txt`); el resto del código no tiene rutas escritas a mano.
