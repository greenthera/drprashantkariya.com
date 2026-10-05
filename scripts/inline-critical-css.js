// Post-build step: inlines each prerendered page's critical (above-the-fold)
// CSS directly into <head>, and defers the full stylesheet via the same
// preload+swap pattern already used for fonts in root.tsx — so first paint
// doesn't wait on the full CSS file to arrive. Runs against the real
// prerendered HTML output, so it reflects actual class usage per page
// rather than any hand-picked guess.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import Beasties from "beasties";

const CLIENT_DIR = path.resolve(import.meta.dirname, "..", "build", "client");

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const exists = await stat(CLIENT_DIR).catch(() => null);
  if (!exists) {
    console.error(`inline-critical-css: ${CLIENT_DIR} not found — run the build first.`);
    process.exit(1);
  }

  const beasties = new Beasties({
    path: CLIENT_DIR,
    // Deliberately not deferring the existing <link rel="stylesheet"> tag
    // (preload: false) — React Router's own <Links/> renders that tag, and
    // rewriting its rel/onload attributes post-build left React's hydration
    // expecting rel="stylesheet" while the DOM actually had rel="preload",
    // causing a hydration mismatch (React error #418). Inlining critical CSS
    // already gets the real win (instant correctly-styled first paint); the
    // full stylesheet staying a normal blocking link costs nothing extra
    // since the critical rules it duplicates are cheap to re-parse.
    preload: false,
    pruneSource: false,
    compress: true,
    logLevel: "warn",
  });

  const htmlFiles = await findHtmlFiles(CLIENT_DIR);
  let processed = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    if (!html.includes('rel="stylesheet"')) continue; // nothing to inline (e.g. 404.html has none)

    // Beasties re-serializes the *entire* document through its own HTML
    // parser as a side effect of computing critical CSS — which normalizes
    // attribute casing (e.g. imageSrcSet -> imagesrcset) and self-closing
    // syntax everywhere, not just in the styles it touches. React 19's
    // hydration for resource/preload <link> tags is strict enough that this
    // was enough to trigger a mismatch (error #418) on the one page with
    // such a tag (Home's hero-image preload). So beasties is used only to
    // *compute* the critical CSS; the actual output is the original,
    // byte-for-byte-untouched HTML with just that one <style> tag spliced
    // in at the very start of <head> — nothing else about the document can
    // possibly differ from what React originally rendered.
    const processedHtml = await beasties.process(html);
    const styleMatch = processedHtml.match(/<style>[\s\S]*?<\/style>/);
    const result = styleMatch ? html.replace("<head>", `<head>${styleMatch[0]}`) : html;

    await writeFile(file, result, "utf8");
    processed++;
    console.log(`inline-critical-css: processed ${path.relative(CLIENT_DIR, file)}`);
  }
  console.log(`inline-critical-css: done (${processed}/${htmlFiles.length} files).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
