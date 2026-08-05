import { lazy, Suspense } from "react";
import { fetchCourses } from "../lib/courses";
import type { CoursesState } from "../hooks/useCourses";

const CourseList = lazy(() => import("../components/CourseList"));

// Runs at build time during prerendering (baking real course data straight
// into the static HTML — no skeleton on first load) and again on the
// server/client for any non-prerendered navigation. useCourses() then
// silently revalidates in the background to pick up anything Graphy has
// added since the last deploy.
export async function loader(): Promise<CoursesState> {
  try {
    const courses = await fetchCourses();
    return { status: "success", courses };
  } catch {
    return { status: "error" };
  }
}

export default function Courses() {
  return (
    <Suspense fallback={null}>
      <CourseList />
    </Suspense>
  );
}
