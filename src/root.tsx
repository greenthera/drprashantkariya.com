import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./index.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dr. Prashant Kariya — Pediatrician & Adolescent Health Expert, Surat</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5CQ43TDN6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D5CQ43TDN6');`,
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
