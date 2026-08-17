import type { LinksFunction, MetaFunction } from "react-router";
import CourseList from "../components/CourseList";
import { getCoursesForLoader } from "../lib/courses";
import type { CoursesState } from "../hooks/useCourses";
import { canonicalLink, pageMeta } from "../lib/seo";

export const links: LinksFunction = () => [canonicalLink("/courses")];

export const meta: MetaFunction = () =>
  pageMeta({
    title: "Courses — Parenting, Safety & Clinical Skills | Dr. Prashant Kariya",
    description:
      "Practical, expert-led courses on parenting, safety, and clinical skill-building by Dr. Prashant Kariya — self-paced, with free and paid options.",
    keywords:
      "parenting courses, pediatric courses online, CPR course, child safety course, online parenting classes, Dr Prashant Kariya courses",
    path: "/courses",
  });

// Runs at build time during prerendering (baking real course data straight
// into the static HTML — no skeleton on first load) and again on the
// server/client for any non-prerendered navigation. Uses the in-memory
// cache so repeat in-app navigations to this route don't block on a fresh
// network round-trip — useCourses() then silently revalidates in the
// background to pick up anything Graphy has added since the last deploy.
export async function loader(): Promise<CoursesState> {
  try {
    const courses = await getCoursesForLoader();
    return { status: "success", courses };
  } catch {
    return { status: "error" };
  }
}

export default function Courses() {
  return <CourseList />;
}
