// Scrapes IAP's "Guidelines for Parents" page and writes the flat list of
// category/title/url entries to src/data/parental-guidelines.json.
//
// The source page (section.blog-page.section-space > div.blog-card-four__content
// > div.mb-15) is a single container whose direct children are a flat,
// repeating sequence of <h4> (category heading) followed by several
// <p><a>...</a></p> (one guideline link each) — there's no per-category
// wrapper element, so a category has to be tracked as we walk the sequence.
//
// Re-run with: node scripts/scrape-parental-guidelines.js

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as cheerio from "cheerio";

const SOURCE_URL = "https://iapindia.org/guidelines-for-parents/";
const OUTPUT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/data/parental-guidelines.json"
);

async function main() {
  const res = await fetch(SOURCE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${SOURCE_URL}: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  const $ = cheerio.load(html);

  const container = $(
    "section.blog-page.section-space div.blog-card-four__content div.mb-15"
  ).first();

  if (container.length === 0) {
    throw new Error(
      "Could not find section.blog-page.section-space div.blog-card-four__content div.mb-15 — the source page's markup may have changed."
    );
  }

  const entries = [];
  let currentCategory = null;

  container.children().each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    if (tag === "h4") {
      currentCategory = $(el).text().trim();
      return;
    }
    if (tag === "p") {
      const link = $(el).find("a").first();
      if (link.length === 0) return;
      const url = link.attr("href");
      const linkTitle = link.text().trim();
      if (!url || !linkTitle || !currentCategory) return;
      entries.push({ category: currentCategory, title: linkTitle, url });
    }
  });

  if (entries.length === 0) {
    throw new Error("Parsed 0 entries — the source page's markup may have changed.");
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(entries, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${entries.length} entries across ${new Set(entries.map((e) => e.category)).size} categories to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
