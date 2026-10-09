# SEO, accessibility and performance audit

Date: 9 October 2026. Scope: `/`, `/contact/`, `/courses/`, `/publications/`, `/parental-guidelines/`, `/media-coverage/`, shared navigation, and 404 handling. Source checklist: [seo.md](../public/seo.md).

Changes are local and require deployment. Live checks describe the deployed version, not the updated build. Pass means the stated check passed; it does not imply a complete WCAG, security or medical-content certification.

## Fixes and evidence

| Severity | Affected pages | Issue and fix | Retest |
| --- | --- | --- | --- |
| High | All pages, desktop | Font loader used previousElementSibling despite React hoisting links. Replaced with a stable ID and asynchronous stylesheet activation. Mobile no longer preloads unused fonts. | Browser checks reject JavaScript masquerading as CSS. |
| Medium | All content pages | Live GitHub Pages redirects non-root pages to trailing slashes while canonicals/sitemap used slashless paths. Canonicals, Open Graph URLs, breadcrumbs and sitemap now match final destinations. | Six-page static audit validates exact canonicals and sitemap membership. |
| Medium | Home | Repeated SVG stars in every duplicated review card bloated initial HTML and DOM. Replaced with a compact accessible five-star span; reviews and carousel preserved. | Final Lighthouse and browser tests. |
| Medium | Home and 404 | Nested main landmarks. Replaced inner main elements with divs; added a skip link and focusable primary main. | Exactly one main and one H1 per content page. |
| Medium | All pages | Missing global focus indicators and reduced-motion CSS. Added both. | Existing interactions and navigation retested; full assistive-technology audit pending. |
| Medium | Contact | Missing autofill/input hints, inadequate WhatsApp button contrast, and unisolated window.open. Added autocomplete, names, phone constraints, mobile 16px inputs, contrast and noopener/noreferrer. | Required validation and WhatsApp handoff tested without sending a message. |
| Medium | Home/media | Contrast and visible/accessibility-name mismatch identified by Lighthouse. Improved review text contrast; clipping names include visible Newspaper Feature label. | Final accessibility audit. |
| Low | Home | Book covers eagerly preloaded below fold; explicit portrait dimensions missing. Use native lazy loading/async decoding for book covers and explicit sizes for portrait and Docon icon. | Browser layout/interactions and Lighthouse CLS. |
| Low | Non-root pages | Missing breadcrumbs. Added visible breadcrumb navigation and corresponding BreadcrumbList JSON-LD. | JSON parses and required positions/names/items present. |
| Low | Static 404 | Missing initial noindex and no-JavaScript fallback. Added directives, viewport and a home link. | Static source verified; existing SPA redirect retained. |

## Checklist

