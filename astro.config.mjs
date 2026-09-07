import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages del repositorio ryu1uga/Portafolio-Ryuichi:
// el sitio se sirve en https://ryu1uga.github.io/Portafolio-Ryuichi/
// Las rutas internas pasan por src/lib/paths.ts, que aplica `base` automáticamente.
export default defineConfig({
  site: 'https://ryu1uga.github.io',
  base: '/Portafolio-Ryuichi',
  trailingSlash: 'always',
  integrations: [react()],
});
