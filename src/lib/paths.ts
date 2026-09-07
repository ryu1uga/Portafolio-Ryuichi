import type { Lang } from '../content/site';

// `base` de astro.config.mjs, normalizado sin barra final ('' cuando el sitio va en la raíz).
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

// Ruta absoluta dentro del sitio, respetando `base`. withBase('ryuichi.webp') -> '/Portafolio-Ryuichi/ryuichi.webp'
export function withBase(path: string): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

// URL completa (dominio + base), para canonical, hreflang y Open Graph. Recibe la ruta SIN base.
export function absolute(path: string): string {
  return new URL(withBase(path), import.meta.env.SITE).toString();
}

// Dónde vive cada idioma, sin base. El español es la raíz; los demás, en su carpeta.
export const LANG_ROUTES: Record<Lang, string> = {
  es: '/',
  en: '/en/',
  ja: '/ja/',
};

// Las mismas rutas con base aplicada, listas para usar en href.
export const LANG_PATHS: Record<Lang, string> = {
  es: withBase(LANG_ROUTES.es),
  en: withBase(LANG_ROUTES.en),
  ja: withBase(LANG_ROUTES.ja),
};
