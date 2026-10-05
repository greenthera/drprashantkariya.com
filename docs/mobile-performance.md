# Mobile performance verification

The optimization serves the existing Cormorant Garamond and Jost WOFF2 fonts
from the site's origin below 768px, with media-scoped preloads for the three
Latin faces. This removes the external Google Fonts stylesheet dependency
on mobile. Font families, weights, Unicode subsets and font-display: swap
are preserved. Desktop retains the existing font delivery.

Animation components, keyframes, durations, section mounting, lazy imports,
intersection observer settings, image loading and analytics timing were
not modified.

## Local production-build results

Measured October 5, 2026 using Lighthouse 13.5.0's default mobile profile
(simulated slow 4G) against the prerendered production build, served with
HTML/JS/CSS gzip compression. External requests were enabled; Chrome's
certificate errors were ignored to accommodate the local test environment.

| Metric | Before | After run 1 | After run 2 |
| --- | --- | --- | --- |
| Performance | 81 | 92 | 91 |
| First contentful paint | 2.3 s | 2.3 s | 2.3 s |
| Largest contentful paint | 4.6 s | 3.0 s | 3.2 s |
| Speed index | 2.6 s | 2.3 s | 2.3 s |
| Total blocking time | 70 ms | 40 ms | 40 ms |
| Cumulative layout shift | 0 | 0 | 0 |

The LCP element was the hero heading. Mobile fetched three local font files
and no Google Fonts stylesheet. Desktop used no local font files. Browser
checks at widths 390px and 1440px confirmed unchanged hero heading geometry
and the same active animation names; all animation source code is unchanged.

`npm run build`, `npm run typecheck`, and `npm run lint` passed.

These are local lab results, not a deployed PageSpeed Insights result.
The live mobile baseline measured 76 in this environment. Recheck PageSpeed
Insights after deployment, since hosting latency and test variance affect
the score.

## Follow-up: blocking stylesheet on mobile

The deployed font change was confirmed present after the reported PageSpeed
score of 80. Fresh live Lighthouse runs returned 93 and 77, with LCP varying
from 2.9 s to 4.9 s. These are Lighthouse runs from this machine, not Google's
PageSpeed service. Requests to that service returned HTTP 429.

Both live runs showed `/assets/seo-yW6OGK44.js` requested as a stylesheet in
addition to its normal JavaScript preload. React hoists head links, so the
legacy font swap's `document.currentScript.previousElementSibling` does not
reliably point at the Google Fonts link. On mobile the external font swap is
unnecessary because the fonts are declared in the local stylesheet.

The follow-up gates this legacy swap to desktop (768px and above). Mobile
now requests only the actual CSS stylesheet. The updated local production
build scored 92, with FCP 2.3 s, LCP 3.0 s, TBT 60 ms and CLS 0. The existing
font files, animations, section loading, images and desktop behavior are
unchanged. Smaller bold fonts were evaluated but omitted because they added
extra requests for other weights and did not improve the measured score.

Build, TypeScript, lint, and mobile/desktop browser checks passed. The
follow-up has not been deployed; a Google PageSpeed result above 90 for
this version has not been verified.
