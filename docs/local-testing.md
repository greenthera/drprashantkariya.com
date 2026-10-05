# Local browser and performance testing

Use Node 22.19 or newer. No account or additional CDN is needed.

```sh
npm ci
npx playwright install chromium
npm run test:e2e
npm run test:performance
```

Playwright serves the prerendered production build with gzip and tests both
Pixel 7 mobile and 1440px desktop. Checks cover existing gallery spinners,
responsive preview selection, original-image lightboxes, hero rendering
without JavaScript, navigation, scroll-reveal progress, and animation durations.
Animations stay enabled. The test packages are development dependencies only.

Course tests verify that prerendered titles and links render without JavaScript
and even when cover requests fail. Course cards no longer wait for all covers
to download: their existing aspect-ratio spaces reserve the image layout.
Failed background revalidation retains the prerendered course content.

Lighthouse runs three fresh mobile browser profiles with its default simulated
slow-4G settings. Each run must score at least 91. It does not block requests,
warm caches, disable site animations, or defer site content for the audit.
Headless Chromium uses software rendering to reduce local GPU startup noise.

For an environment with certificate failures on third-party requests, use:

```sh
PERF_IGNORE_CERTIFICATE_ERRORS=1 npm run test:performance
```

This test-only setting permits those requests. Reports and traces are saved
under `artifacts/performance/`; Playwright failures are in `test-results/` and
`playwright-report/`. These generated directories are ignored by Git.

To compare desktop or save mobile reports separately after building:

```sh
node scripts/check-performance.js --desktop --minimum 100 --output artifacts/desktop
node scripts/check-performance.js --output artifacts/mobile
```

Do not run browser tests, audits, and builds concurrently. A build replaces
served assets; concurrent browsers compete for CPU. The production server uses
600-second cache headers to match the current hosting.

Local scores are comparisons under local conditions. They are not Google's
hosted PageSpeed result; origin response time and third-party responses differ.
Recheck the deployed URL after deployment:

```sh
node scripts/check-performance.js --url https://drprashantkariya.com/
```

The mobile optimization uses smaller, centered previews for the six homepage
press cards below 768px. Desktop and lightboxes keep the original files. Gallery
preloading still starts at mount and waits for all six selected images before
showing the cards. Mobile preview preloads use low network priority. Mobile
uses the existing PNG favicon; desktop keeps its existing ICO. No section
mount gates, rendering containment, font changes, or animation-runtime changes
are used. New press clippings without a mobile preview fall back to the original.

## Verified local comparison (October 5, 2026)

| Profile | Before | After |
| --- | --- | --- |
| Mobile, three fresh runs | 92, 95, 95 | 94, 95, 95 |
| Desktop, three fresh runs | 100, 100, 100 | 100, 100, 100 |

The paired second-run audits transferred 2,935,282 bytes before and 2,327,516
bytes after on mobile (about 21% less). Homepage clipping requests decreased
from 849,363 to 524,916 bytes; the favicon request decreased from 285,684 to
1,864 bytes. Desktop still requested the same original clippings and ICO.
The median local mobile score stayed at 95; this is primarily a transfer-size
improvement. All 14 Playwright tests, typecheck and lint passed. Hero heading
geometry and font families matched on both sizes; the desktop screenshot was
pixel-identical. The mobile screenshot had minor rasterization differences
(mean difference approximately 0.02 per channel on a 0–255 scale).
The user's hosted score of 79 has not been reverified with these changes.

## Follow-up investigation of the hosted mobile score of 80

Playwright confirmed that the legacy font-preload handler was attaching to a
hoisted JavaScript module link (`seo-*.js`) and changing its type to stylesheet.
Mobile now skips that handler; desktop retains its existing path and typography.
The exact existing CSS is embedded in the mobile document, so there is no
matching external render-blocking stylesheet. Desktop keeps the external CSS.
The inline CSS string is excluded from production client JavaScript; development
retains the import for stylesheet updates.

The prerendered Instagram iframe previously appeared inside a hidden streamed
Suspense segment and started downloading while far below the mobile viewport.
Rendering this small component directly keeps it in normal
markup. Its existing `loading="lazy"`, dimensions, URL and content are unchanged.
Playwright verifies no initial mobile embed request and a request when scrolled
near. No animation settings, render containment or scroll mount gates were added.

To reproduce the local origin-delay comparison after building:

```sh
node scripts/check-performance.js --document-latency 200 --minimum 91
```

These audits use the same simulated slow-4G profile plus 200ms of actual document
delay. This is a separate stress comparison, not a claim to reproduce Google's
hosted score exactly. No third-party requests were blocked in the audits.

| Change measured separately | Three mobile scores |
| --- | --- |
| Before fixes, origin-delay profile | 61, 57, 60 |
| Mobile preload-handler correction | 56, 84, 56 |
| Plus native iframe lazy-loading correction | 75, 86, 73 |
| Plus mobile CSS delivery | 91, 94, 94 |

The first correction removed the invalid stylesheet request but did not provide
a consistent score gain on its own. After all changes, origin-delay LCP was
2.45–2.54s and CLS was 0. Desktop's standard-profile scores remained 100, 100,
100, with LCP approximately 0.57–0.59s. The paired second mobile runs transferred
2,327,599 bytes before and 1,021,080 after (about 56% less), including removal of
approximately 1.3MB of premature Instagram resources.

Menu and photo-lightbox interactions sampled using Playwright and 4x CPU
throttling had a maximum Event Timing duration of 104ms and CLS 0. This is a lab
sample, not field INP. See [Chrome's INP measurement guidance](https://developer.chrome.com/blog/inp-tools-2022).
The original ECG stroke-dashoffset animation remains intact despite Lighthouse's
informational non-composited-animation notice. Analytics and navigation runtime
code remain available; unused-JavaScript warnings do not mean those libraries
can be removed without affecting tracking or functionality.

GitHub Pages returns `Cache-Control: max-age=600` for assets, so the cache-lifetime
warning can remain. That response header cannot be overridden from React.
The hosted 80 has not yet been reverified after deployment of these fixes.
Final standard-profile mobile scores were 92, 95, 95 (LCP 2.49–2.56s, CLS 0).
All 21 applicable Playwright checks passed; the three mobile-only checks were
skipped in the desktop project. Typecheck and lint passed. Desktop hero heading
pixels were identical to the pre-change capture; both viewports kept the same
heading geometry and font families. Development-server CSS was also checked on
both viewport sizes.

## PDF context copies

The verified local reports and investigation summary were printed using
Playwright to `artifacts/pdf/` for review and workspace context:

- [Investigation and complete context](../artifacts/pdf/performance-context.pdf)
- [Local mobile Lighthouse report](../artifacts/pdf/mobile-lighthouse.pdf)
- [Local desktop Lighthouse report](../artifacts/pdf/desktop-lighthouse.pdf)

These are generated, Git-ignored local artifacts. They are not a PDF of the
hosted PageSpeed report shown in the screenshots; that requires the latest
PageSpeed “Copy Link” URL. This document retains the findings even if generated
reports are cleaned up later.
