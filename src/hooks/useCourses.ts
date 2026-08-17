import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { fetchCourses, setCoursesCache, type Course } from "../lib/courses";

export type CoursesState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; courses: Course[] };

// The Courses route's loader already fetched this at build time (baked into
// the prerendered HTML) or on the current request, so there's no skeleton
// on first paint. This still silently refetches once on mount to pick up
// anything Graphy has added since the last deploy — stale-while-revalidate,
// not a fresh fetch-and-wait every visit.
export function useCourses(): CoursesState {
  const initial = useLoaderData() as CoursesState;
  const [state, setState] = useState<CoursesState>(initial);

  useEffect(() => {
    let cancelled = false;

    fetchCourses()
      .then((courses) => {
        setCoursesCache(courses);
        if (!cancelled) setState({ status: "success", courses });
      })
      .catch(() => {
        // A failed background revalidation shouldn't downgrade a page that
        // already loaded successfully — only surface the error if we never
        // had data to show in the first place.
        if (!cancelled && initial.status !== "success") {
          setState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
    // Intentionally runs once on mount only — this is a background
    // revalidation of the loader's initial data, not a dependency-driven refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
