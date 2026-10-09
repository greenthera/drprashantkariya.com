import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction, type MetaFunction } from "react-router";
import stylesheetUrl from "./index.css?url";
import inlineStyles from "./index.css?inline";
import { structuredData } from "./lib/seo";

// Use the exact same CSS on mobile without a blocking request. Production
// hydration reuses the server-rendered text; Vite omits the CSS string from
// client JavaScript. Development keeps the import for stylesheet hot updates.
const MOBILE_STYLES = import.meta.env.SSR || import.meta.env.DEV
  ? inlineStyles
  : document.getElementById("mobile-styles")?.textContent ?? "";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheetUrl, media: "(min-width: 768px)" },
];

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap";

// Site-wide default — pages that don't export their own `meta()` inherit
// this title/description; pages that do (e.g. ParentalGuideline.tsx) override
// it for their own route only.
export const meta: MetaFunction = () => [
  { title: "Dr. Prashant Kariya — Pediatrician & Adolescent Health Expert, Surat" },
  {
    name: "description",
    content:
      "Dr. Prashant Kariya is a pediatrician and neonatologist in Surat offering compassionate, evidence-based care for newborns, children, and adolescents.",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style id="mobile-styles" media="(width < 768px)" dangerouslySetInnerHTML={{ __html: MOBILE_STYLES }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Mobile uses system fonts without downloading unused font files.
            Desktop loads the font stylesheet asynchronously with a stable ID. */}
        <link id="desktop-fonts" rel="preload" as="style" href={FONT_HREF} media="(min-width: 768px)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.matchMedia('(min-width: 768px)').matches) {
              var fonts = document.getElementById('desktop-fonts');
              fonts.media = 'print';
              fonts.onload = function () { this.media = 'all'; };
              fonts.rel = 'stylesheet';
            }`,
          }}
        />
        <noscript>
          <link href={FONT_HREF} rel="stylesheet" />
        </noscript>
        {/* Google tag (gtag.js) — the dataLayer/gtag stub is set up
            immediately (free, no network) so early gtag() calls still queue
            correctly, but the actual ~165KB gtag.js library is only fetched
            after a short post-load delay during idle time, so it doesn't compete with critical
            rendering/hydration for bandwidth or main-thread time. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D5CQ43TDN6');
              var __gtagLoaded = false;
              function __loadGtag() {
                if (__gtagLoaded) return;
                __gtagLoaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-D5CQ43TDN6';
                document.head.appendChild(s);
              }
              function __scheduleGtag() {
                window.setTimeout(function () {
                  if (window.requestIdleCallback) window.requestIdleCallback(__loadGtag, { timeout: 2000 });
                  else __loadGtag();
                }, 3500);
              }
              if (document.readyState === 'complete') __scheduleGtag();
              else window.addEventListener('load', __scheduleGtag, { once: true });
`,
          }}
        />
        {/* Single Page Apps for GitHub Pages — MIT License, https://github.com/rafgraph/spa-github-pages
            Decodes the query-string encoding that 404.html applies for any
            route not covered by static prerendering, restoring the real
            path/hash before react-router reads the URL. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (l) {
              if (l.search[1] === '/') {
                var decoded = l.search.slice(1).split('&').map(function (s) {
                  return s.replace(/~and~/g, '&');
                }).join('?');
                window.history.replaceState(null, null,
                  l.pathname.slice(0, -1) + decoded + l.hash
                );
              }
            }(window.location));`,
          }}
        />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.ico" sizes="any" media="(min-width: 768px)" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
