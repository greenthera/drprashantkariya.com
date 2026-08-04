import { useEffect } from "react";
import { useLocation } from "react-router";
import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import CoursesCTA from "../components/CoursesCTA";
import Clinics from "../components/Clinics";
import Testimonial from "../components/Testimonial";
import BookAppointment from "../components/BookAppointment";
import Publications from "../components/Publications";
import Instagram from "../components/Instagram";

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
      <Expertise />
      <CoursesCTA />
      <Clinics />
      <Testimonial />
      <BookAppointment />
      <Publications />
      <Instagram />
    </main>
  );
}
