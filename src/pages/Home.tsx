import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Clinics from "../components/Clinics";
import Testimonial from "../components/Testimonial";
import BookAppointment from "../components/BookAppointment";
import Publications from "../components/Publications";
import Instagram from "../components/Instagram";

export default function Home() {
  return (
    <main className="bg-[#FAF9F6] selection:bg-[#0A4B38] selection:text-[#F5E6C8]">
      <Hero />
      <About />
      <Expertise />
      <Clinics />
      <Testimonial />
      <BookAppointment />
      <Publications />
      <Instagram />
    </main>
  );
}
