import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { Link } from "react-router";
import SectionLink from "./SectionLink";

const MAPS_URL_NICU =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Param NICU & Children Hospital, 801-803, Param Doctor House, Lal Darwaja, Surat - 395003");
const MAPS_URL_CHILDREN =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Param Children Hospital, 305-306, Seven Square, Majura Gate, Surat - 395002");

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#2E3A9E] px-6 md:px-10 pt-20 pb-6">
      <div className="max-w-[1400px] mx-auto">

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-5 mb-20 max-w-2xl mx-auto text-center sm:text-left">
          <div>
            <h3 className="font-display text-xl font-bold italic text-[#F5E6C8] mb-1">
              Join Our Newsletter
            </h3>
            <p className="text-[#ABB3E0] text-xs font-light">
              Parenting tips and pediatric health updates, straight to your inbox.
            </p>
          </div>
          <a
            href="https://drprashantkariya.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#F2B33D] text-[#2E3A9E] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#F5C264] hover:-translate-y-px transition-all duration-250"
          >
            Subscribe
          </a>
        </div>

        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-white/10 pb-12 md:pb-16 mb-6">

          {/* Brand */}
          <div className="shrink-0">
            <h2
              className="font-display font-bold italic text-[#F5E6C8] leading-none tracking-tight mb-4"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              P. Kariya<span className="text-[#F2B33D]">.</span>
            </h2>
            <p className="text-[#8993CC] font-medium uppercase tracking-[0.3em] text-[9px]">
              Surat • Gujarat • India
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://x.com/drprashantkariy" target="_blank" rel="noreferrer" aria-label="Follow on X (Twitter)" className="hover:opacity-70 transition-opacity">
                <FaTwitter color="#F5E6C8" size={20} />
              </a>
              <a href="https://instagram.com/parentingtips_drprashantkariya" target="_blank" rel="noreferrer" aria-label="Follow on Instagram" className="hover:opacity-70 transition-opacity">
                <FaInstagram color="#F5E6C8" size={20} />
              </a>
              <a href="https://in.linkedin.com/in/prashant-kariya-908a2b56" target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn" className="hover:opacity-70 transition-opacity">
                <FaLinkedin color="#F5E6C8" size={20} />
              </a>
              <a href="https://www.youtube.com/@PrashantKariya" target="_blank" rel="noreferrer" aria-label="Subscribe on YouTube" className="hover:opacity-70 transition-opacity">
                <FaYoutube color="#F5E6C8" size={20} />
              </a>
            </div>
          </div>

          {/* Links + Addresses grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">

            {/* Practice */}
            <div className="space-y-4">
              <p className="text-[#F2B33D] font-semibold uppercase tracking-[0.22em] text-[10px]">Practice</p>
              <nav className="flex flex-col gap-3">
                <SectionLink id="expertise" className="text-[#ABB3E0] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Expertise</SectionLink>
                <SectionLink id="clinics" className="text-[#ABB3E0] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Clinics</SectionLink>
                <SectionLink id="publication" className="text-[#ABB3E0] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Books</SectionLink>
                <Link to="/courses" className="text-[#ABB3E0] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Courses</Link>
                <Link to="/publications" className="text-[#ABB3E0] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Publications</Link>
              </nav>
            </div>

            {/* Clinic 1 */}
            <div className="space-y-4">
              <p className="text-[#F2B33D] font-semibold uppercase tracking-[0.22em] text-[10px]">Param NICU & Children Hospital</p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#F2B33D] shrink-0 mt-0.5" />
                <a href={MAPS_URL_NICU}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Param NICU & Children Hospital in Google Maps"
                  className="text-[#ABB3E0] text-sm leading-relaxed font-light">
                  801-803, Param Doctor House,<br />Lal Darwaja,<br />Surat – 395003
                </a>
              </div>
              <a href="tel:02612492411" className="font-display text-lg font-bold italic text-[#F5E6C8] leading-none">
                (0261) 2492411
              </a>
            </div>

            {/* Clinic 2 */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <p className="text-[#F2B33D] font-semibold uppercase tracking-[0.22em] text-[10px]">Param Children Hospital</p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#F2B33D] shrink-0 mt-0.5" />
                <a href={MAPS_URL_CHILDREN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Param Children Hospital in Google Maps"
                  className="text-[#ABB3E0] text-sm leading-relaxed font-light">
                  305-306, Seven Square,<br />Majura Gate,<br />Surat – 395002
                </a>
              </div>
              <a href="tel:+919727008881" className="font-display text-lg font-bold italic text-[#F5E6C8] leading-none">
                +91 97270 08881
              </a>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 text-[10px] font-medium text-[#ABB3E0] uppercase tracking-[0.25em] text-center sm:text-left">
          <p>&copy; {currentYear} Dr. Prashant Kariya. All rights reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://shivantra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F2B33D] hover:text-[#F5E6C8] transition-colors font-semibold"
            >
              Shivantra
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
