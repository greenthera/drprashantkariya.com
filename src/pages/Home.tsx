import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;

    // Runs after ScrollToTop's own scrollTo(0, 0) effect, so this wins.
    const frame = requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      // Clear the state so navigating back here later doesn't re-trigger the scroll.
      navigate(".", { replace: true, state: null });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.state, navigate]);

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
