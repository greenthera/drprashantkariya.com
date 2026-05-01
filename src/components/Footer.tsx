import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#063322] px-6 md:px-10 pt-16 md:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-white/10 pb-12 md:pb-16 mb-10">

          {/* Brand */}
          <div className="shrink-0">
            <h2
              className="font-display font-bold italic text-[#F5E6C8] leading-none tracking-tight mb-4"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              P. Kariya<span className="text-[#C4973A]">.</span>
            </h2>
            <p className="text-[#6B9A84] font-medium uppercase tracking-[0.3em] text-[9px]">
              Surat • Gujarat • India
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://x.com/drprashantkariy" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                <FaTwitter color="#F5E6C8" size={20} />
              </a>
              <a href="https://instagram.com/parentingtips_drprashantkariya" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                <FaInstagram color="#F5E6C8" size={20} />
              </a>
              <a href="https://in.linkedin.com/in/prashant-kariya-908a2b56" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                <FaLinkedin color="#F5E6C8" size={20} />
              </a>
            </div>
          </div>

          {/* Links + Addresses grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">

            {/* Practice */}
            <div className="space-y-4">
              <p className="text-[#C4973A] font-semibold uppercase tracking-[0.22em] text-[10px]">Practice</p>
              <nav className="flex flex-col gap-3">
                <a href="#expertise"   className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Expertise</a>
                <a href="#clinics"     className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Clinics</a>
                <a href="#publication" className="text-[#A8C5BB] font-medium text-sm hover:text-[#F5E6C8] transition-colors">Books</a>
              </nav>
            </div>

            {/* Clinic 1 */}
            <div className="space-y-4">
              <p className="text-[#C4973A] font-semibold uppercase tracking-[0.22em] text-[10px]">NICU Hospital</p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#C4973A] shrink-0 mt-0.5" />
                <p className="text-[#A8C5BB] text-sm leading-relaxed font-light">
                  801-803, Param Doctor House,<br />Lal Darwaja,<br />Surat – 395003
                </p>
              </div>
              <p className="font-display text-lg font-bold italic text-[#F5E6C8] leading-none">
                (0261) 2492411
              </p>
            </div>

            {/* Clinic 2 */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <p className="text-[#C4973A] font-semibold uppercase tracking-[0.22em] text-[10px]">Children Hospital</p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#C4973A] shrink-0 mt-0.5" />
                <p className="text-[#A8C5BB] text-sm leading-relaxed font-light">
                  305-306, Seven Square,<br />Majura Gate,<br />Surat – 395002
                </p>
              </div>
              <p className="font-display text-lg font-bold italic text-[#F5E6C8] leading-none">
                +91 97270 08881
              </p>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium text-[#4A6E5A] uppercase tracking-[0.25em] text-center sm:text-left">
          <p>&copy; {currentYear} Dr. Prashant Kariya. All rights reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://shivantra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4973A] hover:text-[#F5E6C8] transition-colors font-semibold"
            >
              Shivantra
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
