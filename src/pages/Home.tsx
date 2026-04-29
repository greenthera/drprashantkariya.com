import Hero from "../components/Hero";
import About from "../components/About";
import Expertise from "../components/Expertise";
import Publications from "../components/Publications";
import Clinics from "../components/Clinics";
import Instagram from "../components/Instagram";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050810] selection:bg-blue-500 selection:text-white">
      <Hero />
      <About />
      <Expertise />
      <Publications />
      <Clinics />
      <Instagram />
      <Footer />
    </main>
  );
}