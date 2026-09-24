import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, '.pages-dist');
const base = '/InTissue/';
const portal = 'https://intissue-csontblokkok.konyaandras96.chatgpt.site';
const publicRoutes = new Set(['/', '/team', '/contact', '/production']);

// Reuse the existing presentation components without changing the server site.
// Only presentation routes and their images ship to Pages; professional links
// continue to the authenticated portal on its existing host.
function pagesUrls() {
  return {
    name: 'intissue-pages-urls',
    enforce: 'pre',
    transform(code, id) {
      if (!id.startsWith(root) || !/\.(tsx|ts)$/.test(id) || id.includes('/node_modules/')) return;
      return code.replace(/(['"])(\/(?!\/)[A-Za-z0-9_./~?=&#%-]*)\1/g, (match, quote, url) => {
        if (id.includes('/pages/')) return match;
        const [pathname, suffix = ''] = url.split(/(?=[?#])/);
        const target = publicRoutes.has(pathname)
          ? base + (pathname === '/' ? '' : pathname.slice(1) + '/') + suffix
          : /^\/(images\/|it-logo\.jpg)/.test(url) ? base + url.slice(1) : portal + url;
        return quote + target + quote;
      });
    },
  };
}
function config() {
  return {
    configFile: false,
    root: path.join(root, 'pages'),
    base,
    publicDir: false,
    resolve: { alias: { '@': root } },
    plugins: [pagesUrls(), react()],
    css: { postcss: { plugins: [tailwindcss()] } },
  };
}
await build({ ...config(), build: { ssr: 'render.tsx', outDir: path.join(root, '.pages-build'), emptyOutDir: true } });
await build({ ...config(), build: { outDir: out, emptyOutDir: true } });
const { render, routes } = await import(pathToFileURL(path.join(root, '.pages-build/render.js')));
const template = await readFile(path.join(out, 'index.html'), 'utf8');
for (const route of routes) {
  const directory = path.join(out, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), template.replace('<!--app-html-->', render(route)));
}
await cp(path.join(root, 'public/images'), path.join(out, 'images'), { recursive: true });
await cp(path.join(root, 'public/it-logo.jpg'), path.join(out, 'it-logo.jpg'));
await writeFile(path.join(out, '.nojekyll'), '');
await writeFile(path.join(out, '404.html'), '<!doctype html><html lang="hu"><meta charset="utf-8"><title>InTissue</title><h1>Az oldal nem található</h1><a href="/InTissue/">InTissue – főoldal</a></html>');
console.log('GitHub Pages presentation ready: .pages-dist');
