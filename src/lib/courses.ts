const CDN_URL = "https://d502jbuhuh9wk.cloudfront.net/";
export const GRAPHY_BASE_URL = "https://drprashantkariya.graphy.com";
const FALLBACK_COVER_URL = `${CDN_URL}resources/images/cc2.jpg`;
export const MAX_COURSES = 4;

// Fixed absolute URL to a Cloudflare Worker that proxies Graphy's course
// API and adds CORS headers (currently scoped to https://drprashantkariya.com
// only - see cloudflare-courses-proxy/worker.js). Using an absolute URL
// means this doesn't depend on how/where the frontend itself is hosted.
const COURSES_API_URL = "https://drprashantkariya-courses-api.dev-889.workers.dev/";

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
  const res = await fetch(COURSES_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch courses: ${res.status}`);
  }

  const json: RawCoursesResponse = await res.json();
  const items = json["sub-home"]?.data ?? [];

  // MongoDB ObjectIds embed a creation timestamp in their first bytes, so
  // descending string comparison approximates "most recently added first".
  // The proxy already requests only MAX_COURSES from Graphy, so no slice
  // is needed here.
  return items
    .map(toCourse)
    .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0));
}

// In-memory, per-session cache. React Router's loader blocks the route
// transition on its promise resolving, so without this, every single
// client-side navigation to /courses re-hits the network before the page
// can render — noticeably slower than every other route, which has no
// loader at all. The first visit each session still has to fetch for real;
// after that, the loader serves this instantly while useCourses()'s
// existing background revalidation (see hooks/useCourses.ts) keeps it
// updated for the next navigation.
let coursesCache: Course[] | null = null;

export function setCoursesCache(courses: Course[]): void {
  coursesCache = courses;
}

export async function getCoursesForLoader(): Promise<Course[]> {
  if (coursesCache) return coursesCache;
  const courses = await fetchCourses();
  coursesCache = courses;
  return courses;
}
