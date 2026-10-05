import { Links, Meta, Outlet, Scripts, ScrollRestoration, type LinksFunction, type MetaFunction } from "react-router";
import stylesheetUrl from "./index.css?url";
import mobileStyles from "./index.css?inline";
import mobileFontStyles from "./mobile-fonts.css?inline";
import mobileDisplayFont from "./assets/fonts/cormorant-garamond-normal-latin-core.woff2";
import mobileDisplayItalicFont from "./assets/fonts/cormorant-garamond-italic-latin-core.woff2";
import mobileSansFont from "./assets/fonts/jost-normal-latin-core.woff2";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap";

// Ship the exact mobile styles in the prerendered document, removing a
// render-blocking request without deferring any styles or loading states.
// Vite removes the CSS strings from the client bundle; hydration reuses the
// existing style element instead of downloading a second copy in JavaScript.
const MOBILE_STYLES = import.meta.env.SSR
  ? mobileStyles + mobileFontStyles
  : document.getElementById("mobile-styles")?.textContent ?? "";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheetUrl, media: "(min-width: 768px)" },
];

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
        {/* Mobile never requests these origins — fonts are self-hosted below
            768px — so the connections these hints open would go unused. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" media="(min-width: 768px)" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" media="(min-width: 768px)" />
        {/* Loaded as a non-blocking preload (swapped to a real stylesheet
            once fetched via the classic loadCSS trick) so this cross-origin
            request doesn't hold up the initial render — React's onLoad prop
            wouldn't serialize into the prerendered HTML as a real "onload"
            attribute, so the swap is wired up with a plain inline script
            instead, targeting the <link> immediately before it. */}
        {/* Mobile uses the identical fonts from our own origin, avoiding the
            Google stylesheet → font request chain. Desktop stays unchanged. */}
        {[mobileDisplayFont, mobileDisplayItalicFont, mobileSansFont].map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="" media="(width < 768px)" />
        ))}
        <link rel="preload" as="style" href={FONT_HREF} media="(min-width: 768px)" />
        <script
          dangerouslySetInnerHTML={{
            // Mobile fonts are already declared locally. React hoists head
            // links, so running the legacy sibling-based swap on mobile can
            // turn a modulepreload into a render-blocking stylesheet.
            __html: `if (window.matchMedia('(min-width: 768px)').matches) {
              document.currentScript.previousElementSibling.onload = function () {
                this.onload = null;
                this.rel = 'stylesheet';
              };
            }`,
          }}
        />
        <noscript>
          <link href={FONT_HREF} rel="stylesheet" media="(min-width: 768px)" />
        </noscript>
        {/* Google tag (gtag.js) — the dataLayer/gtag stub is set up
            immediately (free, no network) so early gtag() calls still queue
            correctly, but the actual ~165KB gtag.js library is only fetched
            after window "load" fires, so it doesn't compete with critical
            rendering/hydration for bandwidth or main-thread time. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D5CQ43TDN6');
              function __loadGtag() {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-D5CQ43TDN6';
                document.head.appendChild(s);
              }
              if (document.readyState === 'complete') {
                __loadGtag();
              } else {
                window.addEventListener('load', __loadGtag, { once: true });
              }`,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
