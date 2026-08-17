import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false, // SPA mode: prerender to static HTML files, no server runtime
  prerender: ["/", "/contact", "/courses", "/publications", "/parental-guidelines"],
  // Only 5 routes total — no benefit to lazily fetching a route manifest on
  // navigation, and it avoids the internal `?index` disambiguation query
  // param leaking into the address bar when navigating to the index route
  // from a sibling route (e.g. cross-page SectionLink -> "/").
  routeDiscovery: { mode: "initial" },
} satisfies Config;
