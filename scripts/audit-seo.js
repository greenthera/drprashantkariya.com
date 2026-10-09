import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { load } from 'cheerio';

const paths = ['/', '/contact', '/courses', '/publications', '/parental-guidelines', '/media-coverage'];
const site = 'https://drprashantkariya.com';
const titles = new Set();
const descriptions = new Set();
const failures = [];
const results = [];
for (const path of paths) {
  const html = await readFile(`build/client${path === '/' ? '' : path}/index.html`, 'utf8');
  const $ = load(html);
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const checks = {
    uniqueTitle: Boolean(title) && !titles.has(title),
    uniqueDescription: Boolean(description) && !descriptions.has(description),
    canonical: $('link[rel="canonical"]').attr('href') === `${site}${path}${path === "/" ? "" : "/"}`,
    indexable: !/noindex/.test($('meta[name="robots"]').attr('content') || ''),
    oneH1: $('h1').length === 1,
    oneMain: $('main').length === 1,
    viewport: Boolean($('meta[name="viewport"]').attr('content')),
    social: ['og:title', 'og:description', 'og:url', 'og:image'].every(property => Boolean($(`meta[property="${property}"]`).attr('content'))),
    imageAlternatives: $('img').toArray().every(img => $(img).attr('alt') !== undefined),
    jsonLD: $('script[type="application/ld+json"]').length > 0,
    internalLinks: $('a[href]').toArray().every(a => {
      const href = $(a).attr('href');
      if (!href.startsWith('/') || href.startsWith('//')) return true;
      return paths.includes(href.split(/[?#]/)[0]);
    }),
    noMixedContent: !$('script[src^="http:"],img[src^="http:"],iframe[src^="http:"],link[href^="http:"]').length,
  };
  $('script[type="application/ld+json"]').each((_, script) => JSON.parse($(script).text()));
  titles.add(title); descriptions.add(description);
  for (const [name, passed] of Object.entries(checks)) if (!passed) failures.push(`${path}: ${name}`);
  results.push({ path, title, checks });
}
const sitemap = load(await readFile('public/sitemap.xml', 'utf8'), { xmlMode: true });
const sitemapURLs = sitemap('loc').toArray().map(loc => sitemap(loc).text());
if (sitemapURLs.length !== paths.length || !paths.every(path => sitemapURLs.includes(site + path + (path === "/" ? "" : "/")))) failures.push('Sitemap does not match canonical routes');
if (!(await readFile('public/robots.txt', 'utf8')).includes(`Sitemap: ${site}/sitemap.xml`)) failures.push('Missing sitemap reference');
await mkdir('artifacts/seo', { recursive: true });
await writeFile('artifacts/seo/static-audit.json', JSON.stringify({ results, failures }, null, 2));
console.log(JSON.stringify({ pages: results.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
