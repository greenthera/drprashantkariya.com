import { lazy, Suspense } from "react";
const CourseList = lazy(() => import("../components/CourseList"));

export default function Courses() {
  return (
    <Suspense fallback={null}>
      <CourseList />
    </Suspense>
  );
}
