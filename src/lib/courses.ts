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

  // MongoDB ObjectIds embed a creation timestamp in their first bytes, so
  // descending string comparison approximates "most recently added first".
  return items
    .map(toCourse)
    .sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0))
    .slice(0, MAX_COURSES);
}
