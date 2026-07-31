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
