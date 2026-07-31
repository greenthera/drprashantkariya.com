# Courses Page — Bento Redesign

## Goal

Replace the alternating-rows layout on `/courses` with a design that matches the site's actual visual signature (as established in `Expertise.tsx`, `Hero.tsx`, `Testimonial.tsx`) instead of a generic image/text row list. Also reduce fetch payload/latency by requesting only 4 courses from Graphy instead of 20.

## Visual design

**Header:** Switch from the current centered header to the site's real header pattern (see `Expertise.tsx`/`Testimonial.tsx`): eyebrow label + large italic `font-display` heading on the left, a short supporting line on the right, in a `flex justify-between items-end` row — not centered.

**Layout — bento grid, not rows:**
- **Featured card** (first course, i.e. most recent): a large dark `#0A4B38` card, mirroring Expertise's "01" surgery card — full-bleed cover image at the top (or as a background treatment), an oversized ghost numeral ("01") in `text-white/4`, decorative gold-ringed circles (`border-[#C4973A]/10`), italic `font-display` title in white, description in `text-white/65`, and a gold-accent "Start Course" button (`bg-[#C4973A]/15` icon-badge language, gold text/border on the CTA to read correctly on dark background).
- **Supporting cards** (remaining up to 3 courses): white cards with `border-[#E0E8E2]`, hover `border-[#C5DDD3] shadow-lg -translate-y-1`, each with a smaller cover image, ghost numeral ("02", "03", "04") in `text-[#063322]/4`, `font-display` italic title, description, and a "Start Course" button in the site's standard green/gold style.
- **Grid shape:** on desktop, featured card spans full height on the left (`lg:row-span-2` equivalent) with supporting cards stacked/grid on the right — same asymmetric bento structure as Expertise's `lg:grid-cols-3 lg:grid-rows-3`-style layout, adapted to however many courses exist (1–4).
- **Mobile:** single column — featured card first at full width, then supporting cards stacked below it.
- **Below the grid:** unchanged — centered "View All Courses" outlined button linking to Graphy's full catalog, new tab.

**Animation:** keep `framer-motion` scroll-reveal (`whileInView`, `viewport: { once: true }`), staggered per card like Expertise's `delay: i * 0.05`-style stagger.

**No new content fields.** Still only cover image, title, description, and the two existing links (`Start Course` → real Graphy course page, `View All Courses` → Graphy catalog). Ghost numerals and decorative rings are pure chrome, not data.

**States (loading/error/empty):** keep the existing `aria-live` region and friendly messages from the current implementation; the loading skeleton should approximate the new bento shape (one large placeholder block + up to 3 smaller ones) rather than uniform rows.

## Data-fetch change

Change the proxied Graphy request from `page=0&limit=20&sortBy=relevance&...` to `page=0&limit=4&sortBy=relevance&...` in both `vite.config.ts` and `vercel.json`, and drop the now-redundant `.slice(0, MAX_COURSES)` re-truncation in `src/lib/courses.ts` (keep `MAX_COURSES` only as the shared "how many to render" constant used by the skeleton).

**Known trade-off (accepted):** the recency sort (`_id` descending) now operates on whatever 4 courses Graphy's own `relevance` sort returns, not the full catalog. If the catalog grows past 4 courses, "most recent first" is only accurate within that fetched batch, not guaranteed across all courses. Acceptable given the catalog is small today (3 courses) and this trades a rare future edge case for less payload on every page load.

## Out of scope

- No new course data fields (price, category, etc.) — still just image/title/description per the earlier approved decision.
- No changes to the individual course link behavior (still opens Graphy in a new tab).
- No changes to the Courses nav entry or routing.
