import { lazy, Suspense, useEffect } from "react";
import { useLocation, type LinksFunction } from "react-router";
import Hero from "../components/Hero";
import About from "../components/About";
import doctorAvatar450 from "../assets/doctorImage-avatar-450.webp";
import doctorAvatar700 from "../assets/doctorImage-avatar-700.webp";
import doctorAvatar965 from "../assets/doctorImage-avatar-965.webp";

const Expertise = lazy(() => import("../components/Expertise"));
const CoursesCTA = lazy(() => import("../components/CoursesCTA"));
const Clinics = lazy(() => import("../components/Clinics"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const BookAppointment = lazy(() => import("../components/BookAppointment"));
const Publications = lazy(() => import("../components/Publications"));
const Instagram = lazy(() => import("../components/Instagram"));

// Preloads the Hero photo — the page's LCP element — as early as possible in
// <head>, ahead of the JS bundle discovering it, so the browser doesn't wait
// on script execution to start fetching it.
export const links: LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: doctorAvatar700,
    imageSrcSet: `${doctorAvatar450} 450w, ${doctorAvatar700} 700w, ${doctorAvatar965} 965w`,
    imageSizes: "(min-width: 1024px) 440px, (min-width: 640px) 400px, 360px",
    fetchPriority: "high",
  },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.hash ? location.hash.slice(1) : null;
    if (!scrollTo) return;

    // Runs after ScrollToTop's own scrollTo(0, 0) effect, so this wins.
    const frame = requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      // Clear the hash directly (not via navigate(".", ...)) — resolving "."
      // relative to an index route with a parent layout is the exact
      // ambiguous case React Router disambiguates by appending `?index` to
      // the URL, which we don't want leaking into the address bar here.
      window.history.replaceState(null, "", location.pathname + location.search);
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  return (
    <main className="bg-[#FAF9F6] selection:bg-[#4353CF] selection:text-[#F5E6C8]">
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Expertise />
      </Suspense>
      <Suspense fallback={null}>
        <CoursesCTA />
      </Suspense>
      <Suspense fallback={null}>
        <Clinics />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonial />
      </Suspense>
      <Suspense fallback={null}>
        <BookAppointment />
      </Suspense>
      <Suspense fallback={null}>
        <Publications />
      </Suspense>
      <Suspense fallback={null}>
        <Instagram />
      </Suspense>
    </main>
  );
}
