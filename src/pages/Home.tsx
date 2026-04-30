import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Publications from "../components/Publications";
import Clinics from "../components/Clinics";
import Instagram from "../components/Instagram";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FAF9F6] selection:bg-[#0A4B38] selection:text-[#F5E6C8]">
      <Hero />
      <About />
      <Expertise />
      <Clinics />
      <Publications />
      <Instagram />
      <Footer />
    </main>
  );
}
