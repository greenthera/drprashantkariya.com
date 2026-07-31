# Courses Page — Design

## Goal

Add a "Courses" menu item to the site nav that opens a dedicated `/courses` page. That page shows up to 4 courses pulled live from the doctor's Graphy course platform (`https://drprashantkariya.graphy.com/`). Each course card has a button that opens that specific course on Graphy. Below the cards, a "View All Courses" button opens Graphy's full course catalog.

## Background: Graphy data source

Graphy's own storefront (`drprashantkariya.graphy.com/courses`) is a Next.js app that renders courses client-side using an Alpine.js widget (`/n/websiteV3/courselistV3.js`). That widget calls a public, unauthenticated JSON endpoint:

```
GET https://drprashantkariya.graphy.com/s/store/subfilters/courses?page=0&limit=20&sortBy=relevance&domainName=drprashantkariya.graphy.com
```

Verified response shape (trimmed):

```json
{
  "sub-home": {
    "data": [
      {
        "_id": "6a114cbc266dc7b82fcdceb6",
        "spayee:resource": {
          "spayee:title": "360° AI: AI for All Medicos",
          "spayee:shortDescription": "<p>Transforming Doctors into AI-Enabled Clinicians.</p>\n",
          "spayee:courseUrl": "360-AI-In-healthcare-",
          "spayee:coverVersion": 4
        }
      }
    ],
    "total": 3
  }
}
```

Cover images live on a CloudFront CDN (confirmed working):

```
https://d502jbuhuh9wk.cloudfront.net/courses/{id}/{id}_scaled_cover.jpg?v={coverVersion}
```

The individual course page on Graphy is:

```
https://drprashantkariya.graphy.com/courses/{spayee:courseUrl}-{_id}
```

**CORS constraint:** this endpoint does not send `Access-Control-Allow-Origin`, so it cannot be called directly from browser JS running on our own domain. It must be proxied same-origin.

**Recency without a date field:** the `_id` is a MongoDB ObjectId, whose first 4 bytes are a creation-time Unix timestamp. Decoding the 3 live course IDs produces sensible, distinct 2026 dates in the expected order — confirming we can sort "most recently added first" by comparing `_id` values lexicographically/descending, without any extra API field.

## Architecture: same-origin rewrite proxy (no backend code)

Rather than writing a serverless function, use a fixed rewrite rule so `/api/courses` is same-origin in every environment:

- **Local dev / preview** (`vite.config.ts`): `server.proxy` and `preview.proxy` map `/api/courses` → the Graphy endpoint above, with `changeOrigin: true`.
- **Vercel** (`vercel.json`): add a `rewrites` entry mapping `/api/courses` → the same fixed Graphy URL, placed *before* the existing SPA catch-all rewrite (`"source": "/(.*)"  → "/index.html"`), so it isn't swallowed by the catch-all.
- **Future platforms:** porting this is one rewrite/redirect rule in whatever the new host's config format is (e.g. Netlify `_redirects`, Cloudflare Pages `_redirects`) — no function runtime to reimplement.

The destination URL is fixed/hardcoded (page=0, limit=20, sortBy=relevance, domainName=drprashantkariya.graphy.com) — the frontend never sends query params through this proxy, so there's no open-proxy surface.

## Data layer

`src/lib/courses.ts`:

- `type Course = { id: string; title: string; description: string; coverUrl: string; courseUrl: string }`
- `async function fetchCourses(): Promise<Course[]>`
  - Fetches `/api/courses`.
  - Reads `json["sub-home"].data`.
  - Maps each raw item to a `Course`:
    - `title` ← `spayee:title`
    - `description` ← `spayee:shortDescription` with HTML tags stripped
    - `coverUrl` ← CDN pattern above (using `spayee:coverVersion`); if no cover version, omit/fallback to a neutral placeholder
    - `courseUrl` ← full Graphy course page URL
  - Sorts by `_id` descending (most recent first).
  - Returns at most the first 4.
  - Throws/rejects on non-OK response or fetch failure, for the caller to handle as an error state.

## Pages & navigation

- `src/pages/Courses.tsx` — new page, renders `<CourseList />`. Registered in `App.tsx` as `<Route path="courses" element={<Courses />} />` (matches the existing `contact` route pattern).
- `src/components/CourseList.tsx` — the actual section: header, fetch + loading/error states, card grid, "View All Courses" button.
- `src/components/Navbar.tsx` — add `{ name: "Courses", to: "/courses" }` to `navLinks`, rendered as a plain `Link` (not `HashLink`, since it's a separate route) in both the desktop nav and the mobile menu. Placed after "Books".

## Page content & visual design

Follows the existing design language (see `Publications.tsx`): `#FAF9F6` background, white rounded-2xl cards with `#E0E8E2` borders and hover lift/shadow, `font-display` italic headings, `#0A4B38`/`#063322` green and `#C4973A` gold accents, `framer-motion` fade-up-on-scroll.

- **Header:** small gold eyebrow label (e.g. "Learn With Us") + heading ("Our *Courses*"), matching the `Publications`/`Testimonial` header pattern.
- **Layout (per user wireframe):** up to 4 rows in an alternating (zigzag) two-column layout, not a uniform card grid:
  - Row 1: cover image on the left, text block (title + description + button) on the right.
  - Row 2: text block on the left, cover image on the right.
  - Row 3: image left / text right again, and so on — sides keep alternating per row, matching the `even`/`odd` pattern in the wireframe.
  - On mobile, rows stack vertically (image above text) in the same top-to-bottom order, regardless of alternation — alternation is a desktop/tablet-only effect.
  - Each row's text block shows only: title, short description, and a "Start Course" button/link — `target="_blank" rel="noopener noreferrer"`, `href` = that course's `courseUrl` — opens the specific course on Graphy in a new tab.
- **Below the rows:** a single centered "View All Courses" button, `target="_blank" rel="noopener noreferrer"`, linking to `https://drprashantkariya.graphy.com/courses`, opens in a new tab. Always shown regardless of how many courses loaded (even 0), since it's a static external link, not dependent on the API call succeeding.

## Loading / error / empty states

- **Loading:** simple placeholder/skeleton rows in the layout area while `fetchCourses()` is in flight.
- **Error** (proxy or Graphy API failure): replace the rows with a short friendly message (e.g. "Unable to load courses right now."). The "View All Courses" button still renders underneath as a fallback path to the catalog.
- **Empty** (API returns 0 courses): same friendly-message treatment as error, without implying something broke.

## Out of scope

- No course listing/teaser on the Home page — this lives only on the dedicated `/courses` page, reached via the nav.
- No price, category badge, or purchase flow on our site — purchase happens on Graphy after the visitor is redirected there.
- No pagination, filtering, or search on our `/courses` page (that's what "View All Courses" → Graphy is for).
- No caching layer beyond what the browser does by default; each page visit re-fetches.
