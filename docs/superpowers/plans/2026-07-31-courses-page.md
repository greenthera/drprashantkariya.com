# Courses Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Courses" nav item that opens a `/courses` page showing up to 4 courses live from Graphy, each linking out to its Graphy course page, with a "View All Courses" button linking to the full Graphy catalog.

**Architecture:** A same-origin rewrite (`/api/courses`) proxies to Graphy's public, unauthenticated course-listing endpoint — configured once in `vite.config.ts` (dev/preview) and once in `vercel.json` (production), no backend code. A small data layer (`src/lib/courses.ts`) fetches and normalizes the response — every displayed field (title, description, cover image, link) comes from that live API response, nothing is hardcoded or mocked. A hook (`src/hooks/useCourses.ts`) exposes loading/error/success state; `src/components/CourseList.tsx` renders the alternating image/text rows; `src/pages/Courses.tsx` + a new `App.tsx` route wire it up; `Navbar.tsx` gets a new "Courses" link.

**Tech Stack:** React 19 + TypeScript, Vite 8, react-router-dom, framer-motion, Tailwind v4, lucide-react.

**Note on testing:** This repo has no test runner or test files today (verified: no vitest/jest/testing-library in `package.json`, no `*.test.*`/`*.spec.*` files anywhere). Introducing a test framework is out of scope for this feature and wasn't part of the approved spec. Verification steps below instead use `tsc` type-checking, `eslint`, `vite build`, and manual `curl`/browser checks — consistent with how the rest of this codebase is verified.

**Spec:** `docs/superpowers/specs/2026-07-31-courses-page-design.md`

---

### Task 1: Same-origin dev/preview proxy for `/api/courses`

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add the proxy config**

Replace the full contents of `vite.config.ts` with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Graphy's public (unauthenticated) course-listing endpoint. It doesn't send
// CORS headers, so it's proxied same-origin under /api/courses instead of
// being fetched directly from the browser.
const GRAPHY_COURSES_PATH =
  '/s/store/subfilters/courses?page=0&limit=20&sortBy=relevance&domainName=drprashantkariya.graphy.com'

const coursesProxy = {
  '/api/courses': {
    target: 'https://drprashantkariya.graphy.com',
    changeOrigin: true,
    rewrite: () => GRAPHY_COURSES_PATH,
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: coursesProxy },
  preview: { proxy: coursesProxy },
})
```

- [ ] **Step 2: Start the dev server**

Run: `npm run dev` (leave it running in the background; note the printed local URL, e.g. `http://localhost:5173`)

- [ ] **Step 3: Verify the proxy returns real course data**

Run: `curl -s http://localhost:5173/api/courses`

Expected: a JSON body containing `"sub-home"` with a `"data"` array of course objects (each with `_id` and `spayee:resource"."spayee:title"`), e.g. `"spayee:title":"360° AI: AI for All Medicos"`. If you get an HTML page or a connection error, check the dev server is running and the port matches.

- [ ] **Step 4: Stop the dev server**