| Checklist item | Status | Evidence / limits |
| --- | --- | --- |
| Important pages crawlable/indexable | Pass | Six prerendered HTML files, no noindex on content pages, robots allows crawling. |
| Unique relevant titles/descriptions | Pass | Static audit checks uniqueness/nonempty metadata on six routes; descriptions reviewed in source. |
| Canonical URLs | Pass | Updated to actual trailing-slash destinations. |
| Heading hierarchy | Pass | Six pages have one H1; heading source reviewed. |
| Broken links, redirects, 404 | Pass | Internal page links verified; live routes end at 200, unknown path returns 404. Full external-link crawl Not Verified. |
| Internal navigation | Pass | Existing home-section, menu and route tests; links checked against routes. |
| Duplicate content/URL variations | Pass | HTTP and www redirect to HTTPS apex; slash variants consolidate with canonical destinations. Query variants use clean canonicals. |
| Open Graph/social metadata | Pass | Six pages have OG and Twitter tags; added site name, locale and image alt. Actual platform preview rendering Not Verified. |
| Robots accessible | Pass | Live /robots.txt returns 200. |
| Important resources unblocked | Pass | robots has empty Disallow. |
| Sitemap accessible | Pass | Live /sitemap.xml returns 200. |
| Canonical/indexable sitemap entries | Pass | Sitemap matches exactly six updated canonical content URLs. |
| Sitemap URLs return 200 | Pass | Live routes end at 200; updated slash destinations remove preliminary redirect. |
| Sitemap referenced in robots | Pass | Static audit verifies reference. |
| Search Console submission | Not Verified | No connected property/account. |
| Relevant structured data exists | Pass | Physician, three MedicalClinics and WebSite in shared head. |
| Organization/LocalBusiness | Pass | Existing clinic markup represents visible practice locations. No invented hours, coordinates or ratings. |
| WebSite/BreadcrumbList | Pass | WebSite shared; visible two-level breadcrumbs and JSON-LD on non-root pages. |
| Article/Product/Service/FAQ schema | Not Applicable | Current routes are listings/contact pages, not individual article/product pages or visible FAQ pages. |
| Schema matches visible content | Pass | Clinic names/addresses/phones align with contact/footer content; breadcrumb names align with UI. |
| Schema validator/Rich Results Test | Not Verified | JSON parse and required breadcrumb properties checked locally. Google external validation after deployment remains a follow-up. |
| Missing schema properties | Pass | Basic identity/contact and required breadcrumb fields present; optional business details require verified content. |
| LCP | See measurements | Local mobile and desktop lab metrics below; field data Not Verified. |
| INP | Not Verified | Lab menu/lightbox event timing sampled at 4x CPU; does not establish field INP. |
| CLS | See measurements | Local lab metrics below; field data Not Verified. |
| Mobile/desktop measured separately | Pass | Separate Lighthouse profiles and stored reports. |
| Render-blocking CSS/JS | Pass | Mobile inline stylesheet and no matching blocking stylesheet; desktop fonts activated asynchronously. |
| Unused JS/CSS | Fail | Lighthouse still identifies unused analytics/framework code; follow-up PERF-1 below. |
| Image compression/modern formats | Pass | Content images use WebP; small icons use PNG/ICO. |
| Lazy offscreen images | Fail | Books now lazy; media/publication grids retain preload-all loading UX. Follow-up PERF-2. |
| Dimensions/responsive images | Pass | Hero responsive srcset and square size; gallery/card wrappers reserve aspect ratios; Docon size added. Some gallery previews could be smaller (PERF-2). |
| Font loading | Pass | Mobile system fonts are explicit; desktop loader targets stable ID and stays asynchronous. |
| Caching/compression/CDN | Fail | GitHub Pages cache-control max-age=600 and CDN observed; custom cache policy requires infrastructure change (HOST-1). Gzip in local test server is not proof of live compression. |
| Third-party impact | Fail | Analytics still downloads substantial JS; Instagram can prevent bfcache after loading. Follow-up PERF-1. |
| Mobile/tablet/desktop responsiveness | Not Verified | Mobile/desktop automated checks pass; comprehensive tablet/device testing pending. |
| Viewport configuration | Pass | Static checks all six pages. |
| Horizontal overflow | Pass | Mobile/desktop browser assertions across six pages. |
| Readable sizes/contrast | Not Verified | Fixed Lighthouse home findings and contact CTA; all-route color/zoom assessment pending. |
| Image alt text | Pass | All prerendered images have alt attributes. |
| Keyboard/focus | Not Verified | Skip link, menu inert state, labels and visible focus implemented; dialog focus trapping and full keyboard audit pending (A11Y-1). |
| Form labels/accessibility | Pass | Explicit associated labels and required validation; handoff test passes. |
| WCAG 2.2 AA review | Not Verified | Automated home Lighthouse is limited; manual screen-reader, dialog and zoom review needed. |
| HTTPS enforcement | Pass | HTTP returns 301 to HTTPS. |
| SSL/TLS validity | Pass | Live HTTPS response obtained without bypassing certificate validation; protocol/cipher audit Not Verified. |
| HTTP-to-HTTPS redirects | Pass | Live response checked. |
| Security headers | Fail | Live headers lack CSP, HSTS, X-Content-Type-Options, Referrer-Policy and Permissions-Policy; GitHub Pages control limited (HOST-1). |
| Mixed content | Pass | Six-page static resource URL checks. |
| Production secrets/debug exposure | Not Verified | No secret values observed in source audit; public/seo.md intentionally remains public, and all public files are published. Full secret/artifact scan pending. |
| External dependencies/scripts | Pass | Google fonts, analytics, Instagram, Docon and courses integration reviewed; third-party performance caveats above. |
| Navigation/buttons/CTAs | Pass | Automated existing gallery, lightbox, menu, section and course tests. Actual external purchases/bookings Not Verified. |
| Contact validation/submission/confirmation | Pass | Form validates then opens a WhatsApp message draft. Delivery/confirmation occurs in WhatsApp and cannot be claimed by this site. |
| Email notifications/integrations | Not Applicable | No email backend; no message was sent during testing. External Docon completion Not Verified. |
| Custom 404/error page | Pass | Live 404 status, static noindex/fallback, router custom 404 reviewed. |
| Major browsers | Not Verified | Chromium mobile/desktop tested; Safari/Firefox pending. |
| Business contact details | Pass | Schema and visible addresses/telephone agree; independent ownership verification Not Verified. |
| Cookie consent/privacy requirements | Not Verified | GA4 is present; consent and jurisdiction-specific privacy requirements need owner review (PRIVACY-1). |
| Analytics implementation | Pass | One shared GA4 stub/library, deferred after load/idle. Live account receipt Not Verified. |
| Search Console verification | Not Verified | No property access supplied. |
| Conversion tracking | Fail | No appointment/contact conversion instrumentation found (ANALYTICS-1). |
| JavaScript console errors | Pass | Six-page browser test checks uncaught page errors; third-party console warnings are separate. |
| Duplicate analytics | Pass | Single shared analytics bootstrap found. |
| Uptime/error monitoring | Not Verified | No monitoring account/configuration available. |

