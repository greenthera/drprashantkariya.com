# Local browser and mobile performance tests

No account, hosted testing service or additional CDN is required. Tests serve
the prerendered production build locally with gzip, correct MIME types and
the existing hosting's 600-second cache lifetime. Do not use the development
server for performance measurements.

## Setup

Use Node 22.19 or newer:

```sh
npm ci
npx playwright install chromium
```

Playwright's Chromium is installed locally. `@playwright/test`, `playwright`
and Lighthouse are development dependencies; they do not ship to visitors.

## Browser regression tests

```sh
npm run test:e2e
npm run test:e2e:ui
```

Playwright builds the site, starts the production server on port 4173, and
runs mobile and desktop checks. Tests cover server-rendered hero content,
font requests, unchanged hero animation durations, section scrolling/reveal,
photo lightbox interactions, and pixel-identical font glyphs at all used
weights. Scroll-reveal checks also verify intermediate opacity as a section
enters the viewport. Sections stay in normal layout: `content-visibility`
containment previously prevented some IntersectionObserver reveals from
starting. Existing animations remain enabled. Reports and failed-test traces
are stored in `playwright-report/` and `test-results/`.

For Claude or another local coding agent: run these commands from the project
root, inspect the HTML report and retained traces on failure, and preserve
animation parameters, observer thresholds and visible loading states. Do not
disable animations or block third-party requests to improve audit scores.
The test server follows Playwright's documented [webServer workflow](https://playwright.dev/docs/test-webserver).

## Mobile Lighthouse gate

```sh
npm run test:performance
```

This builds once and runs three independent audits with Lighthouse 13.5.0's
default mobile profile and simulated slow 4G. Every run must score at least
91; otherwise the command exits with an error. Each run uses a fresh browser
profile. No site assets are warmed and no requests are blocked. Animations
are enabled. Headless Chrome uses software rendering (`--disable-gpu`) to
reduce local macOS GPU startup noise; this setting affects only the audit
browser. The site's code and browser animations are unchanged by testing.

Results, HTML reports and Chrome traces are saved under
`artifacts/performance/`. `summary.json` records the URL, metrics, profile,
renderer, extra origin delay and pass/fail status. These directories are
ignored by Git.

Mobile CSS is included in the prerendered HTML to remove the external
stylesheet from the rendering path. Desktop uses the external stylesheet.
Both contain the existing styles; animation and loading settings are unchanged.
The inline CSS is excluded from the client JavaScript bundle. The mobile
browser test checks that no matching external stylesheet blocks rendering.

GitHub Pages currently returns `Cache-Control: max-age=600` for assets.
That server header cannot be overridden by a React component or HTML meta tag;
the cache-lifetime warning can remain even when performance exceeds 90.

If a managed local environment causes certificate failures for the existing
Google Analytics requests, use this explicit test-only override:

```sh
PERF_IGNORE_CERTIFICATE_ERRORS=1 npm run test:performance
```

It permits those requests instead of blocking them. To use an installed
Chrome browser, set `PERF_CHROME_PATH` to its executable path.

Additional origin latency is a separate stress test; the normal Lighthouse
profile already includes simulated network latency:

```sh
npm run test:performance -- --document-latency 200
```

To measure the deployed website from this computer:

```sh
npm run test:performance -- --url https://drprashantkariya.com/
```

A local Lighthouse audit is not Google's hosted PageSpeed Insights result.
Deployment, origin response times and run-to-run variance can affect the
live score. Do not run a build, Playwright tests and Lighthouse audits at the
same time: builds replace the files being served, and browser tests consume
CPU needed for an accurate performance measurement.