Stop the background `npm run dev` process.

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts
git commit -m "feat: add dev/preview proxy for Graphy courses API"
```

---

### Task 2: Same-origin production rewrite for `/api/courses`

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Add the rewrite rule before the SPA catch-all**

Replace the full contents of `vercel.json` with:

```json
{
  "rewrites": [
    {
      "source": "/api/courses",
      "destination": "https://drprashantkariya.graphy.com/s/store/subfilters/courses?page=0&limit=20&sortBy=relevance&domainName=drprashantkariya.graphy.com"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- [ ] **Step 2: Validate the JSON is well-formed**

Run: `node -e "console.log(JSON.parse(require('fs').readFileSync('vercel.json', 'utf8')))"`

Expected: prints the parsed object with no error (e.g. `{ rewrites: [ { source: '/api/courses', ... }, { source: '/(.*)', ... } ] }`).

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "feat: add production rewrite for Graphy courses API"
```

---

### Task 3: Course data layer

**Files:**
- Create: `src/lib/courses.ts`

- [ ] **Step 1: Write the data layer**

Create `src/lib/courses.ts`. This maps Graphy's raw API shape into what the UI needs — every field below (`title`, `description`, `coverUrl`, `courseUrl`) is derived directly from the live API response, nothing is invented or hardcoded:

```ts
const CDN_URL = "https://d502jbuhuh9wk.cloudfront.net/";
const GRAPHY_BASE_URL = "https://drprashantkariya.graphy.com";
const FALLBACK_COVER_URL = `${CDN_URL}resources/images/cc2.jpg`;
const MAX_COURSES = 4;

export type Course = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  courseUrl: string;
};

type RawCourse = {
  _id: string;
  "spayee:resource"?: {
    "spayee:title"?: string;
    "spayee:shortDescription"?: string;
    "spayee:courseUrl"?: string;
    "spayee:coverVersion"?: number;
  };
};

type RawCoursesResponse = {
  "sub-home"?: {
    data?: RawCourse[];
  };
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function toCourse(raw: RawCourse): Course {
  const resource = raw["spayee:resource"] ?? {};
  const coverVersion = resource["spayee:coverVersion"];
  const slug = resource["spayee:courseUrl"] ?? raw._id;

  return {
    id: raw._id,
    title: resource["spayee:title"] ?? "Untitled Course",
    description: stripHtml(resource["spayee:shortDescription"] ?? ""),
    coverUrl: coverVersion
      ? `${CDN_URL}courses/${raw._id}/${raw._id}_scaled_cover.jpg?v=${coverVersion}`
      : FALLBACK_COVER_URL,
    courseUrl: `${GRAPHY_BASE_URL}/courses/${slug}-${raw._id}`,
  };
}

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch("/api/courses");
  if (!res.ok) {
    throw new Error(`Failed to fetch courses: ${res.status}`);
  }

  const json: RawCoursesResponse = await res.json();
  const items = json["sub-home"]?.data ?? [];

  return items
    .map(toCourse)
    .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0))
    .slice(0, MAX_COURSES);
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/courses.ts
git commit -m "feat: add Graphy courses data layer"
```

---

### Task 4: `useCourses` state hook

**Files:**
- Create: `src/hooks/useCourses.ts`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useCourses.ts`:

```ts
import { useEffect, useState } from "react";
import { fetchCourses, type Course } from "../lib/courses";

export type CoursesState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; courses: Course[] };

export function useCourses(): CoursesState {
  const [state, setState] = useState<CoursesState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchCourses()
      .then((courses) => {
        if (!cancelled) setState({ status: "success", courses });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCourses.ts
git commit -m "feat: add useCourses state hook"
```

---

### Task 5: `CourseList` component (alternating rows)

**Files:**
- Create: `src/components/CourseList.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/CourseList.tsx`. All course content rendered here (`course.title`, `course.description`, `course.coverUrl`, `course.courseUrl`) comes from `useCourses()`, which is backed by the live API — none of it is static copy:

```tsx
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useCourses } from "../hooks/useCourses";

const GRAPHY_COURSES_URL = "https://drprashantkariya.graphy.com/courses";
const SKELETON_ROWS = [0, 1, 2, 3];

export default function CourseList() {
  const state = useCourses();

  return (
    <div className="bg-[#FAF9F6] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-[#C4973A] font-medium uppercase tracking-[0.25em] text-[10px] block mb-3">
            Learn With Us
          </span>
          <h1
            className="font-display font-bold text-[#063322] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          >
            Our <span className="italic">Courses</span>
          </h1>
        </motion.div>

        {state.status === "loading" && (
          <div className="space-y-14 md:space-y-20 mb-16">
            {SKELETON_ROWS.map((i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-pulse"
              >
                <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-[#E0E8E2]" />
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="h-6 w-2/3 rounded bg-[#E0E8E2] mx-auto md:mx-0" />
                  <div className="h-4 w-full rounded bg-[#E0E8E2]" />
                  <div className="h-4 w-5/6 rounded bg-[#E0E8E2] mx-auto md:mx-0" />
                  <div className="h-10 w-40 rounded-xl bg-[#E0E8E2] mx-auto md:mx-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {state.status === "error" && (
          <p className="text-center text-[#4A5E54] text-sm font-light mb-16">
            Unable to load courses right now. Please check back shortly.
          </p>
        )}

        {state.status === "success" && state.courses.length === 0 && (
          <p className="text-center text-[#4A5E54] text-sm font-light mb-16">
            No courses are available right now. Please check back shortly.
          </p>
        )}

        {state.status === "success" && state.courses.length > 0 && (
          <div className="flex flex-col gap-16 md:gap-20 mb-16">
            {state.courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className={`flex flex-col items-center gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-[#E0E8E2] shadow-[0_8px_30px_rgba(6,51,34,0.1)]">
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="font-display text-2xl md:text-3xl font-bold italic text-[#063322] mb-3 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-[#4A5E54] text-sm leading-relaxed font-light mb-6">
                    {course.description}
                  </p>
                  <a
                    href={course.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A4B38] text-[#F5E6C8] px-5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-[#063322] hover:shadow-lg hover:shadow-[#063322]/20 hover:-translate-y-px transition-all duration-250"
                  >
                    Start Course <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <a
            href={GRAPHY_COURSES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#0A4B38] text-[#0A4B38] px-6 py-3 rounded-xl text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#0A4B38] hover:text-[#F5E6C8] transition-all duration-250"
          >
            View All Courses <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CourseList.tsx
git commit -m "feat: add CourseList component with alternating rows"
```

---

### Task 6: `/courses` page and route

**Files:**
- Create: `src/pages/Courses.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the page**

Create `src/pages/Courses.tsx`:

```tsx
import CourseList from "../components/CourseList";

export default function Courses() {
  return (
    <>
      <CourseList />
    </>
  );
}
```

- [ ] **Step 2: Register the route**

Replace the full contents of `src/App.tsx` with:

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="courses" element={<Courses />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

- [ ] **Step 3: Type-check**

Run: `npx tsc -b --noEmit`

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Courses.tsx src/App.tsx
git commit -m "feat: add /courses route"
```

---

### Task 7: "Courses" nav link

**Files:**
- Modify: `src/components/Navbar.tsx:10-15`

- [ ] **Step 1: Add "Courses" to `navLinks`**

In `src/components/Navbar.tsx`, replace:

```tsx
  const navLinks = [
    { name: "About", to: "/#about" },
    { name: "Expertise", to: "/#expertise" },
    { name: "Clinics", to: "/#clinics" },
    { name: "Books", to: "/#publication" },
  ];
```

with:

```tsx
  const navLinks = [
    { name: "About", to: "/#about" },
    { name: "Expertise", to: "/#expertise" },
    { name: "Clinics", to: "/#clinics" },
    { name: "Books", to: "/#publication" },
    { name: "Courses", to: "/courses" },
  ];
```

This single array already drives both the desktop nav and the mobile menu (both `.map(...)` blocks further down in the file use `navLinks`), so no other changes are needed in this file.

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Courses link to nav"
```

---

### Task 8: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`

Expected: completes with no TypeScript or Vite errors, producing `dist/`.

- [ ] **Step 2: Lint**

Run: `npm run lint`

Expected: no errors.

- [ ] **Step 3: Manual browser walkthrough**

Run: `npm run dev`, open the printed local URL.

Check:
- The navbar (desktop width) shows "Courses" after "Books", and clicking it navigates to `/courses`.
- Shrink the window to mobile width, open the hamburger menu, confirm "Courses" appears there too and navigates correctly.
- On `/courses`: up to 4 rows render, populated with the real live titles/descriptions/images currently on `https://drprashantkariya.graphy.com/courses` (e.g. at time of writing: "The Breastfeeding Learning Series", "CPR Bharat - Every Citizen a Life Saver", "360° AI: AI for All Medicos") — confirming the data is genuinely coming from the API, not placeholder text.
- Rows alternate image-left/text-right and text-left/image-right on desktop widths; on a narrow/mobile width, rows stack with image above text.
- Each row's "Start Course" button opens a new tab pointed at that course's real page under `https://drprashantkariya.graphy.com/courses/...`.
- The "View All Courses" button opens a new tab at `https://drprashantkariya.graphy.com/courses`.
- Reload `/courses` a few times and confirm there's no layout flash/flicker beyond the brief loading skeleton.

- [ ] **Step 4: Verify the error state**

Temporarily break the proxy to confirm the error UI works: in `vite.config.ts`, change `target: 'https://drprashantkariya.graphy.com'` to `target: 'https://drprashantkariya.graphy.com.invalid'`, restart `npm run dev`, reload `/courses`.

Expected: the page shows "Unable to load courses right now. Please check back shortly." and the "View All Courses" button is still visible and works.

Revert the change immediately after confirming (`git diff vite.config.ts` should show no changes once reverted; do not commit the broken version).

- [ ] **Step 5: Stop the dev server**

Stop the background `npm run dev` process.