## Measurements

Baseline local mobile lab: 90/100; LCP 2.75s, TBT 173ms, CLS 0 (one run). Intermediate runs scored 90–91 with LCP 2.79–2.86s and TBT 105–155ms; these helped identify the large carousel markup. Baseline and final runs use the existing gzip static server with 600-second cache headers. Do not infer live PageSpeed scores from localhost.

Final build lab results:

| Profile | Performance | LCP | TBT | CLS | SEO | Accessibility | Best practices |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile, simulated slow 4G | 92 | 2.77s | 70ms | 0.000 | 100 | 100 | 100 |
| Desktop | 99 | 0.63s | 0ms | 0.065 | 100 | 100 | 77 |

Three preceding mobile runs all scored 92, LCP 2.78–2.86s, TBT 56–66ms, CLS 0. Mobile verification includes footer/Instagram accessibility fixes. Desktop retest additionally verifies review-button/initials contrast fixes. Desktop best-practices deductions are from third-party Instagram cookies/inspector warnings, which remain documented in PERF-1. The LCP ≤2.5s mobile acceptance target is **not met**. CLS ≤0.1 is met in both profiles. Homepage HTML fell from 555,990 bytes in the baseline build to about 276,000 bytes (roughly 50%); compressed transfer savings are smaller.

Validation: production build, TypeScript and ESLint pass; `node scripts/audit-seo.js` passes all six pages; full browser suite has 25 passed and 3 intentional desktop skips. After tightening the phone pattern, both targeted contact tests also passed, including invalid phone rejection. Chromium profiles cover mobile and desktop, not every major browser.

Run `npm run build && node scripts/audit-seo.js` to repeat static SEO checks. Run `npm run test:e2e` for browser checks. Run `node scripts/check-performance.js --runs 3 --audit --minimum 0 --output artifacts/mobile-audit` and add `--desktop` with a separate output folder for desktop. `--minimum 0` collects measurements rather than enforcing a score gate; the original default gate remains 91. Run Lighthouse sequentially after building: a concurrent rebuild removes served assets and invalidates measurements.

 Lighthouse TBT is not INP; real Core Web Vitals need CrUX/Search Console field data. Four-times CPU interaction samples are in artifacts/interactions/mobile.json. Lighthouse reports and traces are under artifacts/; these generated files are gitignored.

## Follow-up tickets (ready to copy into Redmine)

No Redmine connector or ticket ID was supplied. These drafts are documented locally; no tickets have been created or attached remotely.

- **HOST-1, Medium:** Add controllable hosting/edge headers. Affects every URL. Evidence: live GitHub headers cache assets for 600 seconds and lack listed security headers. Acceptance: hashed assets immutable for one year; HTML revalidates; tested CSP compatible with inline hydration, fonts, analytics and embeds; agreed security headers; HTTPS and 404 preserved. Requires hosting configuration/provider decision, not a simulated local server change.
- **PERF-1, Medium:** Reduce third-party and hydration work. Evidence: Lighthouse unused analytics/framework JS, Instagram bfcache limitation, and desktop third-party cookie/inspector warnings from the Instagram iframe. Acceptance: consent-aware analytics loading strategy approved; SPA page views and conversions verified; assess click-to-load Instagram; measure deployed mobile LCP ≤2.5s and field INP ≤200ms without hiding content.
- **PERF-2, Medium:** Replace preload-all galleries with per-image progressive loading and generate more appropriately sized media previews. Affects home, media and publication grids. Acceptance: offscreen images deferred, loading/error states preserved, original lightbox resolution preserved, no CLS regression on mobile/desktop.
- **A11Y-1, Medium:** Complete manual WCAG review, including keyboard focus containment/return for photo, media and review dialogs, pause controls for auto-moving reviews, reduced motion in JS-driven animations, 200% zoom and mobile/tablet screen readers. Acceptance: keyboard/assistive-tech defects resolved and evidence recorded.
- **PRIVACY-1, Medium:** Owner/legal review of analytics cookies, consent and privacy disclosures. Acceptance: applicable jurisdictions documented, privacy content supplied and consent behavior implemented where required. No legal conclusion is implied here.
- **ANALYTICS-1, Low:** Instrument appointment/WhatsApp CTA conversion events without personal form values. Acceptance: one event per action, SPA pageviews deduplicated, DebugView/account receipt checked.
- **SEO-1, Low:** After deployment, verify Search Console ownership/submission and run Google Rich Results/Schema validator against live routes. Obtain CrUX field measurements, complete external-link crawl, Safari/Firefox/tablet checks and uptime monitoring decision. Attach this report and results to the relevant Redmine ticket.

## Validation references

Google's [breadcrumb documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) describes the required list properties and validation workflow. The [web.dev LCP guide](https://web.dev/articles/optimize-lcp) explains early resource discovery and avoiding render delays. Schema must describe visible content; no FAQ or aggregate-rating eligibility is invented.
