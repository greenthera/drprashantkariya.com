import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("pages/Home.tsx"),
    route("contact", "pages/Contact.tsx"),
    route("courses", "pages/Courses.tsx"),
    route("publications", "pages/Publications.tsx"),
    route("parental-guidelines", "pages/ParentalGuideline.tsx"),
    route("*", "pages/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
