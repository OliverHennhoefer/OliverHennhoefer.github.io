import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, extname, relative } from 'node:path';

const root = resolve('dist');
const origin = 'https://oliverhennhoefer.github.io';
// These documentation sites are deployed by their own repositories.
const siblingSites = new Set(['/nonconform/', '/online-fdr/', '/aberrant/']);
const walk = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true }))
  .map((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)))).flat();
const files = await walk(root);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const documents = new Map(await Promise.all(htmlFiles.map(async (file) => [file, await readFile(file, 'utf8')])));
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value.replaceAll('&amp;', '&')]));

async function destination(pathname) {
  const path = resolve(root, `.${decodeURIComponent(pathname)}`);
  assert(path === root || path.startsWith(`${root}/`), `Path escapes build: ${pathname}`);
  for (const candidate of [path, join(path, 'index.html')]) {
    if (await stat(candidate).then((entry) => entry.isFile()).catch(() => false)) return candidate;
  }
  assert.fail(`Missing internal destination: ${pathname}`);
}

for (const [file, html] of documents) {
  const route = `/${relative(root, file).replace(/index\.html$/, '')}`;
  const refresh = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/);
  if (refresh) {
    await destination(new URL(refresh[1], origin).pathname);
    assert.match(html, /name="robots" content="noindex"/);
    continue;
  }
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${route}: expected one main heading`);
  assert(!/pacakge|\[Replace this|to be completed|\[from\]/.test(html), `${route}: unfinished content`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
  const tags = [...html.matchAll(/<(?:a|link|img|object)\b[^>]*>/g)].map(([tag]) => attributes(tag));
  for (const tag of tags) {
    const href = tag.href ?? tag.src ?? tag.data;
    if (!href) continue;
    const url = new URL(href, `${origin}${route}`);
    if (url.origin !== origin || siblingSites.has(url.pathname)) continue;
    const target = await destination(url.pathname);
    if (url.hash && documents.has(target)) {
      const targetHtml = documents.get(target);
      assert(targetHtml?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: missing anchor ${href}`);
    }
  }
  if (route.startsWith('/reports/')) {
    const embed = tags.find((tag) => tag.type === 'application/pdf' && tag.data);
    assert(embed?.['aria-label'], `${route}: PDF viewer needs an accessible name`);
    assert(tags.some((tag) => tag.href === embed.data.split('#')[0]), `${route}: PDF needs a direct-open fallback`);
    assert.match(html, /href="\/blog\/" aria-current="page"/);
  }
  const canonical = tags.find((tag) => tag.rel === 'canonical');
  if (route === '/404.html') {
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert.equal(canonical, undefined, '404 must not have a canonical URL');
    continue;
  }
  assert.equal(canonical?.href, `${origin}${route}`, `${route}: incorrect canonical`);
  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    const graph = JSON.parse(json)['@graph'];
    assert(graph.some((item) => item['@type'] === 'Person'));
    if (route.startsWith('/blog/') && route !== '/blog/') {
      assert(graph.some((item) => item['@type'] === 'BlogPosting' && item.author?.['@id'] && item.datePublished));
    }
  }
}

const home = documents.get(join(root, 'index.html'));
for (const [, href] of home.matchAll(/<link[^>]*href="([^"]+\.css)"[^>]*>/g)) {
  const css = await readFile(await destination(new URL(href, origin).pathname), 'utf8');
  assert(!css.includes('KaTeX_Main'), 'Math CSS should not be loaded by the homepage');
}
const rss = await readFile(join(root, 'rss.xml'), 'utf8');
for (const [, item] of rss.matchAll(/<item>(.*?)<\/item>/gs)) {
  const href = item.match(/<link>(.*?)<\/link>/)?.[1];
  assert(href, 'RSS item needs a link');
  await destination(new URL(href).pathname);
}
for (const sitemap of files.filter((file) => /sitemap.*\.xml$/.test(file))) {
  const xml = await readFile(sitemap, 'utf8');
  for (const [, href] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    assert(!new URL(href).pathname.startsWith('/404'), '404 must not be in sitemap');
    await destination(new URL(href).pathname);
  }
}
console.log(`Verified ${htmlFiles.length} pages: headings, internal links, anchors, metadata, RSS, sitemap, and math CSS isolation.`);
