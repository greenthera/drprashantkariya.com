import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { createProductionServer } from './serve-production.js';

const value = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};
const runs = Number(value('--runs', 3));
const threshold = Number(value('--minimum', 91));
// Lighthouse already models slow-4G latency. Extra origin delay is an optional
// stress test, kept separate from the standard profile's score gate.
const documentLatency = Number(value('--document-latency', 0));
const remoteURL = value('--url', undefined);
if (!Number.isInteger(runs) || runs < 1 || !Number.isFinite(documentLatency) || documentLatency < 0 || !Number.isFinite(threshold) || threshold < 0 || threshold > 100) throw new Error('Invalid performance test options');
const server = remoteURL ? undefined : createProductionServer({ documentLatency });
if (server) await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = remoteURL || `http://127.0.0.1:${server.address().port}/`;
const output = value('--output', 'artifacts/performance');
const desktop = process.argv.includes('--desktop');
await mkdir(output, { recursive: true });
const results = [];
try {
  for (let run = 1; run <= runs; run++) {
    // Software rendering avoids headless GPU startup noise on local macOS.
    // This changes the audit browser only; application animations stay enabled.
    const chrome = await launch({ chromePath: process.env.PERF_CHROME_PATH || chromium.executablePath(), chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', ...(process.env.PERF_IGNORE_CERTIFICATE_ERRORS ? ['--ignore-certificate-errors'] : [])] });
    try {
      const report = await lighthouse(url, { port: chrome.port, onlyCategories: process.argv.includes('--audit') ? ['performance', 'accessibility', 'best-practices', 'seo'] : ['performance'], output: ['json', 'html'], logLevel: 'error' }, desktop ? desktopConfig : undefined);
      if (!report || report.lhr.runtimeError) throw new Error(JSON.stringify(report?.lhr.runtimeError || 'Missing Lighthouse report'));
      const { lhr } = report;
      await writeFile(`${output}/run-${run}.json`, JSON.stringify(lhr, null, 2));
      await writeFile(`${output}/run-${run}.html`, report.report[1]);
      await writeFile(`${output}/run-${run}-trace.json`, JSON.stringify(report.artifacts.Trace));
      const metrics = Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time', 'cumulative-layout-shift'].map(name => [name, lhr.audits[name].numericValue]));
      const result = { run, score: Math.round(lhr.categories.performance.score * 100), ...metrics };
      results.push(result);
      console.log(`Run ${run}: ${result.score}/100, LCP ${(metrics['largest-contentful-paint'] / 1000).toFixed(2)}s, TBT ${Math.round(metrics['total-blocking-time'])}ms, CLS ${metrics['cumulative-layout-shift']}`);
    } finally {
      await chrome.kill();
    }
  }
  const summary = { url, measuredAt: new Date().toISOString(), profile: desktop ? 'Lighthouse desktop' : 'Lighthouse mobile, simulated slow 4G', renderer: 'Headless Chrome software rendering; animations enabled', documentLatency: remoteURL ? null : documentLatency, minimum: threshold, results, passed: results.every(result => result.score >= threshold) };
  await writeFile(`${output}/summary.json`, JSON.stringify(summary, null, 2));
  console.log(`Every run must reach ${threshold}. Reports: ${output}`);
  if (!summary.passed) process.exitCode = 1;
} finally {
  if (server) await new Promise(resolve => server.close(resolve));
}
