import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, extname, relative } from 'node:path';
import { geoContains } from 'd3-geo';

const root = resolve('dist');
const origin = 'https://oliverhennhoefer.github.io';
// These documentation sites are deployed by their own repositories.
const siblingSites = new Set(['/nonconform/', '/online-fdr/', '/aberrant/']);
// Pages kept out of search results: no canonical, not in the sitemap.
const noindexRoutes = new Set(['/404.html', '/impressum/']);
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
  if (noindexRoutes.has(route)) {
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert.equal(canonical, undefined, `${route}: noindex pages must not have a canonical URL`);
    continue;
  }
  assert.equal(canonical?.href, `${origin}${route}`, `${route}: incorrect canonical`);
  assert.match(html, /<meta name="description" content="[^"]*Hennh/, `${route}: description should name the author`);
  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:site_name']) {
    assert.match(html, new RegExp(`property="${property}" content="[^"]+"`), `${route}: missing ${property}`);
  }
  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    const graph = JSON.parse(json)['@graph'];
    const person = graph.find((item) => item['@type'] === 'Person');
    assert(person, `${route}: missing Person`);
    assert(person.alternateName.includes('Oliver Hennhoefer'), `${route}: Person needs the ASCII spelling`);
    assert(person.sameAs.length >= 3, `${route}: Person needs profile links`);
    if (route === '/' || route === '/cv/') {
      assert(graph.some((item) => item['@type'] === 'ProfilePage' && item.mainEntity?.['@id'] === person['@id']), `${route}: ProfilePage must point to Person`);
      assert(graph.some((item) => item['@type'] === 'ScholarlyArticle'), `${route}: publications missing from structured data`);
    }
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
const sitemapUrls = [];
for (const sitemap of files.filter((file) => /sitemap.*\.xml$/.test(file))) {
  const xml = await readFile(sitemap, 'utf8');
  for (const [, href] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const { pathname } = new URL(href);
    assert(![...noindexRoutes].some((route) => pathname.startsWith(route.replace('.html', ''))), `${pathname}: noindex page must not be in sitemap`);
    await destination(pathname);
    sitemapUrls.push(pathname);
  }
}
assert(sitemapUrls.includes('/') && sitemapUrls.includes('/cv/'), 'Sitemap must list home and CV');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.match(robots, /^Sitemap: https:\/\/oliverhennhoefer\.github\.io\/sitemap-index\.xml$/m, 'robots.txt must point to the sitemap');
assert(!/^Disallow: \/\s*$/m.test(robots), 'robots.txt must not block the site');
const llms = await readFile(join(root, 'llms.txt'), 'utf8');
assert.match(llms, /^# Oliver Hennhöfer\n\n> /, 'llms.txt must start with a title and summary');
assert(llms.includes('Hennhoefer') && llms.includes(`${origin}/cv/`), 'llms.txt must give the ASCII spelling and link the CV');
const travel = documents.get(join(root, 'index.html'));
assert(travel, 'Home page with the travel map must be generated');
const expectedPlaces = JSON.parse(await readFile('src/data/visited-countries.json', 'utf8')).sort();
const mapRegions = [...travel.matchAll(/<path\b[^>]*data-country="[^"]+"[^>]*>/g)]
  .map(([tag]) => attributes(tag));
const markedPlaces = mapRegions.filter((region) => region.class.split(' ').includes('visited'))
  .map((region) => region['data-country']).sort();
assert.deepEqual(markedPlaces, expectedPlaces, 'Map highlights must match the supplied destinations');
assert(mapRegions.length > 200, 'World map must include the country boundaries');
assert(travel.length < 400_000, 'Home page map must stay light');
assert(mapRegions.every((region) => region.d && !/NaN|Infinity/.test(region.d)), 'Map paths must be valid');
assert(!mapRegions.some((region) => region['data-country'] === 'United Kingdom'), 'UK must use constituent-country boundaries');
for (const name of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
  assert(mapRegions.some((region) => region['data-country'] === name), `Missing UK boundary: ${name}`);
}
const mapData = JSON.parse(await readFile('src/data/maps/map-units.json', 'utf8'));
for (const [mainland, territory, point] of [
  ['France', 'French Guiana', [-52.33, 4.94]],
  ['Norway', 'Svalbard', [15.63, 78.22]],
  ['Norway', 'Jan Mayen', [-8.4, 71]],
]) {
  assert(mapRegions.some((region) => region['data-country'] === territory), `Missing territory: ${territory}`);
  assert(geoContains(mapData.features.find((region) => region.properties.name === territory), point), `${territory} must contain its own territory`);
  assert(!geoContains(mapData.features.find((region) => region.properties.name === mainland), point), `${mainland} must not include ${territory}`);
}

console.log(`Verified ${htmlFiles.length} pages: headings, internal links, anchors, metadata, structured data, sitemap, robots, llms.txt, travel map, and math CSS isolation.`);
