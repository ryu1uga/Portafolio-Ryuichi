# Portafolio — Ryuichi Oshiro Ugamoto

Sitio personal hecho con Astro y React. Tres idiomas, cada uno en su propia URL:

| Idioma | Ruta |
|---|---|
| Español | `/` |
| English | `/en/` |
| 日本語 | `/ja/` |

React se usa solo para escribir la página como componente: se renderiza en build y no envía JavaScript al navegador, salvo dos scripts inline de unas pocas líneas que recuerdan el idioma elegido.

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
- `src/layouts/Base.astro`: `<head>` (metadatos, Open Graph, hreflang, fuentes) y el script que recuerda el idioma.
- `src/pages/index.astro` y `src/pages/[lang]/index.astro`: una página por idioma.
- `src/lib/paths.ts`: rutas con `base` y URLs absolutas. Cualquier enlace o asset interno pasa por `withBase()`.
- `public/ryuichi.webp`: foto del hero (400 px). `public/ryuichi-og.jpg`: imagen para Open Graph (800 px).
- `public/sitemap.xml` y `public/robots.txt`: estáticos; si cambian las rutas, actualizarlos a mano.

## Despliegue

GitHub Pages desde `.github/workflows/deploy.yml`: cada push a `main` compila y publica en
`https://ryu1uga.github.io/Portafolio-Ryuichi/`. Solo hay que activarlo una vez en el repo:
**Settings > Pages > Build and deployment > Source: GitHub Actions**.

`site` y `base` viven en `astro.config.mjs`. Si el repo cambia de nombre o se pasa a un dominio propio, ajustar ahí (y en `sitemap.xml` / `robots.txt`); el resto del código no tiene rutas escritas a mano.
